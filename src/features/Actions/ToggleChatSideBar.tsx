import { ActionIcon } from '@lobehub/ui';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [showChatSidebar, toggleChatSideBar] = useGlobalStore((s) => [
    s.showChatSidebar,
    s.toggleChatSideBar,
  ]);
  const { t } = useTranslation('common');
  return (
    <ActionIcon
      icon={showChatSidebar ? PanelRightClose : PanelRightOpen}
      onClick={() => toggleChatSideBar()}
      title={t('sideBar')}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};
