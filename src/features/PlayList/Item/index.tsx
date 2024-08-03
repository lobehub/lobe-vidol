import { ActionIcon, Avatar, Icon } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Typography } from 'antd';
import { Pause, Play, Trash2 } from 'lucide-react';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ListItem from '@/components/ListItem';
import { useDanceStore } from '@/store/dance';
import { playListSelectors } from '@/store/dance/selectors/playlist';

import { useStyles } from './style';

const { Text } = Typography;

interface PlayItemProps {
  playItemId: string;
}

const PlayItem = (props: PlayItemProps) => {
  const { playItemId } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('common');

  const { playItem, removePlayItem, currentPlayId, isPlaying, setIsPlaying, getDanceItemByPlayId } =
    useDanceStore((s) => ({
      clearPlayList: s.clearPlayList,
      currentPlayId: s.currentPlayId,
      isPlaying: s.isPlaying,
      playItem: s.playItem,
      playlist: s.playlist,
      removePlayItem: s.removePlayItem,
      setIsPlaying: s.setIsPlaying,
      getDanceItemByPlayId: playListSelectors.getDanceItemByPlayId(s),
    }));

  const isCurrentPlay = currentPlayId ? currentPlayId === playItemId : false;
  const item = getDanceItemByPlayId(playItemId);
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  return (
    <ListItem
      ref={hoverRef}
      actions={[
        <ActionIcon
          icon={Trash2}
          key={`${playItemId}-delete`}
          title={t('actions.removeInList')}
          onClick={() => removePlayItem(playItemId)}
          size="small"
        />,
      ]}
      showAction={isHovered}
      className={styles.listItem}
      onDoubleClick={() => {
        if (isCurrentPlay && isPlaying) {
          setIsPlaying(false);
        } else {
          playItem(playItemId);
        }
      }}
      avatar={
        <div style={{ position: 'relative' }}>
          <Avatar src={item?.thumb} shape={'square'} size={48} />
          {isHovered || isCurrentPlay ? (
            <div
              className={styles.mask}
              onClick={() => {
                if (isCurrentPlay && isPlaying) {
                  setIsPlaying(false);
                } else {
                  playItem(playItemId);
                }
              }}
            >
              <Icon
                icon={isCurrentPlay && isPlaying ? Pause : Play}
                title={isCurrentPlay && isPlaying ? t('actions.pause') : t('actions.play')}
                className={styles.playIcon}
              />
            </div>
          ) : null}
        </div>
      }
      title={item?.name}
      description={
        <Text type="secondary" ellipsis={{ tooltip: true }}>
          {item?.createAt}
        </Text>
      }
      active={isCurrentPlay || isHovered}
    />
  );
};

export default memo(PlayItem);
