import { produce } from 'immer';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { Agent } from '@/types/agent';

import { initialState } from './initialState';

export interface AgentStore {
  activateAgent: (identifier: string) => void;
  currentIdentifier: string;
  deactivateAgent: () => void;
  defaultAgent: Agent;
  getAgentById: (agentId: string) => Agent | undefined;
  subscribe: (agent: Agent) => void;
  subscribedList: Agent[];
  unsubscribe: (agentId: string) => void;
}

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      activateAgent: (identifier) => {
        set({ currentIdentifier: identifier });
      },

      deactivateAgent: () => {
        set({ currentIdentifier: undefined });
      },
      getAgentById: (agentId: string): Agent | undefined => {
        const { subscribedList, defaultAgent } = get();

        if (agentId === LOBE_VIDOL_DEFAULT_AGENT_ID) return defaultAgent;

        const currentAgent = subscribedList.find((item) => item.agentId === agentId);
        if (!currentAgent) return undefined;

        return currentAgent;
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
        set({ currentIdentifier: newList[0]?.agentId, subscribedList: newList });
      },
    }),
    {
      name: 'vidol-chat-agent-storage',
    },
  ),
  shallow,
);

export { agentListSelectors } from './selectors/agent';
