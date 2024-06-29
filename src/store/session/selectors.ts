import { t } from 'i18next';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { DEFAULT_USER_AVATAR } from '@/constants/common';
import { useAgentStore } from '@/store/agent';
import { useSettingStore } from '@/store/setting';
import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';

import { SessionStore } from './index';

const currentSession = (s: SessionStore): Session | undefined => {
  const { activeId, sessionList, defaultSession } = s;
  if (activeId === LOBE_VIDOL_DEFAULT_AGENT_ID) {
    return defaultSession;
  }
  return sessionList.find((item) => item.agentId === activeId);
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

const getAgentById = (s: SessionStore) => {
  const { sessionList } = s;
  const agentStore = useAgentStore.getState();
  return (id: string) => {
    const agentId = sessionList.find((item) => item.agentId === id)?.agentId;
    if (agentId === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      return agentStore.defaultAgent;
    }
    return agentStore.getAgentById(agentId || '');
  };
};

const currentAgent = (s: SessionStore): Agent => {
  const { activeId } = s;
  const agentStore = useAgentStore.getState();
  return agentStore.getAgentById(activeId);
};

const currentAgentMeta = (s: SessionStore) => {
  const agent = currentAgent(s);
  return agent?.meta;
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

const currentChatsWithGreetingMessage = (s: SessionStore): ChatMessage[] => {
  const data = currentChats(s);

  const isBrandNewChat = data.length === 0;

  if (!isBrandNewChat) return data;

  const agent = currentAgent(s);

  const initTime = Date.now();

  const emptyGuideMessage = {
    content: agent?.greeting || t('greet', { ns: 'welcome', name: agent?.meta.name }),
    createdAt: initTime,
    id: 'default',
    meta: {
      avatar: agent?.meta.avatar,
      title: agent?.meta.name,
      description: agent?.meta.description,
    },
    role: 'assistant',
    updatedAt: initTime,
  } as ChatMessage;

  return [emptyGuideMessage];
};

const currentChatIDsWithGreetingMessage = (s: SessionStore): string[] => {
  const currentChats = currentChatsWithGreetingMessage(s);
  return currentChats.map((item) => item.id);
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
  currentChatsWithGreetingMessage,
  filterSessionListIds,
  currentAgentMeta,
  currentAgent,
  getAgentById,
  currentChatIDsWithGreetingMessage,
  getLastMessageByAgentId,
  currentChatMessage,
  currentChats,
  currentChatsString,
  currentSession,
  currentSystemRole,
  sessionListIds,
};
