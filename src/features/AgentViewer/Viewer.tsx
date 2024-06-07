import React, { memo, useCallback } from 'react';

import { useGlobalStore } from '@/store/global';

import { useStyles } from './style';

interface Props {
  vrmUrl: string;
}

function Viewer(props: Props) {
  const { vrmUrl } = props;
  const { styles } = useStyles();
  const viewer = useGlobalStore((s) => s.viewer);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        viewer.loadVrm(vrmUrl);
      }
    },
    [viewer, vrmUrl],
  );

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
}

export default memo(Viewer);
