/* eslint-disable @next/next/no-img-element */
import { Button, ConfigProvider, Empty, List } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDanceStore } from '@/store/dance';
import { useGlobalStore } from '@/store/global';

import PlayItem from './Item';

const PlayList = () => {
  const playlist = useDanceStore((s) => s.playlist);
  const { t } = useTranslation('panel');

  const [openPanel] = useGlobalStore((s) => [s.openPanel]);

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty description={t('dance.noPlayList')} image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <Button
            onClick={() => {
              openPanel('dance');
            }}
            type={'primary'}
          >
            {t('dance.musicAndDance')}
          </Button>
        </Empty>
      )}
    >
      <List dataSource={playlist} renderItem={(id) => <PlayItem playItemId={id} />} size="small" />
    </ConfigProvider>
  );
};

export default memo(PlayList);
