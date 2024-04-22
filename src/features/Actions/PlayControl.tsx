import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Music2 } from 'lucide-react';
import React from 'react';

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
  const [isPlaying, togglePlayPause, playlist] = useDanceStore((s) => [
    s.isPlaying,
    s.togglePlayPause,
    s.playlist,
  ]);

  return playlist.length ? (
    <ActionIcon
      className={classNames(isPlaying ? styles.spin : '', className)}
      style={style}
      onClick={togglePlayPause}
      icon={Music2}
    />
  ) : null;

  // return (
  //   <Avatar
  //     className={classNames(isPlaying ? styles.spin : '', className)}
  //     style={style}
  //     shape="circle"
  //     size={32}
  //     onClick={togglePlayPause}
  //     src={currentPlay?.cover}
  //   />
  // );
};
