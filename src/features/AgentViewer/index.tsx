import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import PageLoading from '@/components/PageLoading';
import ToolBar from '@/features/AgentViewer/ToolBar';
import ChatDialog from '@/features/ChatDialog';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';

import { useStyles } from './style';

function AgentViewer() {
  const viewer = useViewerStore((s) => s.viewer);
  const { styles } = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const currentAgentModel = useSessionStore((s) => sessionSelectors.currentAgentModel(s));

  useEffect(() => {
    if (currentAgentModel) {
      setLoading(true);
      viewer.loadVrm(currentAgentModel).finally(() => {
        setLoading(false);
      });
    }
  }, [currentAgentModel, viewer]);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
      }
    },
    [viewer],
  );

  return (
    <div ref={ref} className={styles.viewer}>
      {open ? <ChatDialog className={styles.dialog} setOpen={setOpen} /> : null}
      <ToolBar className={styles.toolbar} setOpen={setOpen} viewerRef={ref} />
      {loading ? <PageLoading title={'模型加载中，请稍后...'} /> : null}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
