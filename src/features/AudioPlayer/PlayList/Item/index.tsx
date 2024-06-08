import { ActionIcon, Avatar, Icon } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { List, Typography, theme } from 'antd';
import { Pause, Play, Trash2 } from 'lucide-react';
import { memo, useRef } from 'react';

import { useDanceStore } from '@/store/dance';
import { playListSelectors } from '@/store/dance/selectors/playlist';

import { useStyles } from './style';

const { Text } = Typography;

const { Meta } = List.Item;

interface PlayItemProps {
  playItemId: string;
}

const PlayItem = (props: PlayItemProps) => {
  const { playItemId } = props;
  const { styles } = useStyles();
  const { token } = theme.useToken();
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
    <List.Item
      ref={hoverRef}
      extra={
        <ActionIcon
          icon={Trash2}
          key="delete"
          title={'从列表中移除'}
          onClick={() => removePlayItem(playItemId)}
          size="small"
        />
      }
      onDoubleClick={() => {
        if (isCurrentPlay && isPlaying) {
          setIsPlaying(false);
        } else {
          playItem(playItemId);
        }
      }}
      style={{
        backgroundColor: isCurrentPlay || isHovered ? token.colorBgTextActive : undefined,
      }}
    >
      <Meta
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
                  title={isCurrentPlay && isPlaying ? '暂停' : '播放'}
                  className={styles.playIcon}
                />
              </div>
            ) : null}
          </div>
        }
        title={
          <Text ellipsis={{ tooltip: item?.name }} style={{ width: 200 }}>
            {item?.name}
          </Text>
        }
        description={
          <Text type="secondary" ellipsis={{ tooltip: item?.createAt }}>
            {item?.createAt}
          </Text>
        }
      />
    </List.Item>
  );
};

export default memo(PlayItem);
