import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { Config } from '@/types/config';

import { ConfigState, initialState } from './initialState';

const CONFIG_STORAGE_KEY = 'vidol-chat-config-storage';

export interface ConfigAction {
  /**
   * Reset config
   */
  resetConfig: () => void;
  /**
   * Set config
   * @param config
   */
  setConfig: (config: Partial<Config>) => void;
  /**
   * Set OpenAI config
   * @param config
   */
  setOpenAIConfig: (config: Partial<Config['languageModel']['openAI']>) => void;
}

export interface ConfigStore extends ConfigState, ConfigAction {}

const createStore: StateCreator<ConfigStore, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,

  resetConfig: () => {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    set({ ...initialState });
  },

  setConfig: (config) => {
    const prevSetting = get().config;
    const nextSetting = produce(prevSetting, (draftState) => {
      merge(draftState, config);
    });
    if (isEqual(prevSetting, nextSetting)) return;
    set({ config: nextSetting });
  },

  setOpenAIConfig: (config) => {
    get().setConfig({ languageModel: { openAI: config } });
  },
});

export const useConfigStore = createWithEqualityFn<ConfigStore>()(
  subscribeWithSelector(
    persist(
      devtools(createStore, {
        name: 'VIDOL_CONFIG_STORE',
      }),
      { name: CONFIG_STORAGE_KEY },
    ),
  ),
  shallow,
);

export { configSelectors } from './selectors/config';
