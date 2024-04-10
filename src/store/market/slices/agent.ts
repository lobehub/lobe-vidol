import { getAgentIndex } from '@/services/agent';
import { MarketStore } from '@/store/market';
import { Agent } from '@/types/agent';
import { isEqual } from 'lodash-es';
import { StateCreator } from 'zustand/vanilla';

export interface AgentStore {
  activateAgent: (identifier: string) => void;
  agentList: Agent[];
  agentLoading: boolean;
  currentAgentId: string;
  deactivateAgent: () => void;
  fetchAgentIndex: () => void;
}

export const createAgentStore: StateCreator<
  MarketStore,
  [['zustand/devtools', never]],
  [],
  AgentStore
> = (set, get) => {
  return {
    activateAgent: (identifier) => {
      set({ currentAgentId: identifier });
    },
    agentList: [],
    agentLoading: false,
    currentAgentId: '',
    deactivateAgent: () => {
      set({ currentAgentId: undefined });
    },
    fetchAgentIndex: async () => {
      set({ agentLoading: true });
      try {
        const { agents = [] } = await getAgentIndex();
        const { agentList } = get();
        if (!isEqual(agentList, agents)) set({ agentList: agents });
      } catch {
        set({ agentList: [] });
      } finally {
        set({ agentLoading: false });
      }
    },
  };
};
