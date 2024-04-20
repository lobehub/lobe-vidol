'use client';

import AgentViewer from '@/features/AgentViewer';
import ImageViewer from '@/features/ImageViewer';
import { useSessionStore } from '@/store/session';

import Dialog from './Dialog';
import Docker from './Docker';
import { useStyles } from './style';

const VirtualIdol = () => {
  const { styles } = useStyles();
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);

  return (
    <div className={styles.container}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {viewerMode === true ? <AgentViewer /> : <ImageViewer />}
      </div>
      <Dialog />
      <Docker />
    </div>
  );
};

export default VirtualIdol;
