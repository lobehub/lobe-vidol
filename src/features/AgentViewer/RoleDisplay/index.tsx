import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import PageLoading from '@/components/PageLoading';
import ToolBar from '@/features/AgentViewer/ToolBar';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useViewerStore } from '@/store/viewer';

import { useStyles } from './style';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

function Index(props: Props) {
  const viewer = useViewerStore((s) => s.viewer);
  const { className, style } = props;
  const { styles } = useStyles();
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentAgentModel = useAgentStore((s) => agentListSelectors.currentAgentModel(s));

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

  return currentAgentModel ? (
    <div ref={ref} className={classNames(styles.viewer, className)} style={style}>
      <ToolBar className={styles.toolbar} viewerRef={ref} />
      {loading ? <PageLoading title={'模型加载中，请稍后...'} /> : null}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  ) : null;
  //   TODO: 添加自定义上传模型
}

export default memo(Index);
