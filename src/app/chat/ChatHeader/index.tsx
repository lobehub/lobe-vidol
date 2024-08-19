import { Space } from 'antd';
import classNames from 'classnames';
import React from 'react';
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
}
export default (props: Props) => {
  const { className } = props;
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <Flexbox
      justify={'space-between'}
      horizontal
      align={'center'}
      className={classNames(styles.header, className)}
    >
      <Space>
        <ToggleSessionList />
        <AgentMeta meta={currentAgent?.meta} />
      </Space>
      <Space>
        <Voice key={'voice'} />
        <ShareButton key={'share'} />
        <ToggleChatSideBar key={'sidebar'} />
      </Space>
    </Flexbox>
  );
};