import { ActionIcon } from '@lobehub/ui';
import { Video, VideoOff } from 'lucide-react';

import { useSessionStore } from '@/store/session';

export default () => {
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));

  return viewerMode ? (
    <ActionIcon
      icon={VideoOff}
      onClick={() => {
        setViewerMode(false);
      }}
      title={'关闭视频通话'}
    />
  ) : (
    <ActionIcon
      icon={Video}
      onClick={() => {
        setViewerMode(true);
      }}
      title={'视频通话'}
    />
  );
};
