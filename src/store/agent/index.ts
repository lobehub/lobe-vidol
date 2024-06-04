import { nanoid } from 'ai';
import { produce } from 'immer';
import { DeepPartial } from 'utility-types';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { DEFAULT_AGENT_CONFIG, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import {
  DEFAULT_TOUCH_ACTION_CONFIG_FEMALE,
  DEFAULT_TOUCH_ACTION_CONFIG_MALE,
} from '@/constants/touch';
import { DEFAULT_TTS_CONFIG_FEMALE, DEFAULT_TTS_CONFIG_MALE } from '@/constants/tts';
import { TouchActionType, touchReducer } from '@/store/agent/reducers/touch';
import { Agent, AgentMeta, GenderEnum } from '@/types/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';
import { TTS } from '@/types/tts';
import { mergeWithUndefined } from '@/utils/common';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

import { initialState } from './initialState';
import { agentSelectors } from './selectors/agent';

const AGENT_STORAGE_KEY = 'vidol-chat-agent-storage';

export interface AgentStore {
  /**
   * 激活角色
   */
  activateAgent: (identifier: string) => void;
  /**
   * 添加角色
   * @param agent
   */
  addLocalAgent: (agent: Agent) => void;
  /**
   * 清除角色配置
   */
  clearAgentStorage: () => Promise<void>;
  /**
   * 创建新角色
   */
  createNewAgent: (gender: GenderEnum) => void;
  /**
   * 创建触摸配置
   * @param currentTouchArea
   * @param action
   */
  createTouchAction: (currentTouchArea: TouchAreaEnum, action: TouchAction) => void;
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
   * 移除本地角色
   * @param agentId
   */
  removeLocalAgent: (agentId: string) => Promise<void>;
  /**
   * 删除触摸配置
   */
  removeTouchAction: (currentTouchArea: TouchAreaEnum, index: number) => void;
  /**
   * 设置角色配置
   */
  setAgentConfig: (agent: Agent) => void;
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
  /**
   * 更新触摸配置
   * @param currentTouchArea
   * @param index
   * @param action
   */
  updateTouchAction: (currentTouchArea: TouchAreaEnum, index: number, action: TouchAction) => void;
}

const getTouchConfigByGender = (gender: GenderEnum) => {
  switch (gender) {
    case GenderEnum.FEMALE: {
      return DEFAULT_TOUCH_ACTION_CONFIG_FEMALE;
    }
    case GenderEnum.MALE: {
      return DEFAULT_TOUCH_ACTION_CONFIG_MALE;
    }
    default: {
      return undefined;
    }
  }
};

const getTTSConfigByGender = (gender: GenderEnum) => {
  switch (gender) {
    case GenderEnum.FEMALE: {
      return DEFAULT_TTS_CONFIG_FEMALE;
    }
    case GenderEnum.MALE: {
      return DEFAULT_TTS_CONFIG_MALE;
    }
    default: {
      return undefined;
    }
  }
};

const createAgentStore: StateCreator<AgentStore, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,
  activateAgent: (identifier) => {
    set({ currentIdentifier: identifier });
  },
  clearAgentStorage: async () => {
    localStorage.removeItem(AGENT_STORAGE_KEY);
    await storage.clear();
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
  createNewAgent: (gender) => {
    const { localAgentList } = get();

    const newAgent: Agent = {
      agentId: nanoid(),
      ...DEFAULT_AGENT_CONFIG,
      touch: getTouchConfigByGender(gender),
      tts: getTTSConfigByGender(gender),
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
  updateTouchAction: (currentTouchArea, index, action) => {
    const { dispatchTouchAction } = get();
    dispatchTouchAction({
      type: 'UPDATE_TOUCH_ACTION',
      payload: {
        touchArea: currentTouchArea,
        index: index,
        action,
      },
    });
  },
  createTouchAction: (currentTouchArea, action) => {
    const { dispatchTouchAction } = get();

    dispatchTouchAction({
      type: 'CREATE_TOUCH_ACTION',
      payload: {
        touchArea: currentTouchArea,
        action,
      },
    });
  },
  updateAgentTTS: (tts) => {
    const { updateAgentConfig } = get();
    updateAgentConfig({ tts });
  },
  addLocalAgent: (agent) => {
    const { localAgentList } = get();

    const newList = produce(localAgentList, (draft) => {
      const index = draft.findIndex((item) => item.agentId === agent.agentId);

      if (index === -1) {
        draft.unshift(agent);
      }
    });
    set({ localAgentList: newList });
  },
  removeLocalAgent: async (agentId) => {
    const { localAgentList } = get();
    const newList = produce(localAgentList, (draft) => {
      const index = draft.findIndex((item) => item.agentId === agentId);

      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
    await storage.removeItem(getModelPathByAgentId(agentId));
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
