import { StateCreator } from 'zustand/vanilla';

import { MarketStore } from '@/store/market';

export type tabType = 'agent' | 'dance';

export interface PanelStore {
  setTab: (tab: tabType) => void;
  tab: tabType;
}

export const createPanelStore: StateCreator<
  MarketStore,
  [['zustand/devtools', never]],
  [],
  PanelStore
> = (set) => {
  return {
    setTab: (tab) => set({ tab }),
    tab: 'agent',
  };
};
