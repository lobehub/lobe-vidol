import type { ThemeMode } from 'antd-style';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Viewer } from '@/libs/vrmViewer/viewer';
import { ChatMode } from '@/types/session';

const viewer = new Viewer();

export enum SettingsTabs {
  Common = 'common',
  LLM = 'llm',
  TTS = 'tts',
  Touch = 'touch',
}

export interface GlobalStore {
  backgroundUrl: string | undefined;
  chatMode: ChatMode;
  hidePWAInstaller: boolean;
  isPlaying: boolean;
  setBackgroundUrl: (url: string | undefined) => void;
  setChatDialog: (show: boolean) => void;
  setChatMode: (mode: ChatMode) => void;
  setChatSidebar: (show: boolean) => void;
  setHidePWAInstaller: (hide: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setRoleList: (show: boolean) => void;
  setSessionList: (show: boolean) => void;
  setShowAgentInfo: (show: boolean) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setVoiceOn: (voiceOn: boolean) => void;
  showAgentInfo: boolean;
  showChatDialog: boolean;
  showChatSidebar: boolean;
  showRoleList: boolean;
  showSessionList: boolean;
  themeMode: ThemeMode;
  toggleAgentInfo: () => void;
  toggleChatDialog: () => void;
  toggleChatSideBar: () => void;
  toggleRoleList: () => void;
  toggleSessionList: () => void;

  viewer: Viewer;
  voiceOn: boolean;
}

const initialState = {
  viewer,
  themeMode: 'auto' as ThemeMode,
  chatMode: 'chat' as ChatMode,
  voiceOn: false,
  isPlaying: false,
  showChatSidebar: false,
  showAgentInfo: true,
  showSessionList: true,
  showChatDialog: true,
  hidePWAInstaller: false,
  showRoleList: true,
  backgroundUrl: undefined,
};
export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  (set) => ({
    ...initialState,
    setIsPlaying: (isPlaying: boolean) => {
      set({ isPlaying: isPlaying });
    },
    setHidePWAInstaller: (hide: boolean) => {
      set({ hidePWAInstaller: hide });
    },
    setBackgroundUrl: (url: string | undefined) => {
      set({ backgroundUrl: url });
    },
    setThemeMode: (themeMode) => {
      set({ themeMode });
    },
    setChatSidebar: (show) => {
      set({ showChatSidebar: show });
    },
    setShowAgentInfo: (show) => {
      set({ showAgentInfo: show });
    },
    setChatMode: (mode) => {
      set({ chatMode: mode });
    },
    setRoleList: (show) => {
      set({ showRoleList: show });
    },
    toggleAgentInfo: () => {
      set((state) => ({ showAgentInfo: !state.showAgentInfo }));
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
    setVoiceOn: (voiceOn) => {
      set({ voiceOn });
    },
  }),
  shallow,
);
