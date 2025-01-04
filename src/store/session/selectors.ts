import { DEFAULT_CHAT_CONFIG, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { DEFAULT_USER_AVATAR } from '@/constants/common';
import { useAgentStore } from '@/store/agent';
import { useSettingStore } from '@/store/setting';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { merge } from '@/utils/merge';

import { SessionStore } from './index';

const currentSession = (s: SessionStore): Session | undefined => {
  const { activeId, sessionList, defaultSession } = s;
  if (activeId === LOBE_VIDOL_DEFAULT_AGENT_ID) {
    return defaultSession;
  }
  return sessionList.find((item) => item.agentId === activeId);
};

const currentSessionConfig = (s: SessionStore): Session['config'] => {
  const session = currentSession(s);
  return merge(DEFAULT_CHAT_CONFIG, session?.config);
};

const currentSessionChatConfig = (s: SessionStore): Session['config']['chatConfig'] => {
  return currentSessionConfig(s).chatConfig || DEFAULT_CHAT_CONFIG;
};

const sessionListIds = (s: SessionStore): string[] => {
  const { sessionList } = s;
  return sessionList.map((item) => item.agentId);
};

const filterSessionListIds = (s: SessionStore, filter: string | undefined) => {
  const dataSource = sessionListIds(s);
  if (!filter) return dataSource;

  const agentStore = useAgentStore.getState();
  return dataSource.filter((agentId) => {
    const agent = agentStore.getAgentById(agentId);
    const { name, description } = agent?.meta || {};
    return !filter || name?.includes(filter) || description?.includes(filter);
  });
};

const getAgentById = (s: SessionStore, id: string) => {
  const { sessionList } = s;
  const agentStore = useAgentStore.getState();
  if (id === LOBE_VIDOL_DEFAULT_AGENT_ID) {
    return agentStore.defaultAgent;
  }

  const agentId = sessionList.find((item) => item.agentId === id)?.agentId;
  return agentStore.getAgentById(agentId || '');
};

const currentAgent = (s: SessionStore) => {
  const { activeId } = s;
  const agentStore = useAgentStore.getState();
  return agentStore.getAgentById(activeId);
};

const currentChats = (s: SessionStore): ChatMessage[] => {
  const session = currentSession(s);
  const agent = currentAgent(s);
  if (!session || !agent) return [];

  const { avatar, name, description } = agent.meta;

  const { messages } = session;
  return messages?.map((message) => {
    const userAvatar = useSettingStore.getState().config.avatar;
    const userNickName = useSettingStore.getState().config.nickName;
    return {
      ...message,
      meta: {
        avatar: message.role === 'user' ? (userAvatar ? userAvatar : DEFAULT_USER_AVATAR) : avatar,
        description: message.role === 'user' ? undefined : description,
        title: message.role === 'user' ? (userNickName ? userNickName : '你') : name,
      },
    };
  });
};

const currentChatIDs = (s: SessionStore): string[] => {
  return currentChats(s).map((item) => item.id);
};

const currentChatsString = (s: SessionStore): string => {
  const session = currentSession(s);
  const agent = currentAgent(s);
  if (!session || !agent) return '';

  const { messages } = session;
  return messages
    ?.map((message) => {
      return message.content;
    })
    .join(' ');
};

const currentSystemRole = (s: SessionStore): string => {
  const agent = currentAgent(s);
  if (!agent) return '';
  return agent.systemRole;
};

const currentChatMessage = (s: SessionStore): ChatMessage | undefined => {
  const { chatLoadingId } = s;
  return currentChats(s).find((item) => item.id === chatLoadingId);
};

const getChatMessageById = (s: SessionStore) => {
  return (id: string) => currentChats(s).find((item) => item.id === id);
};

const ttsLoading = (s: SessionStore) => {
  const { ttsLoadingId } = s;
  return (id: string) => ttsLoadingId === id;
};

const getLastMessageByAgentId = (s: SessionStore) => {
  return (id: string): ChatMessage | undefined => {
    const { sessionList, defaultSession } = s;
    if (id === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      return defaultSession.messages.at(-1);
    }
    const session = sessionList.find((item) => item.agentId === id);
    if (!session) return;
    return session.messages.at(-1);
  };
};

export const sessionSelectors = {
  currentChatIDs,
  filterSessionListIds,
  currentAgent,
  getAgentById,
  getLastMessageByAgentId,
  currentChatMessage,
  currentChats,
  currentChatsString,
  getChatMessageById,
  currentSessionConfig,
  currentSessionChatConfig,
  currentSession,
  currentSystemRole,
  sessionListIds,
  ttsLoading,
};

export const createItemSelector = (id: string) => (state: SessionStore) => {
  const message = sessionSelectors.getChatMessageById(state)(id);
  const loading = state.chatLoadingId === id;
  const updateMessage = state.updateMessage;

  return {
    message,
    loading,
    updateMessage,
  };
};
