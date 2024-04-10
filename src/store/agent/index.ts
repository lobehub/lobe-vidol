import { Agent } from '@/types/agent';
import { produce } from 'immer';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';


export interface AgentStore {
  activateAgent: (identifier: string) => void;
  currentIdentifier: string;
  deactivateAgent: () => void;
  getAgentById: (agentId: string) => Agent | undefined;
  subscribe: (agent: Agent) => void;
  subscribedList: Agent[];
  unsubscribe: (agentId: string) => void;
}

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  persist(
    (set, get) => ({
      activateAgent: (identifier) => {
        set({ currentIdentifier: identifier });
      },
      currentIdentifier: '',
      deactivateAgent: () => {
        set({ currentIdentifier: undefined });
      },
      getAgentById: (agentId: string): Agent | undefined => {
        const { subscribedList } = get();

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
      subscribedList: [],
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



export {agentListSelectors} from './selectors/agent';