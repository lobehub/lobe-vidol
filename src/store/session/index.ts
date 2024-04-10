import { LOADING_FLAG } from '@/constants/common';
import { chatCompletion, handleSpeakAi } from '@/services/chat';
import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { fetchSEE } from '@/utils/fetch';
import { nanoid } from 'ai';
import { produce } from 'immer';
import { merge } from 'lodash-es';
import { DeepPartial } from 'utility-types';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { initialState } from './initialState';
import { MessageActionType, messageReducer } from './reducers/message';
import { sessionSelectors } from './selectors';

const SESSION_STORAGE_KEY = 'vidol-chat-session-storage';

export enum ViewerModeEnum {
  Img = 'Img',
  Normal = 'Normal'
}

export interface SessionStore {
  /**
   * 当前会话 ID
   */
  activeId: string;
  /**
   * 聊天加载中的消息 ID
   */
  chatLoadingId: string | undefined;
  /**
   * 清空历史消息
   */
  clearHistory: () => void;
  /**
   *  清空会话
   */
  clearSessions: () => void;
  /**
   * 创建会话
   * @param agent
   * @returns
   */
  createSession: (agent: Agent) => void;
  /**
   *  删除消息
   */
  deleteMessage: (id: string) => void;
  /**
   * 分发消息
   * @param payload - 消息分发参数
   */
  dispatchMessage: (payload: MessageActionType) => void;
  /**
   * 请求 AI 回复
   * @param messages
   * @returns
   */
  fetchAIResponse: (messages: ChatMessage[], assistantId: string) => void;
  /**
   * 本地角色列表
   */
  localAgentList: Agent[];
  /**
   * 当前消息输入
   */
  messageInput: string;
  /**
   * 重新生成消息
   * @returns
   */
  regenerateMessage: (id: string) => void;
  /**
   *  移除会话
   */
  removeSession: (id: string) => void;
  /**
   * 发送消息
   * @param message 消息内容
   * @returns
   */
  sendMessage: (message: string) => void;
  /**
   * 会话列表
   */
  sessionList: Session[];
  /**
   * 设置消息输入
   * @param messageInput
   */
  setMessageInput: (messageInput: string) => void;
  /**
   * 触发 3D 渲染开关
   */
  setViewerMode: (mode: boolean) => void;
  /**
   * 切换会话
   * @param agent
   * @returns
   */
  switchSession: (agentId: string) => void;
  /**
   * 触发语音开关
   */
  toggleVoice: () => void;
  /**
   * 更新角色配置
   */
  updateAgentConfig: (agent: DeepPartial<Agent>) => void;
  /**
   * 更新消息
   * @returns
   */
  updateMessage: (id: string, content: string) => void;
  /**
   * 更新会话消息
   * @param messages
   */
  updateSessionMessages: (messages: ChatMessage[]) => void;
  /**
   * 角色渲染模式
   */
  viewerMode: boolean;
  /**
   * 语音开关
   */
  voiceOn: boolean;
}

const createSessonStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  ...initialState,
  clearHistory: () => {
    const { updateSessionMessages } = get();
    updateSessionMessages([]);
  },
  clearSessions: () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    set({ ...initialState });
  },
  createSession: (agent: Agent) => {
    const { sessionList, localAgentList } = get();

    const newAgentList = produce(localAgentList, (draft) => {
      const index = draft.findIndex((localAgent) => localAgent.agentId === agent.agentId);
      if (index === -1) {
        draft.push(agent);
      } else {
        draft[index] = merge(agent, draft[index]);
      }
    });
    set({ localAgentList: newAgentList });

    const newSessionList = produce(sessionList, (draft) => {
      const index = draft.findIndex((session) => session.agentId === agent.agentId);
      if (index === -1) {
        draft.push({
          agentId: agent.agentId,
          messages: [],
        });
      }
    });

    set({ activeId: agent.agentId, sessionList: newSessionList });
  },
  deleteMessage: (id) => {
    const { dispatchMessage } = get();
    dispatchMessage({
      payload: {
        id,
      },
      type: 'DELETE_MESSAGE',
    });
  },
  dispatchMessage: (payload) => {
    const { updateSessionMessages } = get();
    const session = sessionSelectors.currentSession(get());

    if (!session) {
      return;
    }

    const messages = messageReducer(session.messages, payload);

    updateSessionMessages(messages);
  },
  fetchAIResponse: async (messages, assistantId) => {
    const { dispatchMessage } = get();
    const currentSession = sessionSelectors.currentSession(get());
    const currentAgent = sessionSelectors.currentAgent(get());

    if (!currentSession || !currentAgent) {
      return;
    }

    set({ chatLoadingId: assistantId });

    const fetcher = () => {
      return chatCompletion({
        messages: [
          {
            content: currentAgent.systemRole,
            role: 'system',
          },
          ...messages,
        ],
      });
    };

    let receivedMessage = '';
    let aiMessage = '';
    const sentences = [];

    await fetchSEE(fetcher, {
      onMessageError: (error) => {
        dispatchMessage({
          payload: {
            id: assistantId,
            key: 'error',
            value: error,
          },
          type: 'UPDATE_MESSAGE',
        });
      },
      onMessageUpdate: (txt: string) => {
        const { voiceOn } = get();

        if (voiceOn) {
          // 语音合成
          receivedMessage += txt;
          // 文本切割
          const sentenceMatch = receivedMessage.match(/^(.+[\n~。！．？]|.{10,}[,、])/);
          if (sentenceMatch && sentenceMatch[0]) {
            const sentence = sentenceMatch[0];
            sentences.push(sentence);
            receivedMessage = receivedMessage.slice(sentence.length).trimStart();

            if (
              !sentence.replaceAll(/^[\s()[\]}«»‹›〈〉《》「」『』【】〔〕〘〙〚〛（）［］｛]+$/g, '')
            ) {
              return;
            }
            handleSpeakAi(sentence);
          }
        }

        // 对话更新
        aiMessage += txt;

        dispatchMessage({
          payload: {
            id: assistantId,
            key: 'content',
            value: aiMessage,
          },
          type: 'UPDATE_MESSAGE',
        });
      },
    });
    set({ chatLoadingId: undefined });
  },
  regenerateMessage: (id) => {
    const { dispatchMessage, fetchAIResponse } = get();
    const currentSession = sessionSelectors.currentSession(get());
    if (!currentSession) {
      return;
    }

    const previousChats = sessionSelectors.previousChats(get(), id);

    const assistantId = nanoid();

    // 添加机器人消息占位
    dispatchMessage({
      payload: {
        content: LOADING_FLAG,
        id: assistantId,
        role: 'assistant', // 占位符
      },
      type: 'ADD_MESSAGE',
    });

    fetchAIResponse(previousChats, assistantId);
  },
  removeSession: (id) => {
    const { sessionList, activeId } = get();

    const sessions = produce(sessionList, (draft) => {
      const index = draft.findIndex((session) => session.agentId === id);
      if (index === -1) return;
      draft.splice(index, 1);
    });
    set({ sessionList: sessions });

    if (activeId === id) {
      set({ activeId: sessions[0]?.agentId });
    }
  },
  sendMessage: async (message: string) => {
    const { dispatchMessage, fetchAIResponse } = get();
    const currentSession = sessionSelectors.currentSession(get());
    if (!currentSession) {
      return;
    }

    const userId = nanoid();

    // 添加用户消息
    dispatchMessage({
      payload: {
        content: message,
        id: userId,
        role: 'user',
      },
      type: 'ADD_MESSAGE',
    });

    const currentChats = sessionSelectors.currentChats(get());

    const assistantId = nanoid();

    // 添加机器人消息占位
    dispatchMessage({
      payload: {
        content: LOADING_FLAG,
        id: assistantId,
        role: 'assistant', // 占位符
      },
      type: 'ADD_MESSAGE',
    });

    await fetchAIResponse(currentChats, assistantId);
  },

  setMessageInput: (messageInput) => {
    set({ messageInput });
  },
  setViewerMode: (mode) => {
    set({ viewerMode: mode });
  },
  switchSession: (agentId) => {
    const { sessionList } = get();
    const targetSession = sessionList.find((session) => session.agentId === agentId);
    if (!targetSession) {
      const session = {
        agentId: agentId,
        messages: [],
      };
      set({ sessionList: [...sessionList, session] });
    }
    set({ activeId: agentId });
  },
  toggleVoice: () => {
    const { voiceOn } = get();
    set({ voiceOn: !voiceOn });
  },
  updateAgentConfig: (agent) => {
    const { localAgentList, activeId } = get();
    const agents = produce(localAgentList, (draft) => {
      const index = draft.findIndex((localAgent) => localAgent.agentId === activeId);
      if (index === -1) return;
      draft[index] = merge(draft[index], agent);
    });
    set({ localAgentList: agents });
  },
  updateMessage: (id, content) => {
    const { dispatchMessage } = get();
    dispatchMessage({
      payload: {
        id,
        key: 'content',
        value: content,
      },
      type: 'UPDATE_MESSAGE',
    });
  },
  updateSessionMessages: (messages) => {
    const { sessionList, activeId } = get();
    const sessions = produce(sessionList, (draft) => {
      const index = draft.findIndex((session) => session.agentId === activeId);
      if (index === -1) return;
      draft[index].messages = messages;
    });
    set({ sessionList: sessions });
  },
});

export const useSessionStore = createWithEqualityFn<SessionStore>()(
  persist(
    devtools(createSessonStore, {
      name: 'VIDOL_SESSION_STORE',
    }),
    {
      name: SESSION_STORAGE_KEY, // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);



export {sessionSelectors} from './selectors';