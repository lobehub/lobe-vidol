import { V_CHAT_DEFAULT_AGENT_ID } from '@/constants/agent';
import { DEFAULT_USER_AVATAR } from '@/constants/common';
import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { SessionStore } from './index';

const currentSession = (s: SessionStore): Session | undefined => {
  const { activeId, sessionList } = s;
  return sessionList.find((item) => item.agentId === activeId);
};

const sessionListIds = (s: SessionStore): string[] => {
  const { sessionList } = s;
  return sessionList.map((item) => item.agentId);
};

const currentChatIDs = (s: SessionStore): string[] => {
  const session = currentSession(s);
  if (!session) return [];
  return session.messages.map((item) => item.id);
};

const currentAgent = (s: SessionStore): Agent | undefined => {
  const { activeId, localAgentList } = s;
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

const getAgentById = (s: SessionStore) => {
  const { localAgentList } = s;

  return (id: string): Agent | undefined => localAgentList.find((item) => item.agentId === id);
};

const isDefaultAgent = (s: SessionStore) => {
  return (id: string): boolean => {
    const agent = getAgentById(s)(id);
    return agent?.agentId === V_CHAT_DEFAULT_AGENT_ID;
  };
};

export const sessionSelectors = {
  currentAgent,
  currentAgentModel,
  currentChatIDs,
  isDefaultAgent,
  currentChatMessage,
  currentChats,
  currentChatsString,
  currentSession,
  currentSystemRole,
  getAgentById,
  previousChats,
  sessionListIds,
};
