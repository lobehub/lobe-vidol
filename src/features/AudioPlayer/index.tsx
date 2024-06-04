import { ActionIcon, Avatar } from '@lobehub/ui';
import { Typography } from 'antd';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { ListMusic } from 'lucide-react';
import React, { memo, useEffect, useRef, useState } from 'react';

import Control from '@/features/AudioPlayer/Control';
import Duration from '@/features/AudioPlayer/Duration';
import PlayList from '@/features/AudioPlayer/PlayList';
import Volume from '@/features/AudioPlayer/Volume';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { useGlobalStore } from '@/store/global';

import { useStyles } from './style';

interface PlayerProps {
  className?: string;
  style?: React.CSSProperties;
}

function Player(props: PlayerProps) {
  const { style, className } = props;
  const ref = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.2);
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { nextDance, currentPlay, isPlaying, getCurrentPlayData } = useDanceStore(
    (s) => ({
      currentPlay: s.currentPlay,
      isPlaying: s.isPlaying,
      nextDance: s.nextDance,
      getCurrentPlayData: danceListSelectors.getCurrentPlayData(s),
    }),
    isEqual,
  );
  const viewer = useGlobalStore((s) => s.viewer);

  const { styles } = useStyles();

  useEffect(() => {
    if (isPlaying && currentPlay) {
      getCurrentPlayData.then((res) => {
        if (!res) return;
        const { danceBuffer, audioBlob } = res;
        viewer.model?.dance(danceBuffer);
        if (ref.current) ref.current.src = URL.createObjectURL(audioBlob);
        if (ref.current) ref.current.play();
      });
    } else {
      viewer.model?.stopDance();
      ref.current?.pause();
      if (ref.current) ref.current.currentTime = 0;
    }
  }, [isPlaying, currentPlay, viewer]);

  return (
    <div className={classNames(styles.container, className)} style={style}>
      <PlayList onClose={() => setOpen(false)} open={open} />
      <audio
        onCanPlay={(e) => {
          e.currentTarget.volume = volume;
        }}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          viewer.model?.stopDance();
          nextDance();
        }}
        onTimeUpdate={(e) => {
          setCurrentProgress(e.currentTarget.currentTime);
        }}
        preload="metadata"
        ref={ref}
      />
      <div className={styles.player}>
        <Avatar
          shape="circle"
          size={48}
          src={currentPlay?.cover}
          className={isPlaying ? styles.spin : ''}
        />
        <div className={styles.content}>
          <Duration currentProgress={currentProgress} duration={duration} />
          <div className={styles.controller}>
            <Typography.Text className={styles.name} ellipsis={{ tooltip: currentPlay?.name }}>
              {currentPlay?.name || '请从舞蹈列表中选取'}
            </Typography.Text>
            <Control />
            <div className={styles.right}>
              <ActionIcon icon={ListMusic} onClick={() => setOpen(true)} title={'播放列表'} />
              <Volume audioRef={ref} setVolume={setVolume} volume={volume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Player);
