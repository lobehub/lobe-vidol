'use client';

import { Icon } from '@lobehub/ui';
import { FloatButton } from 'antd';
import { LucideBugPlay } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

// import { migrateOpenAIKey } from '@/layout/StoreHydration';
import { AGENT_STORAGE_KEY } from '@/store/agent';
import { DANCE_STORAGE_KEY } from '@/store/dance';
import { SESSION_STORAGE_KEY } from '@/store/session';
import { SETTING_STORAGE_KEY } from '@/store/setting';
import { vidolStorage } from '@/utils/storage';

import { agents, dances, sessions, settings } from './data';

const DebugUI = memo(() => {
  const { t } = useTranslation('common');
  return (
    <FloatButton.Group>
      <FloatButton
        icon={<Icon icon={LucideBugPlay} />}
        onClick={async () => {
          vidolStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(agents));
          vidolStorage.setItem(DANCE_STORAGE_KEY, JSON.stringify(dances));
          vidolStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
          vidolStorage.setItem(SETTING_STORAGE_KEY, JSON.stringify(settings));
        }}
        tooltip={t('setLocalStorage')}
      />

      {/* <FloatButton
        icon={<Icon icon={LucideBugPlay} />}
        onClick={async () => {
          await migrateOpenAIKey();
        }}
        tooltip={'迁移'}
      /> */}
    </FloatButton.Group>
  );
});

export default DebugUI;
