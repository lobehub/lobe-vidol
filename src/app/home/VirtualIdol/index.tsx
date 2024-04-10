'use client';

import AgentViewer from '@/features/AgentViewer';
import ImageViewer from '@/features/ImageViewer';
import { useSessionStore } from '@/store/session';
import { useStyles } from './style';

const VirtualIdol = () => {
  const { styles } = useStyles();
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);

  return (
    <div className={styles.content}>{viewerMode === true ? <AgentViewer /> : <ImageViewer />}</div>
  );
};

export default VirtualIdol;
