'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { useSessionStore } from '@/store/session';
import { useSettingStore } from '@/store/setting';

const StoreHydration = () => {
  const router = useRouter();

  useEffect(() => {
    // refs: https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#hashydrated
    useSessionStore.persist.rehydrate();
    useSettingStore.persist.rehydrate();
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
