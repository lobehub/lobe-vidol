import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Progress } from 'antd';
import classNames from 'classnames';
import React, { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import PageLoading from '@/components/PageLoading';
import { GREETING_MOTION_ID } from '@/constants/touch';
import { useLoadModel } from '@/hooks/useLoadModel';
import { speakCharacter } from '@/libs/messages/speakCharacter';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { TouchAreaEnum } from '@/types/touch';

import ToolBar from './ToolBar';
import { useStyles } from './style';

interface Props {
  /**
   * agent id
   */
  agentId: string;
  className?: string;
  height?: number | string;
  /**
   * 是否可交互
   */
  interactive?: boolean;
  style?: React.CSSProperties;
  width?: number | string;
}

function AgentViewer(props: Props) {
  const { className, style, height, agentId, width, interactive = true } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useGlobalStore((s) => s.viewer);
  const { t } = useTranslation('chat');

  const { downloading, percent, fetchModelUrl } = useLoadModel();

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        const agent = useAgentStore.getState().getAgentById(agentId);
        const touch = agentSelectors.currentAgentTouch(useAgentStore.getState());

        viewer.setup(canvas, (area: TouchAreaEnum) => {
          if (!interactive) {
            return;
          }

          if (area && touch?.[area]) {
            // 随机挑选一个
            const touchAction =
              touch?.[area][Math.floor(Math.random() * (touch?.[area].length || 1))];
            if (touchAction) {
              speakCharacter(
                {
                  expression: touchAction.expression,
                  tts: {
                    ...agent?.tts,
                    message: touchAction.text,
                  },
                  motion: touchAction.motion,
                },
                viewer,
                () => {},
                () => {
                  viewer.model?.loadIdleAnimation();
                },
              );
            }
          }
        });

        // 这里根据 agentId 获取 agent 配置.
        fetchModelUrl(agent!.agentId, agent!.meta.model!).then(async (modelUrl) => {
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

            if (interactive) {
              // load motion
              speakCharacter(
                {
                  expression: VRMExpressionPresetName.Neutral,
                  tts: {
                    ...agent?.tts,
                    message: agent?.greeting,
                  },
                  motion: GREETING_MOTION_ID,
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
            } else {
              loadingScreen.classList.add('fade-out');
              loadingScreen.addEventListener('transitionend', (event) => {
                (event.target as HTMLDivElement)!.remove();
              });
            }
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
    [viewer, agentId],
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
