import { ActionIcon } from '@lobehub/ui';
import { Video, VideoOff } from 'lucide-react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

export default () => {
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));

  return (
    <ActionIcon
      icon={viewerMode ? VideoOff : Video}
      size={DESKTOP_HEADER_ICON_SIZE}
      title={'切换视频模式'}
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
