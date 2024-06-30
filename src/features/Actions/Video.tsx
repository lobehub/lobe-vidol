import { ActionIcon } from '@lobehub/ui';
import { Video, VideoOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

export default () => {
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));
  const { t } = useTranslation('features');
  return (
    <ActionIcon
      icon={viewerMode ? VideoOff : Video}
      size={DESKTOP_HEADER_ICON_SIZE}
      title={t('actions.useVideo')}
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
