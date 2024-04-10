import { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { DanceListStore, createDanceStore } from './slices/dancelist';
import { PlayListStore, createPlayListStore } from './slices/playlist';

export type DanceStore = DanceListStore & PlayListStore;

const createStore: StateCreator<DanceStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...createDanceStore(...parameters),
  ...createPlayListStore(...parameters),
});

export const useDanceStore = createWithEqualityFn<DanceStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_DANCE_STORE',
    }),
    {
      name: 'vidol-chat-dance-storage', // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);



export {danceListSelectors} from './selectors/dance';