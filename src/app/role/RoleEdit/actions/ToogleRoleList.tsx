import { ActionIcon } from '@lobehub/ui';
import { ChevronsLeft, List } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [showRoleList, toggleRoleList] = useGlobalStore((s) => [s.showRoleList, s.toggleRoleList]);
  const { t } = useTranslation('chat');
  return (
    <ActionIcon
      icon={showRoleList ? ChevronsLeft : List}
      onClick={() => toggleRoleList()}
      title={t('roleList')}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};
