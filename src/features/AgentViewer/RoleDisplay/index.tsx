import classNames from 'classnames';
import * as localforage from 'localforage';
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
  const currentAgentId = useAgentStore((s) => agentListSelectors.currentAgentId(s));
  const updateAgentConfig = useAgentStore((s) => s.updateAgentConfig);

  const loadVrm = async (url?: string) => {
    let vrmUrl = url;
    if (url && url.startsWith('model:')) {
      const blob = await localforage.getItem(url);
      if (blob) {
        vrmUrl = window.URL.createObjectURL(blob as Blob);
      } else {
        vrmUrl = undefined;
      }
    }
    if (vrmUrl) {
      setLoading(true);
      viewer.loadVrm(vrmUrl).finally(() => {
        setLoading(false);
      });
    } else {
      viewer.unloadVRM();
    }
  };

  useEffect(() => {
    loadVrm(currentAgentModel);
  }, [currentAgentModel]);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      viewer.setup(canvas);

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
    [viewer, currentAgentId],
  );

  return (
    <div ref={ref} className={classNames(styles.viewer, className)} style={style}>
      <ToolBar className={styles.toolbar} viewerRef={ref} />
      {loading ? <PageLoading title={'模型加载中，请稍后...'} /> : null}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
}

export default memo(Index);
