import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface GlobalStore {
  setChatDialog: (show: boolean) => void;
  setChatSidebar: (show: boolean) => void;
  setSessionList: (show: boolean) => void;
  showChatDialog: boolean;
  showChatSidebar: boolean;
  showSessionList: boolean;
  toggleChatDialog: () => void;
  toggleChatSideBar: () => void;
  toggleSessionList: () => void;
}

const initialState = {
  showChatSidebar: true,
  showSessionList: true,
  showChatDialog: true,
};

export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  (set) => ({
    ...initialState,
    setChatSidebar: (show) => {
      set({ showChatSidebar: show });
    },
    toggleChatSideBar: () => {
      set((state) => ({ showChatSidebar: !state.showChatSidebar }));
    },
    setSessionList: (show) => {
      set({ showSessionList: show });
    },
    toggleSessionList: () => {
      set((state) => ({ showSessionList: !state.showSessionList }));
    },

    setChatDialog: (show) => {
      set({ showChatDialog: show });
    },
    toggleChatDialog: () => {
      set((state) => ({ showChatDialog: !state.showChatDialog }));
    },
  }),
  shallow,
);
