import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { getPluginIndex } from '@/services/plugin';
import { Plugin } from '@/types/plugin';

import { initialState } from './initialState';

const PLUGIN_STORAGE_KEY = 'vidol-chat-plugin-storage';

export interface PluginStore {
  /**
   * 应用商店获的插件
   */
  allPlugins: Plugin[];
  /**
   * 禁用插件
   */
  disablePlugin: (identifier: string) => void;
  /**
   * 启用插件
   */
  enablePlugin: (identifier: string) => void;
  /**
   * 获取插件商店列表
   */
  fetchPluginIndex: () => Promise<void>;
  /**
   * 安装插件
   */
  installPlugin: (identifier: string) => void;
  /**
   * 已安装的插件标识
   */
  installedPluginIds: string[];
  /**
   * 卸载插件
   */
  uninstallPlugin: (identifier: string) => void;
}

const createPluginStore: StateCreator<PluginStore, [['zustand/devtools', never]]> = () => ({
  ...initialState,
  fetchPluginIndex: async () => {
    const plugins = await getPluginIndex();
    console.log('plugins', plugins);
  },
  enablePlugin: (identifier: string) => {
    console.log('identifier', identifier);
  },
  disablePlugin: (identifier: string) => {
    console.log('identifier', identifier);
  },
  installPlugin: (identifier: string) => {
    console.log('identifier', identifier);
  },
  uninstallPlugin: (identifier: string) => {
    console.log('identifier', identifier);
  },
});

export const usePluginStore = createWithEqualityFn<PluginStore>()(
  subscribeWithSelector(
    persist(
      devtools(createPluginStore, {
        name: 'VIDOL_PLUGIN_STORE',
      }),
      {
        name: PLUGIN_STORAGE_KEY,
        partialize: (state) => {
          return {
            installedPluginIds: state.installedPluginIds,
          };
        },
      },
    ),
  ),
  shallow,
);
