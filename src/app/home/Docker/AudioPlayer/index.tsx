import Control from '@/app/home/Docker/AudioPlayer/Control';
import Duration from '@/app/home/Docker/AudioPlayer/Duration';
import Volume from '@/app/home/Docker/AudioPlayer/Volume';
import { DanceStore, useDanceStore } from '@/store/dance';
import { useViewerStore } from '@/store/viewer';
import { Avatar } from '@lobehub/ui';
import { Typography } from 'antd';
import classNames from 'classnames';
import { ListMusic } from 'lucide-react';
import React, { memo, useEffect, useRef, useState } from 'react';
import PlayList from './PlayList';
import { useStyles } from './style';

interface PlayerProps {
  className?: string;
  style?: React.CSSProperties;
}

const danceSelectors = (s: DanceStore) => {
  return {
    currentPlay: s.currentPlay,
    isPlaying: s.isPlaying,
    nextDance: s.nextDance,
  };
};

function Player(props: PlayerProps) {
  const { style, className } = props;
  const ref = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.2);
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { nextDance, currentPlay, isPlaying } = useDanceStore(danceSelectors);
  const viewer = useViewerStore((s) => s.viewer);

  const { styles } = useStyles();

  useEffect(() => {
    if (isPlaying && currentPlay) {
      fetch(currentPlay.src)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          viewer.model?.dance(buffer);
          ref.current?.play();
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
        src={currentPlay?.audio}
      />
      <div className={styles.player}>
        <Avatar
          className={isPlaying ? styles.spin : ''}
          shape="circle"
          size={48}
          src={currentPlay?.cover}
        />
        <div className={styles.content}>
          <Duration currentProgress={currentProgress} duration={duration} />
          <div className={styles.controller}>
            <Typography.Text className={styles.name} ellipsis={{ tooltip: currentPlay?.name }}>
              {currentPlay?.name || '请从舞蹈列表中选取'}
            </Typography.Text>
            <Control />
            <div className={styles.right}>
              <Volume audioRef={ref} setVolume={setVolume} volume={volume} />
              <ListMusic onClick={() => setOpen(true)} size={20} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Player);
