import { DEFAULT_VIDOL_AGENT, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { DEFAULT_USER_AVATAR } from '@/constants/common';
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

const getAgentById = (s: SessionStore) => {
  const { localAgentList } = s;

  return (id: string): Agent | undefined => {
    if (id === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      return DEFAULT_VIDOL_AGENT;
    } else {
      return localAgentList.find((item) => item.agentId === id);
    }
  };
};

const filterSessionListIds = (s: SessionStore, filter: string | undefined) => {
  const dataSource = sessionListIds(s);
  if (!filter) return dataSource;
  return dataSource.filter((agentId) => {
    const agent = getAgentById(s)(agentId);
    const { name, description } = agent?.meta || {};
    return !filter || name?.includes(filter) || description?.includes(filter);
  });
};

const currentAgent = (s: SessionStore): Agent | undefined => {
  const { activeId, localAgentList } = s;
  if (activeId === LOBE_VIDOL_DEFAULT_AGENT_ID) {
    return DEFAULT_VIDOL_AGENT;
  }
  return localAgentList.find((item) => item.agentId === activeId);
};

const currentChats = (s: SessionStore): ChatMessage[] => {
  const session = currentSession(s);
  const agent = currentAgent(s);
  if (!session || !agent) return [];

  const { avatar, name, description } = agent.meta;

  const { messages } = session;
  return messages?.map((message) => {
    return {
      ...message,
      meta: {
        avatar: message.role === 'user' ? DEFAULT_USER_AVATAR : avatar,
        description: message.role === 'user' ? undefined : description,
        title: message.role === 'user' ? '你' : name,
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
    content: agent?.greeting || `你好，我是${agent?.meta.name}，有什么可以帮助你的吗？`,
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

const previousChats = (s: SessionStore, id: string): ChatMessage[] => {
  const chatList = currentChats(s);
  const index = chatList.findIndex((item) => item.id === id);
  if (index === -1) return [];
  return chatList.slice(0, index);
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

const currentAgentModel = (s: SessionStore): string => {
  const agent = currentAgent(s);
  if (!agent) return '';
  return agent.meta.model;
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

const isDefaultAgent = (s: SessionStore) => {
  return (id: string): boolean => {
    const agent = getAgentById(s)(id);
    return agent?.agentId === LOBE_VIDOL_DEFAULT_AGENT_ID;
  };
};

export const sessionSelectors = {
  currentChatsWithGreetingMessage,
  filterSessionListIds,
  currentAgent,
  currentAgentModel,
  currentChatIDsWithGreetingMessage,
  isDefaultAgent,
  getLastMessageByAgentId,
  currentChatMessage,
  currentChats,
  currentChatsString,
  currentSession,
  currentSystemRole,
  getAgentById,
  previousChats,
  sessionListIds,
};
