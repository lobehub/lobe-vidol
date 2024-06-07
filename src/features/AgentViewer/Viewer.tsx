import React, { memo, useCallback } from 'react';

import PageLoading from '@/components/PageLoading';
import { useGlobalStore } from '@/store/global';

import { useStyles } from './style';

interface Props {
  vrmUrl: string;
}

function Viewer(props: Props) {
  const { vrmUrl } = props;
  const { styles } = useStyles();
  const [loading, setLoading] = React.useState(false);
  const viewer = useGlobalStore((s) => s.viewer);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        setLoading(true);
        viewer.loadVrm(vrmUrl).then(() => {
          setLoading(false);
        });
      }
    },
    [viewer, vrmUrl],
  );

  return (
    <>
      {loading ? <PageLoading className={styles.loading} title="模型加载中，请稍后..." /> : null}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </>
  );
}

export default memo(Viewer);
