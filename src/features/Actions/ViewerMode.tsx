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
        { label: '文本', value: 'false' },
        { label: '3D', value: 'true' },
      ]}
      value={viewerMode ? 'true' : 'false'}
    />
  );
};

export default ViewerMode;
