import classNames from 'classnames';
import localforage from 'localforage';
import React, { memo, useCallback, useRef } from 'react';

import PageLoading from '@/components/PageLoading';
import { useLoadVrm } from '@/hooks/useLoadVrm';
import { agentSelectors, useAgentStore } from '@/store/agent';
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
  const [currentAgentModel, currentAgentId, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentModel(s),
    agentSelectors.currentAgentId(s),
    s.updateAgentConfig,
  ]);

  const { loading, loadVrm } = useLoadVrm(viewer);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        loadVrm(currentAgentModel);
      }

      const dragoverHandler = (event: DragEvent) => {
        event.preventDefault();
      };

      const dropHandler = (event: DragEvent) => {
        event.preventDefault();

        const files = event.dataTransfer?.files;
        if (!files) {
          return;
        }

        const file = files[0];
        if (!file) {
          return;
        }

        const file_type = file.name.split('.').pop();
        if (file_type === 'vrm') {
          const blob = new Blob([file], { type: 'application/octet-stream' });
          const modelKey = `model:${currentAgentId}`;
          localforage.setItem(modelKey, blob).then(() => {
            updateAgentConfig({ meta: { model: modelKey } });
            loadVrm(modelKey);
          });
        }
      };

      canvas.addEventListener('dragover', dragoverHandler);
      canvas.addEventListener('drop', dropHandler);
      return () => {
        canvas.removeEventListener('dragover', dragoverHandler);
        canvas.removeEventListener('drop', dropHandler);
      };
    },
    [viewer, currentAgentId, currentAgentModel],
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
