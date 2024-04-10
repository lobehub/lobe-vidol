import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { agentSelectors } from './selectors/agent';
import { danceSelectors } from './selectors/dance';
import { AgentStore, createAgentStore } from './slices/agent';
import { DanceStore, createDanceStore } from './slices/dance';
import { PanelStore, createPanelStore } from './slices/panel';

export type MarketStore = PanelStore & AgentStore & DanceStore;

const createStore: StateCreator<MarketStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...createAgentStore(...parameters),
  ...createDanceStore(...parameters),
  ...createPanelStore(...parameters),
});

export const useMarketStore = createWithEqualityFn<MarketStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_MARKET_STORE',
    }),
    {
      name: 'vidol-chat-market-storage', // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);

export const marketStoreSelectors = {
  ...agentSelectors,
  ...danceSelectors,
};
