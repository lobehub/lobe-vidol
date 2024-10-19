import { ActionIcon } from '@lobehub/ui';
import { ChevronsLeft, Sidebar } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [showSessionList, toggleSessionList] = useGlobalStore((s) => [
    s.showSessionList,
    s.toggleSessionList,
  ]);
  const { t } = useTranslation('chat');
  return (
    <ActionIcon
      icon={showSessionList ? ChevronsLeft : Sidebar}
      onClick={() => toggleSessionList()}
      title={t('sessionList')}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};
