import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import React, { memo, useCallback, useRef } from 'react';

import PageLoading from '@/components/PageLoading';
import { useLoadVrm } from '@/hooks/useLoadVrm';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';

import ToolBar from '../components/ToolBar';
import { useStyles } from './style';

interface Props {
  className?: string;
  height?: number | string;
  style?: React.CSSProperties;
}

function AgentViewer(props: Props) {
  const { className, style, height } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useViewerStore((s) => s.viewer);
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s), isEqual]);

  const { loading, loadVrm } = useLoadVrm(viewer);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        loadVrm(currentAgent?.meta.model);
      }
    },
    [viewer, currentAgent?.meta.model],
  );

  return (
    <div ref={ref} className={classNames(styles.viewer, className)} style={style}>
      <ToolBar className={styles.toolbar} viewer={viewer} />
      {loading ? <PageLoading title={'模型加载中，请稍后...'} className={styles.loading} /> : null}
      <canvas ref={canvasRef} className={styles.canvas} style={{ height }}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
