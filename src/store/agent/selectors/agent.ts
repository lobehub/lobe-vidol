import { DEFAULT_AGENT_CONFIG, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { EMPTY_TOUCH_CONFIG } from '@/constants/touch';
import { configSelectors, useSettingStore } from '@/store/setting';
import { Agent, AgentMeta, GenderEnum } from '@/types/agent';
import { LLMParams } from '@/types/llm';
import { TouchAction, TouchActionConfig, TouchAreaEnum } from '@/types/touch';
import { TTS } from '@/types/tts';
import { merge } from '@/utils/merge';

import { AgentStore } from '../index';

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent | undefined => {
  const { currentIdentifier, localAgentList, defaultAgent } = s;
  if (currentIdentifier === LOBE_VIDOL_DEFAULT_AGENT_ID) return defaultAgent;

  const currentAgent = localAgentList.find((item) => item.agentId === currentIdentifier);
  if (!currentAgent) return undefined;

  return merge(DEFAULT_AGENT_CONFIG, currentAgent);
};

const currentAgentMeta = (s: AgentStore): AgentMeta | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.meta;
};

const currentAgentGreeting = (s: AgentStore): string | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.greeting;
};

const currentAgentTTS = (s: AgentStore): TTS | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.tts;
};

const currentAgentTouch = (s: AgentStore): TouchActionConfig | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.touch || EMPTY_TOUCH_CONFIG;
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

const currentAgentParams = (s: AgentStore): LLMParams | undefined => {
  const currentAgent = currentAgentItem(s);
  if (!currentAgent) return undefined;

  return currentAgent.params;
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

const getAgentTouchActionsByIdAndArea = (s: AgentStore) => {
  return (id: string, area: TouchAreaEnum): TouchAction[] => {
    if (!area) return [];
    const agent = s.getAgentById(id);
    const gender = agent?.meta.gender || GenderEnum.FEMALE;
    const commonTouchConfig = configSelectors.getTouchActionsByGenderAndArea(
      useSettingStore.getState(),
      gender,
      area,
    );
    return agent?.touch?.enable ? agent?.touch[area] : commonTouchConfig || [];
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
  getAgentTouchActionsByIdAndArea,
  currentAgentMeta,
  currentAgentTTS,
  currentAgentTouch,
  currentAgentParams,
  currentAgentGreeting,
  filterAgentListIds,
  getAgentModelById,
  agentListIds,
  isDefaultAgent,
  showSideBar,
  currentAgentModel,
  currentAgentId,
  subscribed,
};
