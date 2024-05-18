import { ActionIcon } from '@lobehub/ui';
import { AlignLeft, ChevronsLeft } from 'lucide-react';
import React from 'react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [showSessionList, toggleSessionList] = useGlobalStore((s) => [
    s.showSessionList,
    s.toggleSessionList,
  ]);

  return (
    <ActionIcon
      icon={showSessionList ? ChevronsLeft : AlignLeft}
      onClick={() => toggleSessionList()}
      title={'会话列表'}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};
