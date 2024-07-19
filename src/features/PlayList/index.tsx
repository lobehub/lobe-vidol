/* eslint-disable @next/next/no-img-element */
import { List } from 'antd';
import { memo } from 'react';

import { useDanceStore } from '@/store/dance';

import PlayItem from './Item';

const PlayList = () => {
  const playlist = useDanceStore((s) => s.playlist);

  return (
    <List dataSource={playlist} renderItem={(id) => <PlayItem playItemId={id} />} size="small" />
  );
};

export default memo(PlayList);
