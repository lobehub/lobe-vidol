'use client';

import { Skeleton, Space } from 'antd';
import classNames from 'classnames';
import React, { Suspense } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentMeta from '@/components/agent/AgentMeta';
import { sessionSelectors, useSessionStore } from '@/store/session';

import ShareButton from './actions/ShareButton';
import ToggleChatSideBar from './actions/ToggleChatSideBar';
import ToggleSessionList from './actions/ToggleSessionList';
import Voice from './actions/Voice';
import { useStyles } from './style';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}
export default (props: Props) => {
  const { className, style } = props;
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <Flexbox
      justify={'space-between'}
      horizontal
      align={'center'}
      style={style}
      className={classNames(styles.header, className)}
    >
      <Suspense
        fallback={
          <Skeleton
            active
            avatar={{ shape: 'circle', size: 'default' }}
            paragraph={false}
            title={{ style: { margin: 0, marginTop: 8 }, width: 200 }}
          />
        }
      >
        <Space>
          <ToggleSessionList />
          <AgentMeta meta={currentAgent?.meta} />
        </Space>
      </Suspense>
      <Space>
        <Voice key={'voice'} />
        <ShareButton key={'share'} />
        <ToggleChatSideBar key={'sidebar'} />
      </Space>
    </Flexbox>
  );
};
