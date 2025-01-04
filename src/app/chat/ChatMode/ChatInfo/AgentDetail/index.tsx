import { Space } from 'antd';
import isEqual from 'lodash-es/isEqual';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { sessionSelectors, useSessionStore } from '@/store/session';

import Clear from '../actions/Clear';
import EditRole from '../actions/EditRole';
import History from '../actions/History';
import TokenMini from '../actions/TokenMini';

const ChatInfo = () => {
  const sessionAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);

  return (
    sessionAgent && (
      <AgentCard
        agent={sessionAgent}
        actions={[
          <Flexbox horizontal justify={'space-between'} align="center" key="token-history">
            <Space size={4}>
              <TokenMini />
              <Clear />
              <History />
            </Space>
            <EditRole />
          </Flexbox>,
        ]}
        footer={<SystemRole systemRole={sessionAgent.systemRole} style={{ marginTop: 16 }} />}
      />
    )
  );
};

export default memo(ChatInfo);
