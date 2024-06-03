import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { EMPTY_TTS_CONFIG } from '@/constants/touch';
import { Agent, AgentMeta } from '@/types/agent';
import { TouchActionConfig } from '@/types/touch';
import { TTS } from '@/types/tts';

import { AgentStore } from '../index';

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent | undefined => {
  const { currentIdentifier, localAgentList, defaultAgent } = s;
  if (currentIdentifier === LOBE_VIDOL_DEFAULT_AGENT_ID) return defaultAgent;

  const currentAgent = localAgentList.find((item) => item.agentId === currentIdentifier);
  if (!currentAgent) return undefined;

  return currentAgent;
};

const currentAgentMeta = (s: AgentStore): AgentMeta | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.meta;
};

const currentAgentTTS = (s: AgentStore): TTS | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.tts;
};

const currentAgentTouch = (s: AgentStore): TouchActionConfig | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.touch || EMPTY_TTS_CONFIG;
};

const agentListIds = (s: AgentStore): string[] => {
  const { localAgentList } = s;
  return localAgentList.map((item) => item.agentId);
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

const currentAgentId = (s: AgentStore): string | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.agentId;
};

const getAgentModelById = (s: AgentStore) => {
  return (id: string): string | undefined => {
    const agent = s.getAgentById(id);
    return agent?.meta.model;
  };
};

const isDefaultAgent = (s: AgentStore) => {
  return (id: string): boolean => {
    const agent = s.getAgentById(id);
    return agent?.agentId === LOBE_VIDOL_DEFAULT_AGENT_ID;
  };
};

const subscribed = (s: AgentStore) => (agentId: string | undefined) => {
  if (!agentId) return false;
  const { localAgentList } = s;
  const index = localAgentList.findIndex((item) => item.agentId === agentId);

  return index !== -1;
};

export const agentSelectors = {
  currentAgentItem,
  currentAgentMeta,
  currentAgentTTS,
  currentAgentTouch,
  filterAgentListIds,
  getAgentModelById,
  agentListIds,
  isDefaultAgent,
  showSideBar,
  currentAgentModel,
  currentAgentId,
  subscribed,
};
