'use client';

import { Icon } from '@lobehub/ui';
import { FloatButton } from 'antd';
import { LucideBugPlay } from 'lucide-react';
import { memo } from 'react';

import { AGENT_STORAGE_KEY } from '@/store/agent';
import { DANCE_STORAGE_KEY } from '@/store/dance';
import { SESSION_STORAGE_KEY } from '@/store/session';
import { SETTING_STORAGE_KEY } from '@/store/setting';

import { agents, dances, sessions, settings } from './data';

const DebugUI = memo(() => {
  return (
    <FloatButton.Group>
      <FloatButton
        icon={<Icon icon={LucideBugPlay} />}
        onClick={async () => {
          localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(agents));
          localStorage.setItem(DANCE_STORAGE_KEY, JSON.stringify(dances));
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
          localStorage.setItem(SETTING_STORAGE_KEY, JSON.stringify(settings));
        }}
        tooltip={'设置 LocalStorage'}
      />

      {/*<FloatButton*/}
      {/*  icon={<Icon icon={LucideBugPlay} />}*/}
      {/*  onClick={async () => {*/}
      {/*    await migrateLocalStorageToIndexedDB('vidol-chat-agent-storage');*/}
      {/*  }}*/}
      {/*  tooltip={'迁移'}*/}
      {/*/>*/}
    </FloatButton.Group>
  );
});

export default DebugUI;
