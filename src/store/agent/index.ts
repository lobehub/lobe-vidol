import { nanoid } from 'ai';
import { t } from 'i18next';
import { produce } from 'immer';
import { DeepPartial } from 'utility-types';
import {
  PersistOptions,
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { DEFAULT_AGENT_AVATAR_URL } from '@/constants/common';
import { DEFAULT_LLM_CONFIG } from '@/constants/openai';
import { DEFAULT_TTS_CONFIG_FEMALE, DEFAULT_TTS_CONFIG_MALE } from '@/constants/tts';
import createTouchStore from '@/store/agent/slices/touch';
import { Agent, AgentMeta, CategoryEnum, GenderEnum } from '@/types/agent';
import { TTS } from '@/types/tts';
import { mergeWithUndefined } from '@/utils/common';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

import { initialState } from './initialState';
import { TouchStore } from './slices/touch';

export const AGENT_STORAGE_KEY = 'vidol-chat-agent-storage';

export interface AgentStore extends TouchStore {
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
  getAgentById: (id: string) => Agent | undefined;
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
   * 设置角色配置
   */
  setAgentConfig: (agent: Agent) => void;
  /**
   * 更新角色配置
   */
  updateAgentConfig: (agent: DeepPartial<Agent>, updateAgentId?: string) => void;
  /**
   *  更新角色元数据
   */
  updateAgentMeta: (meta: DeepPartial<AgentMeta>) => void;
  /**
   * 更新角色 TTS
   */
  updateAgentTTS: (tts: DeepPartial<TTS>) => void;
}

const getTTSConfigByGender = (gender: GenderEnum) => {
  switch (gender) {
    case GenderEnum.FEMALE: {
      return DEFAULT_TTS_CONFIG_FEMALE;
    }
    case GenderEnum.MALE: {
      return DEFAULT_TTS_CONFIG_MALE;
    }
  }
};

const createAgentStore: StateCreator<AgentStore, [['zustand/devtools', never]]> = (
  set,
  get,
  store,
) => ({
  ...initialState,
  ...createTouchStore(set, get, store),
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
  getAgentById: (agentId: string) => {
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
      systemRole: '',
      greeting: t('agent.hello', { ns: 'welcome' }),
      meta: {
        name: t('agent.meta.name'),
        description: t('agent.meta.description'),
        avatar: DEFAULT_AGENT_AVATAR_URL,
        cover: '',
        category: CategoryEnum.ANIME,
        readme: '',
        gender: gender,
      },
      touch: undefined,
      tts: getTTSConfigByGender(gender),
      ...DEFAULT_LLM_CONFIG,
    };

    const newList = produce(localAgentList, (draft) => {
      draft.unshift(newAgent);
    });

    set({ currentIdentifier: newAgent.agentId, localAgentList: newList });
  },
  updateAgentConfig: (agent, updateAgentId) => {
    const { localAgentList, currentIdentifier, defaultAgent } = get();

    const updateIdentifier = updateAgentId || currentIdentifier;

    if (updateIdentifier === LOBE_VIDOL_DEFAULT_AGENT_ID) {
      const mergeAgent = produce(defaultAgent, (draft) => {
        mergeWithUndefined(draft, agent);
      });
      set({ defaultAgent: mergeAgent });
      return;
    }

    const agents = produce(localAgentList, (draft) => {
      const index = draft.findIndex((localAgent) => localAgent.agentId === updateIdentifier);
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

const persistOptions: PersistOptions<AgentStore> = {
  name: AGENT_STORAGE_KEY, // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => storage),
  version: 0,
  // skipHydration: true,
};

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  subscribeWithSelector(
    persist(
      devtools(createAgentStore, {
        name: 'VIDOL_AGENT_STORE',
      }),
      persistOptions,
    ),
  ),
  shallow,
);

export { agentSelectors } from './selectors/agent';
