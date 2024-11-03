import { DraggablePanel } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import React, { memo, useState } from 'react';
import useSWR from 'swr';

import Author from '@/components/Author';
import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { getAgentDetail } from '@/services/agent';
import { agentSelectors, useAgentStore } from '@/store/agent';

import ChatButton from './actions/ChatButton';
import Subscribe from './actions/Subscribe';
import UnSubscribe from './actions/UnSubscribe';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

interface RoleInfoProps {
  activateAgent: (agentId: string) => void;
  currentAgentId: string;
  deactivateAgent: () => void;
}

const RoleInfo = (props: RoleInfoProps) => {
  const { activateAgent, currentAgentId, deactivateAgent } = props;
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');

  const { data: currentAgentItem, isLoading } = useSWR(
    currentAgentId ? `/api/agent/${currentAgentId}` : null,
    () => (currentAgentId ? getAgentDetail(currentAgentId) : null),
  );

  const showAgentSideBar = !!currentAgentId;

  const [subscribed] = useAgentStore((s) => [agentSelectors.subscribed(s)]);

  const actions = [];
  if (currentAgentId && currentAgentItem) {
    const isSubscribed = subscribed(currentAgentId);

    if (isSubscribed) {
      actions.push(
        <ChatButton key={`${currentAgentItem.agentId}-chat`} agent={currentAgentItem} />,
        <UnSubscribe key={`${currentAgentItem.agentId}-unsubscribe`} agent={currentAgentItem} />,
      );
    } else {
      actions.push(
        <Subscribe agent={currentAgentItem} key={`${currentAgentItem.agentId}-subscribe`} />,
      );
    }
  }

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: SIDEBAR_WIDTH }}
      expand={showAgentSideBar}
      minWidth={SIDEBAR_WIDTH}
      maxWidth={SIDEBAR_MAX_WIDTH}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(currentAgentId);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
      placement={'right'}
    >
      {isLoading ? (
        <div style={{ padding: 24 }}>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>
      ) : (
        currentAgentItem && (
          <AgentCard
            actions={actions}
            agent={currentAgentItem}
            extra={
              <Author
                author={currentAgentItem.author}
                homepage={currentAgentItem.homepage}
                createAt={currentAgentItem.createAt}
              />
            }
            footer={
              <SystemRole systemRole={currentAgentItem.meta.readme} style={{ marginTop: 16 }} />
            }
          />
        )
      )}
    </DraggablePanel>
  );
};

export default memo(RoleInfo);
