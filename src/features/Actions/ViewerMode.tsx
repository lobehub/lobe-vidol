import { Segmented } from 'antd';

import { useSessionStore } from '@/store/session';

const ViewerMode = () => {
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));

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
        { label: '交互体验', value: 'true' },
        { label: '聊天模式', value: 'false' },
      ]}
      value={viewerMode ? 'true' : 'false'}
    />
  );
};

export default ViewerMode;
