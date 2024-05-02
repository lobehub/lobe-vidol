import { ActionIcon, Avatar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { ListMusic } from 'lucide-react';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Control from '@/features/AudioPlayer/Control';
import PlayList from '@/features/AudioPlayer/PlayList';
import { useDanceStore } from '@/store/dance';

const useStyles = createStyles(({ css }) => ({
  spin: css`
    @keyframes rotate-animation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    animation: rotate-animation 20s linear infinite;
  `,
}));

export { useStyles };

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default (props: Props) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [open, setOpen] = useState(false);
  const [isPlaying, togglePlayPause, playlist, currentPlay] = useDanceStore((s) => [
    s.isPlaying,
    s.togglePlayPause,
    s.playlist,
    s.currentPlay,
  ]);

  return playlist.length ? (
    <Flexbox horizontal gap={8} align={'center'} justify={'space-between'} flex={1}>
      <PlayList onClose={() => setOpen(false)} open={open} />
      <Avatar
        className={classNames(isPlaying ? styles.spin : '', className)}
        style={style}
        shape="circle"
        size={42}
        onClick={togglePlayPause}
        src={currentPlay?.cover}
      />
      <Control />
      <ActionIcon icon={ListMusic} onClick={() => setOpen(true)} title={'播放列表'} />
    </Flexbox>
  ) : null;
};
