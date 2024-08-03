import { ActionIconGroup } from '@lobehub/ui';
import dayjs from 'dayjs';
import { Aperture, Axis3D, Grid3x3, Orbit, Power, SwitchCamera } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Viewer } from '@/features/vrmViewer/viewer';

interface ToolBarProps {
  className?: string;
  style?: React.CSSProperties;
  viewer: Viewer;
}

const ToolBar = (props: ToolBarProps) => {
  const { style, className, viewer } = props;
  const { t } = useTranslation('features');

  const dropdownMenu = [
    {
      icon: Axis3D,
      key: 'axes',
      label: t('toolBar.axes'),
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
          icon: Power,
          key: 'power',
          label: t('toolBar.resetToIdle'),
        },
        {
          icon: SwitchCamera,
          key: 'resetCamera',
          label: t('toolBar.resetCamera'),
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
          case 'power': {
            viewer.model?.resetToIdle();
            break;
          }
          case 'screenShot': {
            const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
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
          case 'floor': {
            viewer.toggleFloor();

            break;
          }
          // No default
        }
      }}
      style={style}
      type={'block'}
      size={'normal'}
    />
  );
};

export default ToolBar;
