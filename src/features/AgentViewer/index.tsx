import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import classNames from 'classnames';
import React, { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenLoading from '@/components/ScreenLoading';
import { useLoadModel } from '@/hooks/useLoadModel';
import { MotionPresetName } from '@/libs/emoteController/motionPresetMap';
import { MotionFileType } from '@/libs/emoteController/type';
import { speakCharacter } from '@/libs/messages/speakCharacter';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { TouchAreaEnum } from '@/types/touch';
import { preloadVoice } from '@/utils/voice';

import ToolBar from './ToolBar';
import { useStyles } from './style';

// 假设我们有这个工具函数

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
  const playingRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useGlobalStore((s) => s.viewer);
  const { t } = useTranslation('chat');

  const { fetchModelUrl } = useLoadModel();
  const [loading, setLoading] = useState(false);
  const agent = useAgentStore((s) => s.getAgentById(agentId));
  const getAgentTouchActionsByIdAndArea = useAgentStore((s) =>
    agentSelectors.getAgentTouchActionsByIdAndArea(s),
  );

  const handleTouchArea = (area: TouchAreaEnum) => {
    if (!interactive) {
      return;
    }
    const currentTouch = getAgentTouchActionsByIdAndArea(agentId, area);

    if (currentTouch) {
      // 随机挑选一个
      const touchAction = currentTouch[Math.floor(Math.random() * (currentTouch.length || 1))];
      if (touchAction && !playingRef.current) {
        playingRef.current = true;
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
            playingRef.current = false;
          },
        );
      }
    }
  };

  const preloadAgentResources = async () => {
    setLoading(true);
    try {
      // 加载模型
      const modelUrl = await fetchModelUrl(agent!.agentId, agent!.meta.model!);
      if (!modelUrl) return;
      await viewer.loadVrm(modelUrl);

      // 预加载动作，目前预加载的动作都是通用的
      if (viewer?.model) {
        await viewer.model.preloadAllMotions();
      }

      // 预加载语音，根据角色的语音配置不同，需要每次重新判断预加载
      // 这个是角色招呼语音
      if (agent?.greeting) {
        await preloadVoice({
          ...agent.tts,
          message: agent.greeting,
        });
      }
      // 这个是角色的触摸动画语音
      const touchAreas = Object.values(TouchAreaEnum);
      for (const area of touchAreas) {
        const touchActions = getAgentTouchActionsByIdAndArea(agentId, area);
        if (touchActions) {
          for (const action of touchActions) {
            await preloadVoice({
              ...agent!.tts,
              message: action.text,
            });
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas, handleTouchArea);
        preloadAgentResources().then(() => {
          if (interactive) {
            // load motion
            speakCharacter(
              {
                expression: VRMExpressionPresetName.Happy,
                tts: {
                  ...agent?.tts,
                  message: agent?.greeting,
                },
                motion: MotionPresetName.FemaleGreeting,
              },
              viewer,
              () => {},
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
              viewer.model?.playMotionUrl(MotionFileType.FBX, url);

              break;
            }
            case 'vmd': {
              const blob = new Blob([file], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL(blob);
              viewer.model?.playMotionUrl(MotionFileType.VMD, url);

              break;
            }
            case 'vrma': {
              const blob = new Blob([file], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL(blob);
              viewer.model?.playMotionUrl(MotionFileType.VRMA, url);
              break;
            }
            // No default
          }
        });
      }
    },
    [viewer, agentId, interactive],
  );

  return (
    <div
      ref={ref}
      className={classNames(styles.viewer, className)}
      id="agent-viewer"
      style={{ height, width, ...style }}
    >
      <ToolBar className={styles.toolbar} viewer={viewer} />
      {loading ? (
        <ScreenLoading title={t('toolBar.downloading')} className={styles.loading} />
      ) : null}
      <canvas ref={canvasRef} className={styles.canvas} id={'canvas'}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
