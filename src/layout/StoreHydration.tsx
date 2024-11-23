'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { ModelProvider } from '@/libs/agent-runtime/types';
import { AGENT_STORAGE_KEY, useAgentStore } from '@/store/agent';
import { DANCE_STORAGE_KEY } from '@/store/dance';
import { SESSION_STORAGE_KEY } from '@/store/session';
import { SETTING_STORAGE_KEY, useSettingStore } from '@/store/setting';
import { vidolStorage } from '@/utils/storage';

const MIGRATION_KEY = 'MIGRATE_TO_INDEXED_DB';

const migrateLocalStorageToIndexedDB = async (storageKey: string) => {
  const localStorageData = localStorage.getItem(storageKey);
  if (localStorageData) {
    await vidolStorage.setItem(storageKey, localStorageData);
    localStorage.removeItem(storageKey);
  }
};

const migrateOpenAIKey = async () => {
  // 将原来的 OpenAI Key 迁移到 KeyValuts
  // @ts-ignore
  const openAI = useSettingStore.getState().config.languageModel.OpenAI;
  if (openAI) {
    useSettingStore.getState().setConfig({
      keyVaults: {
        [ModelProvider.OpenAI]: {
          apiKey: openAI.apikey,
          baseURL: openAI.endpoint,
        },
      },
    });
    // 删除原来的 OpenAI 配置
    useSettingStore.getState().setConfig({
      languageModel: {
        // @ts-ignore
        OpenAI: undefined,
      },
    });
  }
};

const migrate = async () => {
  await migrateOpenAIKey();

  // localstorage 迁移到 indexeddb 后，删除迁移标识
  if (localStorage.getItem(MIGRATION_KEY)) return;
  await migrateLocalStorageToIndexedDB(AGENT_STORAGE_KEY);
  await migrateLocalStorageToIndexedDB(SESSION_STORAGE_KEY);
  await migrateLocalStorageToIndexedDB(SETTING_STORAGE_KEY);
  await migrateLocalStorageToIndexedDB(DANCE_STORAGE_KEY);
  localStorage.setItem(MIGRATION_KEY, 'true');
};

const StoreHydration = () => {
  const router = useRouter();

  const refreshDefaultModelProviderList = useSettingStore((s) => s.refreshDefaultModelProviderList);

  useEffect(() => {
    // refs: https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#hashydrated
    migrate().then(() => {
      useAgentStore.persist.rehydrate();
    });
  }, []);

  useEffect(() => {
    router.prefetch('/chat');
    router.prefetch('/settings');
    router.prefetch('/role');
    router.prefetch('/market');
  }, [router]);

  // 刷新默认模型提供者列表
  refreshDefaultModelProviderList();

  return null;
};

export default memo(StoreHydration);
