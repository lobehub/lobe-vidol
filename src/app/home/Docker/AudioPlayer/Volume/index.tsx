import { ConfigProvider, Slider } from 'antd';
import { Volume2, VolumeXIcon } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useStyles } from './style';

interface VolumeProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  setVolume: (volume: number) => void;
  volume: number;
}

const Volume = (props: VolumeProps) => {
  const { volume, setVolume, audioRef } = props;
  const [tempVolume, setTempVolume] = useState(0);
  const { styles } = useStyles();

  return (
    <div className={styles.volume}>
      {volume === 0 ? (
        <VolumeXIcon
          className={styles.volumeIcon}
          onClick={() => setVolume(tempVolume)}
          size={20}
        />
      ) : (
        <Volume2
          className={styles.volumeIcon}
          onClick={() => {
            setTempVolume(volume);
            setVolume(0);
          }}
          size={20}
        />
      )}
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
          max={1}
          min={0}
          onChange={(volume) => {
            if (!audioRef.current) return;
            audioRef.current.volume = volume;
            setVolume(volume);
          }}
          step={0.05}
          style={{ margin: 0, width: 64 }}
          tooltip={{ open: false }}
          value={volume}
        />
      </ConfigProvider>
    </div>
  );
};

export default memo(Volume);
