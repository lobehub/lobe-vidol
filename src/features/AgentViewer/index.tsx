import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useRef } from 'react';

import PageLoading from '@/components/PageLoading';
import { useLoadVrm } from '@/hooks/useLoadVrm';
import { useGlobalStore } from '@/store/global';

import ToolBar from './ToolBar';
import { useStyles } from './style';

interface Props {
  agentId: string;
  className?: string;
  height?: number | string;
  style?: React.CSSProperties;
  width?: number | string;
}

function AgentViewer(props: Props) {
  const { className, style, height, agentId, width } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useGlobalStore((s) => s.viewer);

  const { loading, loadVrm } = useLoadVrm(viewer);

  useEffect(() => {
    loadVrm(agentId);
  }, [agentId]);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
      }
    },
    [viewer],
  );

  return (
    <div
      ref={ref}
      className={classNames(styles.viewer, className)}
      style={{ height, width, ...style }}
    >
      <ToolBar className={styles.toolbar} viewer={viewer} />
      {loading ? <PageLoading title={'模型加载中，请稍后...'} className={styles.loading} /> : null}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
