import { ActionIconGroup } from '@lobehub/ui';
import { Axis3D, Grid3x3, LandPlot, Orbit, RotateCw, SwitchCamera } from 'lucide-react';
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
      icon: SwitchCamera,
      key: 'cameraHelper',
      label: t('toolBar.cameraHelper'),
    },
    {
      icon: Orbit,
      key: 'cameraControl',
      label: t('toolBar.cameraControl'),
    },
    {
      icon: LandPlot,
      key: 'floor',
      label: t('toolBar.floor'),
    },
  ];

  return (
    <ActionIconGroup
      className={className}
      direction="column"
      dropdownMenu={dropdownMenu}
      items={[
        {
          icon: RotateCw,
          key: 'resetCamera',
          label: t('toolBar.resetCamera'),
        },
        {
          icon: Grid3x3,
          key: 'grid',
          label: t('toolBar.grid'),
        },
        {
          icon: Axis3D,
          key: 'axes',
          label: t('toolBar.axes'),
        },
      ]}
      onActionClick={(action) => {
        switch (action.key) {
          case 'resetCamera': {
            viewer.resetCamera();

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
    />
  );
};

export default ToolBar;
