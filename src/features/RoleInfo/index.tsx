'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React, { memo, useState } from 'react';

import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import Chat from '@/features/Actions/Chat';
import UnSubscribeButton from '@/features/Actions/UnSubscribeButton';
import { agentListSelectors, useAgentStore } from '@/store/agent';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const Header = () => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [showAgentSidebar, activateAgent, deactivateAgent] = useAgentStore((s) => [
    agentListSelectors.showSideBar(s),
    s.activateAgent,
    s.deactivateAgent,
  ]);
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: SIDEBAR_WIDTH }}
      expand={showAgentSidebar}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useAgentStore.getState().currentIdentifier);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
      placement={'right'}
    >
      <AgentCard
        actions={[<Chat key={'chat'} />, <UnSubscribeButton key="unsubscribe" />]}
        agent={currentAgent}
        footer={<SystemRole systemRole={currentAgent?.systemRole} style={{ marginTop: 16 }} />}
      />
    </DraggablePanel>
  );
};

export default memo(Header);
