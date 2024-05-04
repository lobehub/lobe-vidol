import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface GlobalStore {
  setChatSidebar: (show: boolean) => void;
  showChatSidebar: boolean;
  toggleChatSideBar: () => void;
}

export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  (set) => ({
    setChatSidebar: (show) => {
      set({ showChatSidebar: show });
    },
    toggleChatSideBar: () => {
      set((state) => ({ showChatSidebar: !state.showChatSidebar }));
    },
    showChatSidebar: true,
  }),
  shallow,
);
