import { Progress } from 'antd';
import classNames from 'classnames';
import React, { memo, useCallback, useRef } from 'react';

import PageLoading from '@/components/PageLoading';
import { useLoadModel } from '@/hooks/useLoadModel';
import { useGlobalStore } from '@/store/global';
import { Agent } from '@/types/agent';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

import ToolBar from './ToolBar';
import { useStyles } from './style';

interface Props {
  agent: Agent;
  className?: string;
  height?: number | string;
  style?: React.CSSProperties;
  width?: number | string;
}

function AgentViewer(props: Props) {
  const { className, style, height, agent, width } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useGlobalStore((s) => s.viewer);

  const { downloading, percent, fetchModelBlob } = useLoadModel();

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        const modelPath = getModelPathByAgentId(agent.agentId);
        storage.getItem(modelPath).then((blob) => {
          if (!blob) {
            fetchModelBlob(agent.agentId, agent.meta.model!).then((res) => {
              const modelUrl = URL.createObjectURL(res);
              viewer.loadVrm(modelUrl);
            });
          } else {
            const modelUrl = URL.createObjectURL(blob as Blob);
            viewer.loadVrm(modelUrl);
          }
        });
      }
    },
    [viewer, agent.agentId],
  );

  return (
    <div
      ref={ref}
      className={classNames(styles.viewer, className)}
      style={{ height, width, ...style }}
    >
      <ToolBar className={styles.toolbar} viewer={viewer} />
      {downloading ? (
        <PageLoading
          title="模型下载中，请稍后..."
          description={<Progress percent={percent} size="small" steps={50} />}
          className={styles.loading}
        />
      ) : null}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
