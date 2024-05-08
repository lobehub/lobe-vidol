import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { Agent } from '@/types/agent';

import { AgentStore } from '../index';

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent | undefined => {
  const { currentIdentifier, subscribedList, defaultAgent } = s;
  if (currentIdentifier === LOBE_VIDOL_DEFAULT_AGENT_ID) return defaultAgent;

  const currentAgent = subscribedList.find((item) => item.agentId === currentIdentifier);
  if (!currentAgent) return undefined;

  return currentAgent;
};

const agentListIds = (s: AgentStore): string[] => {
  const { subscribedList } = s;
  return subscribedList.map((item) => item.agentId);
};

const filterAgentListIds = (s: AgentStore, filter: string | undefined) => {
  const dataSource = agentListIds(s);
  if (!filter) return dataSource;
  return dataSource.filter((agentId) => {
    const agent = s.getAgentById(agentId);
    const { name, description } = agent?.meta || {};
    return !filter || name?.includes(filter) || description?.includes(filter);
  });
};

const currentAgentModel = (s: AgentStore): string | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.meta.model;
};

const isDefaultAgent = (s: AgentStore) => {
  return (id: string): boolean => {
    const agent = s.getAgentById(id);
    return agent?.agentId === LOBE_VIDOL_DEFAULT_AGENT_ID;
  };
};

const subscribed = (s: AgentStore) => (agentId: string) => {
  const { subscribedList } = s;
  const index = subscribedList.findIndex((item) => item.agentId === agentId);

  return index !== -1;
};

export const agentListSelectors = {
  currentAgentItem,
  filterAgentListIds,
  agentListIds,
  isDefaultAgent,
  showSideBar,
  currentAgentModel,
  subscribed,
};
