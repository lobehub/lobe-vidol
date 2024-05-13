import { nanoid } from 'ai';
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
  /**
   * 激活角色
   */
  activateAgent: (identifier: string) => void;
  /**
   * 清除角色配置
   */
  clearAgentStorage: () => void;
  /**
   * 创建新角色
   */
  createNewAgent: () => void;
  /**
   * 当前激活的角色
   */
  currentIdentifier: string;
  /**
   * 关闭角色
   */
  deactivateAgent: () => void;
  /**
   * 默认角色
   */
  defaultAgent: Agent;
  /**
   * 根据 ID 获取角色
   * @param id
   */
  getAgentById: (id?: string) => Agent | undefined;
  /**
   * 本地角色列表
   */
  localAgentList: Agent[];
  /**
   * 订阅角色
   * @param agent
   */
  subscribe: (agent: Agent) => void;
  /**
   * 取消订阅角色
   * @param agentId
   */
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
        const { localAgentList, defaultAgent } = get();

        if (agentId === LOBE_VIDOL_DEFAULT_AGENT_ID) return defaultAgent;

        const currentAgent = localAgentList.find((item) => item.agentId === agentId);
        if (!currentAgent) return undefined;

        return currentAgent;
      },
      createNewAgent: () => {
        const { localAgentList } = get();
        const newAgent: Agent = {
          agentId: nanoid(),
          greeting: '你好，我是自定义角色，有什么可以帮助你的吗？',
          systemRole: '',
          meta: {
            name: '自定义角色',
            description: '这是一个自定义角色',
            avatar: '🤖',
          },
        };

        const newList = produce(localAgentList, (draft) => {
          draft.unshift(newAgent);
        });

        set({ currentIdentifier: newAgent.agentId, localAgentList: newList });
      },
      updateAgentConfig: (agent) => {
        const { localAgentList, currentIdentifier, defaultAgent } = get();
        if (currentIdentifier === LOBE_VIDOL_DEFAULT_AGENT_ID) {
          const mergeAgent = produce(defaultAgent, (draft) => {
            merge(draft, agent);
          });
          set({ defaultAgent: mergeAgent });
          return;
        }

        const agents = produce(localAgentList, (draft) => {
          const index = draft.findIndex((localAgent) => localAgent.agentId === currentIdentifier);
          if (index === -1) return;
          draft[index] = merge(draft[index], agent);
        });
        set({ localAgentList: agents });
      },
      subscribe: (agent) => {
        const { localAgentList } = get();

        const newList = produce(localAgentList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agent.agentId);

          if (index === -1) {
            draft.unshift(agent);
          }
        });
        set({ localAgentList: newList });
      },
      unsubscribe: (agentId) => {
        const { localAgentList } = get();
        const newList = produce(localAgentList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agentId);

          if (index !== -1) {
            draft.splice(index, 1);
          }
        });
        set({ currentIdentifier: LOBE_VIDOL_DEFAULT_AGENT_ID, localAgentList: newList });
      },
    }),
    {
      name: AGENT_STORAGE_KEY,
    },
  ),
  shallow,
);

export { agentListSelectors } from './selectors/agent';
