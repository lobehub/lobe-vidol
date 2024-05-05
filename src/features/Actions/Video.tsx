import { ActionIcon } from '@lobehub/ui';
import { Video, VideoOff } from 'lucide-react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/common';
import { useSessionStore } from '@/store/session';

export default () => {
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));

  return (
    <ActionIcon
      icon={viewerMode ? VideoOff : Video}
      title={'视频通话'}
      size={DESKTOP_HEADER_ICON_SIZE}
      onClick={() => {
        if (viewerMode) {
          setViewerMode(false);
        } else {
          setViewerMode(true);
        }
      }}
    />
  );
};
