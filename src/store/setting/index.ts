import { NeutralColors, PrimaryColors } from '@lobehub/ui';
import { produce } from 'immer';
import { isEqual } from 'lodash-es';
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

import { ModelListAction, createModelListSlice } from '@/store/setting/slices/modelList';
import createTouchStore, { TouchStore } from '@/store/setting/slices/touch';
import { BackgroundEffect, Config } from '@/types/config';
import { LocaleMode } from '@/types/locale';
import { mergeWithUndefined } from '@/utils/common';
import { vidolStorage } from '@/utils/storage';
import { switchLang } from '@/utils/switchLang';

import { SettingState, initialState } from './initialState';

export const SETTING_STORAGE_KEY = 'vidol-chat-config-storage';

export interface SettingAction extends TouchStore {
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
  setConfig: (config: DeepPartial<Config>) => void;
  /**
   * Set neutral color
   * @param neutralColor
   */
  setNeutralColor: (neutralColor: NeutralColors) => void;
  /**
   * Set nick name
   * @param nickName
   */
  setNickName: (nickName: string) => void;

  /**
   * Set primary color
   * @param primaryColor
   */
  setPrimaryColor: (primaryColor: PrimaryColors) => void;

  /**
   * Switch locale
   * @param locale
   */
  switchLocale: (locale: LocaleMode) => void;
}

export interface SettingStore extends SettingState, SettingAction, ModelListAction {}

const createStore: StateCreator<SettingStore, [['zustand/devtools', never]], [], SettingStore> = (
  set,
  get,
  store,
) => ({
  ...initialState,
  ...createTouchStore(set, get, store),
  ...createModelListSlice(set, get, store),
  resetConfig: () => {
    localStorage.removeItem(SETTING_STORAGE_KEY);
    set({ ...initialState });
    get().refreshDefaultModelProviderList();
  },
  setAvatar: (avatar) => {
    get().setConfig({ avatar });
  },
  setPrimaryColor: (primaryColor) => {
    get().setConfig({ primaryColor });
  },
  setNeutralColor: (neutralColor) => {
    get().setConfig({ neutralColor });
  },
  setBackgroundEffect: (backgroundEffect) => {
    get().setConfig({ backgroundEffect });
  },
  setNickName: (nickName) => {
    get().setConfig({ nickName });
  },
  switchLocale: (locale) => {
    get().setConfig({ locale });
    switchLang(locale);
  },
  setConfig: (config) => {
    const prevSetting = get().config;
    const nextSetting = produce(prevSetting, (draftState) => {
      mergeWithUndefined(draftState, config);
    });
    if (isEqual(prevSetting, nextSetting)) return;
    set({ config: nextSetting });

    get().refreshDefaultModelProviderList();
  },
});

const persistOptions: PersistOptions<SettingStore> = {
  name: SETTING_STORAGE_KEY, // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => vidolStorage),
  version: 0,
};

export const useSettingStore = createWithEqualityFn<SettingStore>()(
  subscribeWithSelector(
    persist(
      devtools(createStore, {
        name: 'VIDOL_CONFIG_STORE',
      }),
      persistOptions,
    ),
  ),
  shallow,
);

export { configSelectors } from './selectors/config';
