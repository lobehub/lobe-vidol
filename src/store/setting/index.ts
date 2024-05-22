import { PrimaryColors } from '@lobehub/ui';
import type { ThemeMode } from 'antd-style';
import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { BackgroundEffect, OpenAIConfig, UserConfig } from '@/types/config';

import { SettingState, initialState } from './initialState';

const SETTING_STORAGE_KEY = 'vidol-chat-config-storage';

export interface SettingAction {
  /**
   * Reset config
   */
  resetConfig: () => void;
  /**
   * Set avatar
   * @param avatar
   */
  setAvatar: (avatar: string) => void;
  /**
   * Set background effect
   * @param backgroundEffect
   */
  setBackgroundEffect: (backgroundEffect: BackgroundEffect) => void;
  /**
   * Set config
   * @param config
   */
  setConfig: (config: Partial<UserConfig>) => void;
  /**
   * Set nick name
   * @param nickName
   */
  setNickName: (nickName: string) => void;
  /**
   * Set OpenAI config
   * @param config
   */
  setOpenAIConfig: (config: Partial<OpenAIConfig>) => void;

  /**
   * Set primary color
   * @param primaryColor
   */
  setPrimaryColor: (primaryColor: PrimaryColors) => void;
  /**
   * Set theme mode
   * @param themeMode
   */
  setThemeMode: (themeMode: ThemeMode) => void;
}

export interface SettingStore extends SettingState, SettingAction {}

const createStore: StateCreator<SettingStore, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,

  resetConfig: () => {
    localStorage.removeItem(SETTING_STORAGE_KEY);
    set({ ...initialState });
  },
  setAvatar: (avatar) => {
    get().setConfig({ avatar });
  },
  setPrimaryColor: (primaryColor) => {
    get().setConfig({ primaryColor });
  },
  setBackgroundEffect: (backgroundEffect) => {
    get().setConfig({ backgroundEffect });
  },
  setNickName: (nickName) => {
    get().setConfig({ nickName });
  },
  setThemeMode: (themeMode) => {
    get().setConfig({ themeMode });
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

export const useSettingStore = createWithEqualityFn<SettingStore>()(
  subscribeWithSelector(
    persist(
      devtools(createStore, {
        name: 'VIDOL_CONFIG_STORE',
      }),
      { name: SETTING_STORAGE_KEY },
    ),
  ),
  shallow,
);

export { configSelectors } from './selectors/config';
