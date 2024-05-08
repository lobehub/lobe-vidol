import { produce } from 'immer';
import { merge } from 'lodash-es';
import { DeepPartial } from 'utility-types';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { Agent } from '@/types/agent';

import { initialState } from './initialState';

const AGENT_STORAGE_KEY = 'vidol-chat-agent-storage';

export interface AgentStore {
  activateAgent: (identifier: string) => void;
  /**
   * 清除角色配置
   */
  clearAgentStorage: () => void;
  currentIdentifier: string;
  deactivateAgent: () => void;
  defaultAgent: Agent;
  getAgentById: (agentId?: string) => Agent | undefined;
  subscribe: (agent: Agent) => void;
  subscribedList: Agent[];
  unsubscribe: (agentId: string) => void;
  /**
   * 更新角色配置
   */
  updateAgentConfig: (agent: DeepPartial<Agent>) => void;
}

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      activateAgent: (identifier) => {
        set({ currentIdentifier: identifier });
      },
      clearAgentStorage: () => {
        localStorage.removeItem(AGENT_STORAGE_KEY);
        set({ ...initialState });
      },

      deactivateAgent: () => {
        set({ currentIdentifier: undefined });
      },
      getAgentById: (agentId?: string): Agent | undefined => {
        if (!agentId) return undefined;
        const { subscribedList, defaultAgent } = get();

        if (agentId === LOBE_VIDOL_DEFAULT_AGENT_ID) return defaultAgent;

        const currentAgent = subscribedList.find((item) => item.agentId === agentId);
        if (!currentAgent) return undefined;

        return currentAgent;
      },
      updateAgentConfig: (agent) => {
        const { subscribedList, currentIdentifier, defaultAgent } = get();
        if (currentIdentifier === LOBE_VIDOL_DEFAULT_AGENT_ID) {
          const mergeAgent = produce(defaultAgent, (draft) => {
            merge(draft, agent);
          });
          set({ defaultAgent: mergeAgent });
          return;
        }

        const agents = produce(subscribedList, (draft) => {
          const index = draft.findIndex((localAgent) => localAgent.agentId === currentIdentifier);
          if (index === -1) return;
          draft[index] = merge(draft[index], agent);
        });
        set({ subscribedList: agents });
      },
      subscribe: (agent) => {
        const { subscribedList } = get();

        const newList = produce(subscribedList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agent.agentId);

          if (index === -1) {
            draft.unshift(agent);
          }
        });
        set({ subscribedList: newList });
      },
      unsubscribe: (agentId) => {
        const { subscribedList } = get();
        const newList = produce(subscribedList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agentId);

          if (index !== -1) {
            draft.splice(index, 1);
          }
        });
        set({ currentIdentifier: LOBE_VIDOL_DEFAULT_AGENT_ID, subscribedList: newList });
      },
    }),
    {
      name: AGENT_STORAGE_KEY,
    },
  ),
  shallow,
);

export { agentListSelectors } from './selectors/agent';
