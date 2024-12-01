import { ActionIconGroup } from '@lobehub/ui';
import dayjs from 'dayjs';
import {
  Aperture,
  Axis3D,
  Fullscreen,
  Grid3x3,
  Orbit,
  Pointer,
  PointerOff,
  RotateCcw,
  SwitchCamera,
} from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Viewer } from '@/libs/vrmViewer/viewer';
import { useSessionStore } from '@/store/session';

interface ToolBarProps {
  className?: string;
  onFullscreen: () => void;
  style?: React.CSSProperties;
  viewer: Viewer;
}

const ToolBar = (props: ToolBarProps) => {
  const { style, className, viewer, onFullscreen } = props;
  const { t } = useTranslation('chat');

  const [interactive, toggleInteractive] = useSessionStore((s) => [
    s.interactive,
    s.toggleInteractive,
  ]);

  const dropdownMenu = [
    {
      icon: Axis3D,
      key: 'axes',
      label: t('toolBar.axes'),
    },
    {
      icon: SwitchCamera,
      key: 'resetCamera',
      label: t('toolBar.resetCamera'),
    },
    {
      icon: SwitchCamera,
      key: 'cameraHelper',
      label: t('toolBar.cameraHelper'),
    },
    {
      icon: Orbit,
      key: 'cameraControl',
      label: t('toolBar.cameraControl'),
    },
  ];

  return (
    <ActionIconGroup
      className={className}
      direction="column"
      dropdownMenu={dropdownMenu}
      items={[
        {
          icon: RotateCcw,
          key: 'reset',
          label: t('toolBar.resetToIdle'),
        },
        {
          icon: Fullscreen,
          key: 'fullscreen',
          label: t('toolBar.fullScreen'),
        },

        {
          icon: interactive ? PointerOff : Pointer,
          key: 'interactive',
          label: interactive ? t('toolBar.interactiveOff') : t('toolBar.interactiveOn'),
        },
        {
          icon: Aperture,
          key: 'screenShot',
          label: t('toolBar.screenShot'),
        },
        {
          icon: Grid3x3,
          key: 'grid',
          label: t('toolBar.grid'),
        },
      ]}
      onActionClick={(action) => {
        switch (action.key) {
          case 'resetCamera': {
            viewer.resetCamera();

            break;
          }
          case 'reset': {
            viewer.resetToIdle();
            break;
          }
          case 'screenShot': {
            const canvas = document.querySelector('#vrm-canvas') as HTMLCanvasElement;
            const imageType = 'png';
            const dataUrl = canvas.toDataURL(`image/${imageType}`);
            const link = document.createElement('a');
            link.download = `LobeVidol_capture_${dayjs().format('YYYY-MM-DD HH:mm:ss')}.${imageType}`;
            link.href = dataUrl;
            link.click();
            break;
          }

          case 'grid': {
            viewer.toggleGrid();

            break;
          }

          case 'interactive': {
            toggleInteractive();
            break;
          }

          case 'fullscreen': {
            onFullscreen();
            break;
          }

          case 'axes': {
            viewer.toggleAxes();
            break;
          }
          case 'cameraHelper': {
            viewer.toggleCameraHelper();

            break;
          }
          case 'cameraControl': {
            viewer.toggleCameraControls();

            break;
          }
        }
      }}
      style={style}
      type={'block'}
      size={'normal'}
    />
  );
};

export default ToolBar;
