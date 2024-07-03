'use client';

import { Icon } from '@lobehub/ui';
import { FloatButton } from 'antd';
import { LucideBugPlay } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const DebugUI = memo(() => {
  const { t } = useTranslation('error');
  return (
    <FloatButton
      icon={<Icon icon={LucideBugPlay} />}
      onClick={async () => {
        throw new Error(t('triggerError'));
      }}
      tooltip={t('triggerError')}
    />
  );
});

export default DebugUI;
