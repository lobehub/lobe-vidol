import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useRef } from 'react';

import PageLoading from '@/components/PageLoading';
import { useLoadVrm } from '@/hooks/useLoadVrm';
import { useViewerStore } from '@/store/viewer';

import ToolBar from './ToolBar';
import { useStyles } from './style';

interface Props {
  className?: string;
  height?: number | string;
  modelUrl?: string;
  style?: React.CSSProperties;
  width?: number | string;
}

function AgentViewer(props: Props) {
  const { className, style, height, modelUrl, width } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useViewerStore((s) => s.viewer);

  const { loading, loadVrm } = useLoadVrm(viewer);

  useEffect(() => {
    loadVrm(modelUrl);
  }, [modelUrl]);

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
