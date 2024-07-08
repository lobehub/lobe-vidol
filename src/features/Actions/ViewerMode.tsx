import { Segmented } from 'antd';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';

const ViewerMode = () => {
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));
  const { t } = useTranslation('features');

  return (
    <Segmented
      onChange={(value) => {
        if (value === 'true') {
          setViewerMode(true);
        } else {
          setViewerMode(false);
        }
      }}
      options={[
        { label: t('mode.chat'), value: 'false' },
        { label: t('mode.video'), value: 'true' },
      ]}
      value={viewerMode ? 'true' : 'false'}
    />
  );
};

export default ViewerMode;
