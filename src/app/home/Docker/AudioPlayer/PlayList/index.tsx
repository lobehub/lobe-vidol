/* eslint-disable @next/next/no-img-element */
import { DanceStore, useDanceStore } from '@/store/dance';
import { DeleteOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Button, Drawer, List, Typography, theme } from 'antd';
import { Pause, PlayIcon, XIcon } from 'lucide-react';
import { memo } from 'react';

const { Text } = Typography;

const { Meta } = List.Item;

interface PlayListProps {
  onClose: () => void;
  open: boolean;
}

const playListSelectors = (s: DanceStore) => {
  return {
    clearPlayList: s.clearPlayList,
    currentPlay: s.currentPlay,
    isPlaying: s.isPlaying,
    playItem: s.playItem,
    playlist: s.playlist,
    removePlayItem: s.removePlayItem,
    setIsPlaying: s.setIsPlaying,
  };
};

const PlayList = (props: PlayListProps) => {
  const { open = false, onClose } = props;
  const { token } = theme.useToken();
  const {
    playlist,
    playItem,
    removePlayItem,
    currentPlay,
    isPlaying,
    setIsPlaying,
    clearPlayList,
  } = useDanceStore((s) => playListSelectors(s));

  return (
    <Drawer
      closeIcon={null}
      extra={
        <Button icon={<DeleteOutlined />} onClick={() => clearPlayList()} size="small">
          清空列表
        </Button>
      }
      onClose={onClose}
      open={open}
      styles={{
        body: { padding: 0 },
        header: { padding: 12 },
      }}
      title="当前播放列表"
      width={400}
    >
      <List
        dataSource={playlist}
        renderItem={(item) => {
          const isCurrentPlay = currentPlay ? currentPlay!.name === item.name : false;

          return (
            <List.Item
              actions={[
                isCurrentPlay && isPlaying ? (
                  <ActionIcon
                    icon={Pause}
                    key="pause"
                    onClick={() => setIsPlaying(false)}
                    size="small"
                  />
                ) : (
                  <ActionIcon
                    icon={PlayIcon}
                    key="play"
                    onClick={() => playItem(item)}
                    size="small"
                  />
                ),
                <ActionIcon
                  icon={XIcon}
                  key="delete"
                  onClick={() => removePlayItem(item)}
                  size="small"
                />,
              ]}
              onDoubleClick={() => {
                if (isPlaying) {
                  setIsPlaying(false);
                } else {
                  playItem(item);
                }
              }}
              style={{
                backgroundColor: isCurrentPlay ? token.colorBgSpotlight : undefined,
                cursor: 'pointer',
              }}
            >
              <Meta
                title={
                  <Text ellipsis={{ tooltip: item.name }} style={{ width: 600 }}>
                    {item.name}
                  </Text>
                }
              />
            </List.Item>
          );
        }}
        size="small"
      />
    </Drawer>
  );
};

export default memo(PlayList);
