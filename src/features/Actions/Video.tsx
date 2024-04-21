import { ActionIcon } from '@lobehub/ui';
import { Video, VideoOff } from 'lucide-react';

import { useSessionStore } from '@/store/session';

export default () => {
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));

  return (
    <ActionIcon
      icon={viewerMode ? VideoOff : Video}
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
