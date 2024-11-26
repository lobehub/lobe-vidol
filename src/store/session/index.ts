import { nanoid } from 'ai';
import dayjs from 'dayjs';
import { produce } from 'immer';
import { PersistOptions, createJSONStorage, devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { DEFAULT_LLM_CONFIG, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { DEFAULT_USER_AVATAR_URL, LOADING_FLAG } from '@/constants/common';
import { chatCompletion, handleSpeakAi, handleStopSpeak } from '@/services/chat';
import { shareService } from '@/services/share';
import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { ShareGPTConversation } from '@/types/share';
import { vidolStorage } from '@/utils/storage';

import { useAgentStore } from '../agent';
import { useGlobalStore } from '../global';
import { initialState } from './initialState';
import { MessageActionType, messageReducer } from './reducers/message';
import { sessionSelectors } from './selectors';

export const SESSION_STORAGE_KEY = 'vidol-chat-session-storage';

interface ShareMessage {
  from: 'human' | 'gpt';
  value: string;
}

const Footer: ShareMessage = {
  from: 'gpt',
  value: `Share from [**🤯 LobeVidol**](https://github.com/lobehub/lobe-vidol) - ${dayjs().format(
    'YYYY-MM-DD',
  )}`,
};

export interface SessionStore {
  abortController?: AbortController;
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
  clearSessionStorage: () => Promise<void>;
  /**
   * 创建会话
   * @param agent
   * @returns
   */
  createSession: (agent: Agent) => void;
  /**
   * 默认会话
   */
  defaultSession: Session;
  /**
   * 删除并重新生成消息
   */
  delAndRegenerateMessage: (id: string) => void;
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
   * 触摸响应开关
   */
  interactive: boolean;
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
  removeSessionByAgentId: (id: string) => void;
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
  shareLoading: boolean;
  shareToShareGPT: (props: { withSystemRole?: boolean }) => Promise<void>;
  /**
   * 停止生成消息
   */
  stopGenerateMessage: () => void;
  /**
   * 停止语音消息
   */
  stopTtsMessage: () => void;
  /**
   * 切换会话
   * @param agent
   * @returns
   */
  switchSession: (agentId: string) => void;

  /**
   * 触摸响应开关
   */
  toggleInteractive: () => void;
  /**
   * 语音加载中的消息 ID
   */
  ttsLoadingId: string | undefined;
  /**
   * 语音消息
   */
  ttsMessage: (id: string, content: string) => void;

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
   * 语音开关
   */
  voiceOn: boolean;
}

export const createSessionStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  ...initialState,
  clearHistory: () => {
    const { updateSessionMessages } = get();
    updateSessionMessages([]);
  },
  clearSessionStorage: async () => {
    await vidolStorage.removeItem(SESSION_STORAGE_KEY);
    set({ ...initialState });
  },
  createSession: (agent: Agent) => {
    const { sessionList } = get();
    if (agent.agentId === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      set({ activeId: agent.agentId });
      return;
    }

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
  delAndRegenerateMessage: (id) => {
    const { deleteMessage, regenerateMessage } = get();
    deleteMessage(id);
    regenerateMessage(id);
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
  stopGenerateMessage: () => {
    const { abortController } = get();
    if (!abortController) return;
    abortController.abort();
    set({ chatLoadingId: undefined });
  },
  fetchAIResponse: async (messages, assistantId) => {
    const { dispatchMessage } = get();
    const currentSession = sessionSelectors.currentSession(get());
    const currentAgent = sessionSelectors.currentAgent(get());

    if (!currentSession || !currentAgent) {
      return;
    }

    const abortController = new AbortController();

    set({ chatLoadingId: assistantId, abortController });

    let receivedMessage = '';
    let aiMessage = '';
    const sentences = [];

    await chatCompletion(
      {
        model: currentAgent.model || DEFAULT_LLM_CONFIG.model,
        provider: currentAgent.provider || DEFAULT_LLM_CONFIG.provider,
        stream: true,
        ...(currentAgent.params || DEFAULT_LLM_CONFIG.params),
        messages: [
          {
            content: currentAgent.systemRole,
            role: 'system',
          } as ChatMessage,
          ...messages,
        ],
      },
      {
        onErrorHandle: (error) => {
          dispatchMessage({
            payload: {
              id: assistantId,
              key: 'error',
              value: error,
            },
            type: 'UPDATE_MESSAGE',
          });
        },
        onMessageHandle: (chunk) => {
          switch (chunk.type) {
            case 'text': {
              const { voiceOn } = get();
              const chatMode = useGlobalStore.getState().chatMode;

              // 只有视频模式下才需要连续语音合成
              if (voiceOn && chatMode === 'camera') {
                // 语音合成
                receivedMessage += chunk.text;
                // 文本切割
                const sentenceMatch = receivedMessage.match(/^(.+[\n~。！．？]|.{10,}[,、])/);
                if (sentenceMatch && sentenceMatch[0]) {
                  const sentence = sentenceMatch[0];
                  sentences.push(sentence);
                  receivedMessage = receivedMessage.slice(sentence.length).trimStart();

                  if (
                    !sentence.replaceAll(
                      /^[\s()[\]}«»‹›〈〉《》「」『』【】〔〕〘〙〚〛（）［］｛]+$/g,
                      '',
                    )
                  ) {
                    return;
                  }
                  handleSpeakAi(sentence);
                }
              }

              // 对话更新
              aiMessage += chunk.text;

              dispatchMessage({
                payload: {
                  id: assistantId,
                  key: 'content',
                  value: aiMessage,
                },
                type: 'UPDATE_MESSAGE',
              });
              break;
            }

            // is this message is just a tool call
            // case 'tool_calls': {
            // internal_toggleToolCallingStreaming(assistantId, chunk.isAnimationActives);
            // internal_dispatchMessage({
            //   id: assistantId,
            //   type: 'updateMessage',
            //   value: { tools: get().internal_transformToolCalls(chunk.tool_calls) },
            // });
            // isFunctionCall = true;
            // }
          }
        },
        signal: abortController.signal,
      },
    );
    set({ chatLoadingId: undefined });
  },

  /**
   * 语音消息
   */
  ttsMessage: async (id: string, content: string) => {
    set({ ttsLoadingId: id });
    await handleSpeakAi(content, {
      onComplete: () => {
        set({ ttsLoadingId: undefined });
      },
      onError: () => {
        set({ ttsLoadingId: undefined });
      },
    });
  },
  stopTtsMessage: () => {
    set({ ttsLoadingId: undefined });
    handleStopSpeak();
  },
  shareToShareGPT: async ({ withSystemRole }) => {
    const messages = sessionSelectors.currentChats(get());
    const agent = sessionSelectors.currentAgent(get());
    const meta = agent?.meta;

    if (!agent || !meta) return;

    const defaultMsg: ShareGPTConversation['items'] = [];
    const showSystemRole = withSystemRole && !!agent.systemRole;
    const shareMsgs = produce(defaultMsg, (draft) => {
      draft.push({
        from: 'gpt',
        value: [
          `${meta.avatar} **${meta.name}** - ${meta.description}`,
          showSystemRole && '---',
          showSystemRole && agent.systemRole,
        ]
          .filter(Boolean)
          .join('\n\n'),
      });

      for (const i of messages) {
        switch (i.role) {
          case 'assistant': {
            draft.push({ from: 'gpt', value: i.content });
            break;
          }

          case 'user': {
            draft.push({ from: 'human', value: i.content });
            break;
          }
        }
      }

      draft.push(Footer);
    });

    set({ shareLoading: true });

    const res = await shareService.createShareGPTUrl({
      avatarUrl: DEFAULT_USER_AVATAR_URL,
      items: shareMsgs,
    });
    set({ shareLoading: false });

    window.open(res, '_blank');
  },
  regenerateMessage: (id) => {
    const { dispatchMessage, fetchAIResponse } = get();
    const currentSession = sessionSelectors.currentSession(get());
    if (!currentSession) {
      return;
    }
    const chats = sessionSelectors.currentChats(get());
    const currentIndex = chats.findIndex((item) => item.id === id);
    const currentMessage = chats[currentIndex];

    let contextMessages: ChatMessage[] = [];

    switch (currentMessage.role) {
      case 'user': {
        contextMessages = chats.slice(0, currentIndex + 1);
        break;
      }
      case 'assistant': {
        // 消息是 AI 发出的因此需要找到它的 user 消息
        const userId = currentMessage.parentId;
        const userIndex = chats.findIndex((c) => c.id === userId);
        // 如果消息没有 parentId，那么同 user/function 模式
        contextMessages = chats.slice(0, userIndex < 0 ? currentIndex + 1 : userIndex + 1);
        break;
      }
    }

    const latestMsg = contextMessages.findLast((s) => s.role === 'user');

    if (!latestMsg) return;

    const assistantId = nanoid();

    // 添加机器人消息占位
    dispatchMessage({
      payload: {
        content: LOADING_FLAG,
        id: assistantId,
        parentId: latestMsg.id,
        role: 'assistant', // 占位符
      },
      type: 'ADD_MESSAGE',
    });

    fetchAIResponse(contextMessages, assistantId);
  },
  removeSessionByAgentId: (id) => {
    const { sessionList, activeId } = get();

    const sessions = produce(sessionList, (draft) => {
      const index = draft.findIndex((session) => session.agentId === id);
      if (index === -1) return;
      draft.splice(index, 1);
    });
    set({ sessionList: sessions });

    if (activeId === id) {
      set({ activeId: LOBE_VIDOL_DEFAULT_AGENT_ID });
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
        parentId: userId,
        role: 'assistant', // 占位符
      },
      type: 'ADD_MESSAGE',
    });

    fetchAIResponse(currentChats, assistantId);
  },

  setMessageInput: (messageInput) => {
    set({ messageInput }, false, 'session/setMessageInput');
  },
  switchSession: (agentId) => {
    const { sessionList } = get();
    if (agentId === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      set({ activeId: agentId });
      useAgentStore.setState({ currentIdentifier: agentId });
      return;
    }
    const targetSession = sessionList.find((session) => session.agentId === agentId);
    if (!targetSession) {
      const session = {
        agentId: agentId,
        messages: [],
      };
      set({ sessionList: [...sessionList, session] });
    }
    set({ activeId: agentId });
    useAgentStore.setState({ currentIdentifier: agentId });
  },

  toggleInteractive: () => {
    const { interactive: touchOn } = get();
    set({ interactive: !touchOn });
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
    const { sessionList, activeId, defaultSession } = get();
    if (activeId === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      const mergeSession = produce(defaultSession, (draft) => {
        draft.messages = messages;
      });
      set({ defaultSession: mergeSession });
    } else {
      const sessions = produce(sessionList, (draft) => {
        const index = draft.findIndex((session) => session.agentId === activeId);
        if (index === -1) return;
        draft[index].messages = messages;
      });
      set({ sessionList: sessions });
    }
  },
});

const persistOptions: PersistOptions<SessionStore> = {
  name: SESSION_STORAGE_KEY, // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => vidolStorage),
  version: 0,
};

export const useSessionStore = createWithEqualityFn<SessionStore>()(
  persist(
    devtools(createSessionStore, {
      name: 'VIDOL_SESSION_STORE',
    }),
    persistOptions,
  ),
  shallow,
);

export { sessionSelectors } from './selectors';
