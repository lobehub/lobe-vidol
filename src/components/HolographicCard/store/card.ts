import { createWithEqualityFn } from 'zustand/traditional';

type ActiveCardStore = {
  activeCard: HTMLDivElement | undefined | null;
  setActiveCard: (card: HTMLDivElement | undefined | null) => void;
};

export const useActiveCard = createWithEqualityFn<ActiveCardStore>((set) => ({
  activeCard: undefined,
  setActiveCard: (card) => set(() => ({ activeCard: card })),
}));
