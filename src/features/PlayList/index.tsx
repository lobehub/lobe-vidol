/* eslint-disable @next/next/no-img-element */
import { Empty, Space } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import AudioPlayer from '@/features/AudioPlayer';
import ClearPlayList from '@/features/PlayList/Actions/ClearPlayList';
import Dance from '@/features/PlayList/Actions/Dance';
import { useDanceStore } from '@/store/dance';

import PlayItem from './Item';

interface PlayListProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    height: 100%;
    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
  list: css`
    overflow-y: scroll;
    width: 100%;
    padding: 0 ${token.paddingSM}px;
  `,
  player: css`
    width: 100%;
    height: 64px;
    padding: 0 ${token.paddingSM}px;
    border-top: 1px solid ${token.colorBorder};
  `,
}));

const PlayList = (props: PlayListProps) => {
  const playlist = useDanceStore((s) => s.playlist);
  const { t } = useTranslation(['panel', 'common']);
  const { className, style } = props;
  const { styles } = useStyles();

  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Flexbox className={styles.list} flex={1}>
        <Header
          title={t('playlist', { ns: 'common' })}
          extra={
            <Space>
              <Dance key={'dance'} />
              <ClearPlayList key={'clear'} />
            </Space>
          }
        />

        {playlist.map((id) => {
          return <PlayItem playItemId={id} key={id} />;
        })}
        {playlist.length === 0 ? (
          <Empty description={t('dance.noPlayList')} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
        ) : null}
      </Flexbox>
      <Center className={styles.player}>
        <AudioPlayer />
      </Center>
    </Flexbox>
  );
};

export default memo(PlayList);
