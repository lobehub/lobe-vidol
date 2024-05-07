import { Space } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentMeta from '@/components/agent/AgentMeta';
import Chat from '@/features/Actions/Chat';
import { agentListSelectors, useAgentStore } from '@/store/agent';

import { useStyles } from './style';

interface Props {
  className?: string;
}
export default (props: Props) => {
  const { className } = props;
  const { styles } = useStyles();
  const [currentAgent] = useAgentStore((s) => [agentListSelectors.currentAgentItem(s)]);

  return (
    <Flexbox
      justify={'space-between'}
      horizontal
      align={'center'}
      className={classNames(styles.header, className)}
    >
      <Space>
        {/*<ToggleSessionList />*/}
        <AgentMeta meta={currentAgent?.meta} />
      </Space>
      <Space>
        <Chat key={'chat'} />
      </Space>
    </Flexbox>
  );
};
