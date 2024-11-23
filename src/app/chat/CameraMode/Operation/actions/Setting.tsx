import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Box } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_OPERATION_ICON_SIZE } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [toggleChatSideBar] = useGlobalStore((s) => [s.toggleChatSideBar]);
  const theme = useTheme();
  const { t } = useTranslation('common');
  return (
    <ActionIcon
      icon={Box}
      onClick={() => toggleChatSideBar()}
      title={t('sideBar')}
      size={DESKTOP_OPERATION_ICON_SIZE}
      style={{
        backgroundColor: theme.colorBgElevated,
      }}
    />
  );
};
