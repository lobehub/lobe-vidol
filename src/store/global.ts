import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface GlobalStore {
  setChatDialog: (show: boolean) => void;
  setChatSidebar: (show: boolean) => void;
  setRoleList: (show: boolean) => void;
  setSessionList: (show: boolean) => void;
  showChatDialog: boolean;
  showChatSidebar: boolean;
  showRoleList: boolean;
  showSessionList: boolean;
  toggleChatDialog: () => void;
  toggleChatSideBar: () => void;
  toggleRoleList: () => void;
  toggleSessionList: () => void;
}

const initialState = {
  showChatSidebar: true,
  showSessionList: true,
  showChatDialog: true,
  showRoleList: true,
};

export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  (set) => ({
    ...initialState,
    setChatSidebar: (show) => {
      set({ showChatSidebar: show });
    },
    setRoleList: (show) => {
      set({ showRoleList: show });
    },
    toggleRoleList: () => {
      set((state) => ({ showRoleList: !state.showRoleList }));
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
