import type { ThemeMode } from 'antd-style';
import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { INITIAL_COORDINATES } from '@/constants/token';
import { Viewer } from '@/features/vrmViewer/viewer';
import { Panel, PanelConfig, PanelKey } from '@/types/config';

export * from './selectors/panel';
const viewer = new Viewer();

export interface GlobalStore {
  /**
   * Close panel
   * @param key
   */
  closePanel: (key: PanelKey) => void;
  focusList: PanelKey[];
  /**
   * Focus panel
   * @param key
   */
  focusPanel: (key: PanelKey) => void;
  /**
   * Open panel
   * @param key
   */
  openPanel: (key: PanelKey) => void;
  panel: PanelConfig;
  setChatDialog: (show: boolean) => void;
  setChatSidebar: (show: boolean) => void;
  /**
   * Set panel config
   * @param panel
   * @param config
   */
  setPanel: (panel: PanelKey, config: Partial<Panel>) => void;
  setRoleList: (show: boolean) => void;
  setSessionList: (show: boolean) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  showChatDialog: boolean;
  showChatSidebar: boolean;
  showRoleList: boolean;

  showSessionList: boolean;
  /**
   * 主题模式
   */
  themeMode: ThemeMode;
  toggleChatDialog: () => void;
  toggleChatSideBar: () => void;
  toggleRoleList: () => void;
  toggleSessionList: () => void;
  viewer: Viewer;
}

const initialState = {
  viewer,
  /**
   * 主题模式
   */
  themeMode: 'auto' as ThemeMode,
  showChatSidebar: true,
  showSessionList: true,
  showChatDialog: true,
  showRoleList: true,
  focusList: [],
  panel: {
    agent: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    dance: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    role: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    market: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    pluginStore: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
  },
};

export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  (set, get) => ({
    ...initialState,

    closePanel: (key: PanelKey) => {
      const { setPanel, focusList } = get();
      setPanel(key, { open: false });
      const nextSetting = focusList.filter((item) => item !== key);
      set({ focusList: nextSetting });
    },

    setThemeMode: (themeMode) => {
      set({ themeMode });
    },

    focusPanel: (key: PanelKey) => {
      const { focusList } = get();
      const nextSetting: PanelKey[] = focusList.filter((item) => item !== key).concat(key);
      set({ focusList: nextSetting });
    },

    openPanel: (key: PanelKey) => {
      const { setPanel, focusPanel } = get();
      setPanel(key, { open: true });
      focusPanel(key);
    },
    setPanel: (panel, config) => {
      const prevSetting = get().panel[panel];
      const nextSetting = produce(prevSetting, (draftState) => {
        merge(draftState, config);
      });

      if (isEqual(prevSetting, nextSetting)) return;
      set((state) => ({
        panel: {
          ...state.panel,
          [panel]: nextSetting,
        },
      }));
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
