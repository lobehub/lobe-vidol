import { ActionIcon, Avatar } from '@lobehub/ui';
import { Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import { ListMusic } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import Control from '@/features/AudioPlayer/Control';
import PlayList from '@/features/AudioPlayer/PlayList';
import { useDanceStore } from '@/store/dance';
import { playListSelectors } from '@/store/dance/selectors/playlist';

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
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');
  const [playlist, currentPlay] = useDanceStore((s) => [
    s.playlist,
    playListSelectors.currentPlay(s),
  ]);

  return playlist.length ? (
    <Flexbox
      horizontal
      gap={8}
      align={'center'}
      justify={'space-between'}
      style={style}
      className={className}
    >
      <PlayList onClose={() => setOpen(false)} open={open} />
      <Tooltip title={currentPlay?.name}>
        <Avatar style={style} shape="circle" size={42} src={currentPlay?.cover} />
      </Tooltip>
      <Control />
      <ActionIcon
        icon={ListMusic}
        onClick={() => setOpen(true)}
        title={t('playlist')}
        size={DESKTOP_HEADER_ICON_SIZE}
      />
    </Flexbox>
  ) : null;
};
