import { DraggablePanel } from '@lobehub/ui';
import { Space } from 'antd';
import React, { memo, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { CHAT_HEADER_HEIGHT, SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import useSessionContext from '@/hooks/useSessionContext';
import { useGlobalStore } from '@/store/global';

import EditRole from './actions/EditRole';
import History from './actions/History';
import TokenMini from './actions/TokenMini';

interface ChatInfoProps {
  mobile?: boolean;
}

const ChatInfo = memo(({ mobile }: ChatInfoProps) => {
  const { sessionAgent } = useSessionContext();
  const [showAgentInfo, setShowAgentInfo] = useGlobalStore((s) => [
    s.showAgentInfo,
    s.setShowAgentInfo,
  ]);

  useEffect(() => {
    if (mobile && showAgentInfo) {
      setShowAgentInfo(false);
    }
  }, [mobile]);

  const handleExpandChange = (expand: boolean) => {
    if (!mobile) {
      setShowAgentInfo(expand);
    }
  };

  return (
    <DraggablePanel
      defaultSize={{ width: SIDEBAR_WIDTH }}
      minWidth={SIDEBAR_WIDTH}
      maxWidth={SIDEBAR_MAX_WIDTH}
      mode={'fixed'}
      placement={'right'}
      onExpandChange={handleExpandChange}
      expand={showAgentInfo}
    >
      {sessionAgent && (
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
      )}
    </DraggablePanel>
  );
});

export default memo(ChatInfo);
