'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { AGENT_STORAGE_KEY } from '@/store/agent';
import { DANCE_STORAGE_KEY } from '@/store/dance';
import { SESSION_STORAGE_KEY } from '@/store/session';
import { SETTING_STORAGE_KEY } from '@/store/setting';
import storage from '@/utils/storage';

const MIGRATION_KEY = 'MIGRATE_TO_INDEXED_DB';

const migrateLocalStorageToIndexedDB = async (storageKey: string) => {
  const localStorageData = localStorage.getItem(storageKey);
  if (localStorageData) {
    await storage.setItem(storageKey, localStorageData);
    localStorage.removeItem(storageKey);
  }
};

const migrate = async () => {
  if (localStorage.getItem(MIGRATION_KEY)) return;
  await migrateLocalStorageToIndexedDB(AGENT_STORAGE_KEY);
  await migrateLocalStorageToIndexedDB(SESSION_STORAGE_KEY);
  await migrateLocalStorageToIndexedDB(SETTING_STORAGE_KEY);
  await migrateLocalStorageToIndexedDB(DANCE_STORAGE_KEY);
  localStorage.setItem(MIGRATION_KEY, 'true');
};
const StoreHydration = () => {
  const router = useRouter();

  useEffect(() => {
    // refs: https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#hashydrated
    migrate();
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
