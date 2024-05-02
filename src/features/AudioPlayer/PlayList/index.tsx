/* eslint-disable @next/next/no-img-element */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Drawer, List } from 'antd';
import { memo } from 'react';

import { SIDEBAR_WIDTH } from '@/constants/common';
import { DanceStore, useDanceStore } from '@/store/dance';

import PlayItem from './Item';
import { useStyles } from './style';

interface PlayListProps {
  onClose: () => void;
  open: boolean;
}

const playListSelectors = (s: DanceStore) => {
  return {
    clearPlayList: s.clearPlayList,
    playlist: s.playlist,
  };
};

const PlayList = (props: PlayListProps) => {
  const { open = false, onClose } = props;
  const { styles } = useStyles();
  const { playlist, clearPlayList } = useDanceStore((s) => playListSelectors(s));

  return (
    <Drawer
      extra={
        <Button icon={<DeleteOutlined />} onClick={() => clearPlayList()} size="small">
          清空
        </Button>
      }
      onClose={onClose}
      open={open}
      classNames={{
        content: styles.content,
        body: styles.body,
        header: styles.header,
      }}
      title="播放列表"
      width={SIDEBAR_WIDTH}
      getContainer={false}
    >
      <List dataSource={playlist} renderItem={(item) => <PlayItem item={item} />} size="small" />
    </Drawer>
  );
};

export default memo(PlayList);
