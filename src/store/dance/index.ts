import { StateCreator } from 'zustand';
import { PersistOptions, createJSONStorage, devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Dance } from '@/types/dance';
import { vidolStorage } from '@/utils/storage';

import { initialState } from './initialState';
import { DanceListStore, createDanceStore } from './slices/dancelist';

export type DanceStore = DanceListStore & {
  /**
   * 清除音乐配置
   */
  clearDanceStorage: () => Promise<void>;
  currentIdentifier: string;
  currentPlayId: string;
  danceList: Dance[];
  danceLoading: boolean;
};

export const DANCE_STORAGE_KEY = 'vidol-chat-dance-storage';

const createStore: StateCreator<DanceStore, [['zustand/devtools', never]]> = (set, get, store) => ({
  ...initialState,
  ...createDanceStore(set, get, store),
  clearDanceStorage: async () => {
    await vidolStorage.removeItem(DANCE_STORAGE_KEY);
    set({ ...initialState });
  },
});

const persistOptions: PersistOptions<DanceStore> = {
  name: DANCE_STORAGE_KEY, // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => vidolStorage),
  version: 0,
};

export const useDanceStore = createWithEqualityFn<DanceStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_DANCE_STORE',
    }),
    persistOptions,
  ),
  shallow,
);

export { danceListSelectors } from './selectors/dancelist';
