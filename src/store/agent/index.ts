import { nanoid } from 'ai';
import { produce } from 'immer';
import { DeepPartial } from 'utility-types';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { DEFAULT_AGENT_CONFIG, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { TouchActionType, touchReducer } from '@/store/agent/reducers/touch';
import { Agent, AgentMeta } from '@/types/agent';
import { TouchAreaEnum } from '@/types/touch';
import { TTS } from '@/types/tts';
import { mergeWithUndefined } from '@/utils/common';

import { initialState } from './initialState';
import { agentSelectors } from './selectors/agent';

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
   * Touch Reducer
   * @param payload
   */
  dispatchTouchAction: (payload: TouchActionType) => void;
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
   * 删除触摸配置
   */
  removeTouchAction: (currentTouchArea: TouchAreaEnum, index: number) => void;
  /**
   * 设置角色配置
   */
  setAgentConfig: (agent: Agent) => void;
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
  /**
   *  更新角色元数据
   */
  updateAgentMeta: (meta: DeepPartial<AgentMeta>) => void;
  /**
   * 更新角色 TTS
   */
  updateAgentTTS: (tts: DeepPartial<TTS>) => void;
}

const createAgentStore: StateCreator<AgentStore, [['zustand/devtools', never]]> = (set, get) => ({
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
      ...DEFAULT_AGENT_CONFIG,
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
        mergeWithUndefined(draft, agent);
      });
      set({ defaultAgent: mergeAgent });
      return;
    }

    const agents = produce(localAgentList, (draft) => {
      const index = draft.findIndex((localAgent) => localAgent.agentId === currentIdentifier);
      if (index === -1) return;
      mergeWithUndefined(draft[index], agent);
    });
    set({ localAgentList: agents });
  },
  setAgentConfig: (agent) => {
    const { localAgentList, currentIdentifier } = get();
    if (currentIdentifier === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      set({ defaultAgent: agent });
      return;
    }

    const agents = produce(localAgentList, (draft) => {
      const index = draft.findIndex((localAgent) => localAgent.agentId === currentIdentifier);
      if (index === -1) return;
      draft[index] = agent;
    });
    set({ localAgentList: agents });
  },
  updateAgentMeta: (meta) => {
    const { updateAgentConfig } = get();
    updateAgentConfig({ meta });
  },

  dispatchTouchAction: (payload) => {
    const { setAgentConfig } = get();
    const agent = agentSelectors.currentAgentItem(get());
    const touch = agentSelectors.currentAgentTouch(get());

    if (!touch || !agent) {
      return;
    }

    const config = touchReducer(touch, payload);

    setAgentConfig({ ...agent, touch: config });
  },
  removeTouchAction: (currentTouchArea, index) => {
    const { dispatchTouchAction } = get();
    dispatchTouchAction({
      type: 'DELETE_TOUCH_ACTION',
      payload: {
        touchArea: currentTouchArea,
        index: index,
      },
    });
  },
  updateAgentTTS: (tts) => {
    const { updateAgentConfig } = get();
    updateAgentConfig({ tts });
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
});

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  subscribeWithSelector(
    persist(
      devtools(createAgentStore, {
        name: 'VIDOL_AGENT_STORE',
      }),
      {
        name: AGENT_STORAGE_KEY,
      },
    ),
  ),
  shallow,
);

export { agentSelectors } from './selectors/agent';
