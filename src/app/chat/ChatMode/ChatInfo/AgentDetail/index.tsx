import { Space } from 'antd';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { CHAT_HEADER_HEIGHT } from '@/constants/token';
import useSessionContext from '@/hooks/useSessionContext';

import EditRole from '../actions/EditRole';
import History from '../actions/History';
import TokenMini from '../actions/TokenMini';

const ChatInfo = () => {
  const { sessionAgent } = useSessionContext();

  return (
    sessionAgent && (
      <AgentCard
        style={{ height: `calc(100vh - ${CHAT_HEADER_HEIGHT}px)` }}
        agent={sessionAgent}
        actions={[
          <Flexbox horizontal justify={'space-between'} align="center" key="token-history">
            <Space size={4}>
              <TokenMini />
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
