import type { ThemeMode } from 'antd-style';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { TRANSPARENT_ID } from '@/constants/background';
import { Viewer } from '@/libs/vrmViewer/viewer';

const viewer = new Viewer();

export interface GlobalStore {
  backgroundId: string;
  isPlaying: boolean;
  setBackgroundId: (id: string) => void;
  setChatDialog: (show: boolean) => void;
  setChatSidebar: (show: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setRoleList: (show: boolean) => void;
  setSessionList: (show: boolean) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  showChatDialog: boolean;
  showChatSidebar: boolean;
  showRoleList: boolean;
  showSessionList: boolean;
  themeMode: ThemeMode;
  toggleChatDialog: () => void;
  toggleChatSideBar: () => void;
  toggleRoleList: () => void;
  toggleSessionList: () => void;
  viewer: Viewer;
}

const initialState = {
  viewer,
  themeMode: 'auto' as ThemeMode,
  isPlaying: false,
  showChatSidebar: false,
  showSessionList: true,
  showChatDialog: true,
  showRoleList: true,
  backgroundId: TRANSPARENT_ID,
};
export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  (set) => ({
    ...initialState,
    setIsPlaying: (isPlaying: boolean) => {
      set({ isPlaying: isPlaying });
    },
    setBackgroundId: (id: string) => {
      set({ backgroundId: id });
    },
    setThemeMode: (themeMode) => {
      set({ themeMode });
    },
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
