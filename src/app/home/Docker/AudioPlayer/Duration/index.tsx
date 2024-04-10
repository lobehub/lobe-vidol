import { ConfigProvider, Slider } from 'antd';
import { memo } from 'react';
import { useStyles } from './style';

interface DurationProps {
  currentProgress: number;
  duration: number;
}

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);
  return [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':');
}

const Duration = (props: DurationProps) => {
  const { duration, currentProgress } = props;
  const { styles } = useStyles();

  return (
    <div className={styles.duration}>
      <span className={styles.counter} style={{ marginRight: 8 }}>
        {formatDurationDisplay(currentProgress)}
      </span>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              controlSize: 6,
              handleSize: 6,
            },
          },
        }}
      >
        <Slider
          max={duration}
          min={0}
          style={{ margin: 0, width: '100%' }}
          tooltip={{ open: false }}
          value={currentProgress}
        />
      </ConfigProvider>
      <span className={styles.counter} style={{ marginLeft: 8 }}>
        {formatDurationDisplay(duration)}
      </span>
    </div>
  );
};

export default memo(Duration);
