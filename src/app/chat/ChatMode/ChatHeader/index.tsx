'use client';

import { Skeleton, Space } from 'antd';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import ShareButton from './actions/ShareButton';
import ToggleChatInfo from './actions/ToggleChatInfo';
import ToggleSessionList from './actions/ToggleSessionList';
import { useStyles } from './style';

const AgentMeta = dynamic(() => import('./AgentMeta'), {
  ssr: false,
  loading: () => (
    <Skeleton
      active
      avatar={{ shape: 'circle', size: 'default' }}
      paragraph={false}
      title={{ style: { margin: 0, marginTop: 8 }, width: 200 }}
    />
  ),
});

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default (props: Props) => {
  const { className, style } = props;
  const { styles } = useStyles();

  return (
    <Flexbox
      justify={'space-between'}
      horizontal
      align={'center'}
      style={style}
      className={classNames(styles.header, className)}
    >
      <Flexbox horizontal align={'center'} className={styles.leftSection}>
        <ToggleSessionList />
        <div className={styles.agentMetaWrapper}>
          <AgentMeta />
        </div>
      </Flexbox>
      <Space className={styles.actions}>
        <ShareButton key={'share'} />
        <ToggleChatInfo />
      </Space>
    </Flexbox>
  );
};
