/* eslint-disable @next/next/no-img-element */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Drawer, List } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SIDEBAR_WIDTH } from '@/constants/token';
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
  const { t } = useTranslation('common');

  return (
    <Drawer
      extra={
        <Button icon={<DeleteOutlined />} onClick={() => clearPlayList()} size="small">
          {t('actions.clearAll')}
        </Button>
      }
      onClose={onClose}
      open={open}
      classNames={{
        content: styles.content,
        body: styles.body,
        header: styles.header,
      }}
      title={t('playlist')}
      width={SIDEBAR_WIDTH}
      getContainer={false}
    >
      <List dataSource={playlist} renderItem={(id) => <PlayItem playItemId={id} />} size="small" />
    </Drawer>
  );
};

export default memo(PlayList);
