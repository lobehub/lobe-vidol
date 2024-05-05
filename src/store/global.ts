import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface GlobalStore {
  setChatSidebar: (show: boolean) => void;
  setSessionList: (show: boolean) => void;
  showChatSidebar: boolean;
  showSessionList: boolean;
  toggleChatSideBar: () => void;
  toggleSessionList: () => void;
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
    showSessionList: true,
    setSessionList: (show) => {
      set({ showSessionList: show });
    },
    toggleSessionList: () => {
      set((state) => ({ showSessionList: !state.showSessionList }));
    },
  }),
  shallow,
);
