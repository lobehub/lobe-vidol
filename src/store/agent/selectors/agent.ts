import { Agent } from '@/types/agent';
import { AgentStore } from '../index';

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent | undefined => {
  const { currentIdentifier, subscribedList } = s;
  const currentAgent = subscribedList.find((item) => item.agentId === currentIdentifier);
  if (!currentAgent) return undefined;

  return currentAgent;
};

const subscribed = (s: AgentStore) => (agentId: string) => {
  const { subscribedList } = s;
  const index = subscribedList.findIndex((item) => item.agentId === agentId);

  return index !== -1;
};

export const agentListSelectors = {
  currentAgentItem,
  showSideBar,
  subscribed,
};
