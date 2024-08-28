import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Progress } from 'antd';
import classNames from 'classnames';
import React, { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import PageLoading from '@/components/PageLoading';
import { DEFAULT_MOTION_ANIMATION, GREETING_MOTION_ID } from '@/constants/touch';
import { useLoadModel } from '@/hooks/useLoadModel';
import { speakCharacter } from '@/libs/messages/speakCharacter';
import { useGlobalStore } from '@/store/global';
import { Agent } from '@/types/agent';
import { fetchWithProgress } from '@/utils/fetch';

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
  const { t } = useTranslation('chat');

  const { downloading, percent, fetchModelUrl } = useLoadModel();

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        fetchModelUrl(agent.agentId, agent.meta.model!).then(async (modelUrl) => {
          if (modelUrl) {
            // add loading dom
            const agentViewer = document.querySelector('#agent-viewer')!;
            const loadingScreen = document.createElement('div');
            loadingScreen.setAttribute('id', 'loading-screen');
            const loader = document.createElement('div');
            loader.setAttribute('id', 'loader');
            loadingScreen.append(loader);
            agentViewer.append(loadingScreen);

            // load vrm
            await viewer.loadVrm(modelUrl);

            // load motion
            let motionUrl = undefined;
            const item = DEFAULT_MOTION_ANIMATION.find((item) => item.id === GREETING_MOTION_ID);
            if (item) {
              const blob = await fetchWithProgress(item.url);
              motionUrl = window.URL.createObjectURL(blob);
            }

            speakCharacter(
              {
                emotion: VRMExpressionPresetName.Neutral,
                tts: {
                  ...agent.tts,
                  message: agent.greeting,
                },
                motion: motionUrl,
              },
              viewer,
              () => {
                // remove loading dom
                loadingScreen.classList.add('fade-out');
                loadingScreen.addEventListener('transitionend', (event) => {
                  (event.target as HTMLDivElement)!.remove();
                });
              },
              () => {
                viewer.model?.loadIdleAnimation();
              },
            );
          }
        });

        // Drag and DropでVRMを差し替え
        canvas.addEventListener('dragover', function (event) {
          event.preventDefault();
        });

        canvas.addEventListener('drop', function (event) {
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
          switch (file_type) {
            case 'vrm': {
              const blob = new Blob([file], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL(blob);
              viewer.loadVrm(url);

              break;
            }
            case 'fbx': {
              const blob = new Blob([file], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL(blob);
              viewer.model?.loadFBX(url);

              break;
            }
            case 'vmd': {
              const blob = new Blob([file], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL(blob);
              viewer.model?.loadVMD(url);
              break;
            }
            // No default
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
      id="agent-viewer"
      style={{ height, width, ...style }}
    >
      <ToolBar className={styles.toolbar} viewer={viewer} />
      {downloading ? (
        <PageLoading
          title={t('toolBar.downloading')}
          description={<Progress percent={percent} size="small" steps={50} />}
          className={styles.loading}
        />
      ) : null}
      <canvas ref={canvasRef} className={styles.canvas} id={'canvas'}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
