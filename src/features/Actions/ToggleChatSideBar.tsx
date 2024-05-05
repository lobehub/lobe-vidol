import { ActionIcon } from '@lobehub/ui';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import React from 'react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/common';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [showChatSidebar, toggleChatSideBar] = useGlobalStore((s) => [
    s.showChatSidebar,
    s.toggleChatSideBar,
  ]);

  return (
    <ActionIcon
      icon={showChatSidebar ? PanelRightClose : PanelRightOpen}
      onClick={() => toggleChatSideBar()}
      title={'侧边栏'}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};
