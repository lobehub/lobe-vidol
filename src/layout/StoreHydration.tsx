'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { AGENT_STORAGE_KEY, useAgentStore } from '@/store/agent';
import { DANCE_STORAGE_KEY, useDanceStore } from '@/store/dance';
import { SESSION_STORAGE_KEY, useSessionStore } from '@/store/session';
import { SETTING_STORAGE_KEY, useSettingStore } from '@/store/setting';
import storage from '@/utils/storage';

const migrateLocalStorageToIndexedDB = async (storageKey: string) => {
  const localStorageData = localStorage.getItem(storageKey);
  if (localStorageData) {
    await storage.setItem(storageKey, localStorageData);
    localStorage.removeItem(storageKey);
  }
};
const StoreHydration = () => {
  const router = useRouter();

  useEffect(() => {
    // refs: https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#hashydrated

    migrateLocalStorageToIndexedDB(AGENT_STORAGE_KEY).then(() => {
      useAgentStore.persist.rehydrate();
    });

    migrateLocalStorageToIndexedDB(SESSION_STORAGE_KEY).then(() => {
      useSessionStore.persist.rehydrate();
    });

    migrateLocalStorageToIndexedDB(SETTING_STORAGE_KEY).then(() => {
      useSettingStore.persist.rehydrate();
    });

    migrateLocalStorageToIndexedDB(DANCE_STORAGE_KEY).then(() => {
      useDanceStore.persist.rehydrate();
    });
  }, []);

  useEffect(() => {
    router.prefetch('/chat');
    router.prefetch('/settings');
    router.prefetch('/role');
    router.prefetch('/market');
  }, [router]);

  return null;
};

export default memo(StoreHydration);
