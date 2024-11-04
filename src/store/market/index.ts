import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { danceSelectors } from './selectors/dance';
import { DanceStore, createDanceStore } from './slices/dance';

export type MarketStore = DanceStore;

const MARKET_STORAGE_KEY = 'vidol-chat-market-storage';

const createStore: StateCreator<MarketStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...createDanceStore(...parameters),
});

export const useMarketStore = createWithEqualityFn<MarketStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_MARKET_STORE',
    }),
    {
      name: MARKET_STORAGE_KEY, // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);

export const marketStoreSelectors = {
  ...danceSelectors,
};
