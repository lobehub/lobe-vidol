import { ActionIcon, Avatar } from '@lobehub/ui';
import { Progress, Typography } from 'antd';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { ListMusic } from 'lucide-react';
import React, { memo, useEffect, useRef, useState } from 'react';

import Control from '@/features/AudioPlayer/Control';
import Duration from '@/features/AudioPlayer/Duration';
import PlayList from '@/features/AudioPlayer/PlayList';
import Volume from '@/features/AudioPlayer/Volume';
import { useLoadAudio } from '@/hooks/useLoadAudio';
import { useLoadDance } from '@/hooks/useLoadDance';
import { useDanceStore } from '@/store/dance';
import { playListSelectors } from '@/store/dance/selectors/playlist';
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
  const { nextDance, currentPlay, isPlaying } = useDanceStore(
    (s) => ({
      currentPlay: playListSelectors.currentPlay(s),
      isPlaying: s.isPlaying,
      nextDance: s.nextDance,
    }),
    isEqual,
  );
  const viewer = useGlobalStore((s) => s.viewer);

  const { downloading: audioDownloading, percent: audioPercent, fetchAudioUrl } = useLoadAudio();
  const { downloading: danceDownloading, percent: dancePercent, fetchDanceBuffer } = useLoadDance();

  const { styles } = useStyles();

  useEffect(() => {
    if (isPlaying && currentPlay) {
      const audioPromise = fetchAudioUrl(currentPlay.danceId, currentPlay.audio);
      const dancePromise = fetchDanceBuffer(currentPlay.danceId, currentPlay.src);
      Promise.all([audioPromise, dancePromise]).then((res) => {
        if (!res) return;
        const [audioUrl, danceBuffer] = res;
        viewer.model?.dance(danceBuffer);
        if (ref.current) ref.current.src = audioUrl;
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
        <div style={{ position: 'relative' }}>
          <Avatar shape="circle" size={48} src={currentPlay?.cover} />
          {danceDownloading || audioDownloading ? (
            <Progress
              type="circle"
              className={styles.progress}
              percent={Math.ceil((dancePercent + audioPercent) / 2)}
              size={[48, 48]}
            />
          ) : null}
        </div>
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
