import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React, { memo, useState } from 'react';

import Author from '@/components/Author';
import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { marketStoreSelectors, useMarketStore } from '@/store/market';

import ChatButton from './actions/ChatButton';
import Subscribe from './actions/Subscribe';
import UnSubscribe from './actions/UnSubscribe';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    overflow: auto;
    display: flex;
    flex-direction: column;

    height: 100% !important;
    padding: 0;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

interface MarketInfoProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const MarketInfo = (props: MarketInfoProps) => {
  const { styles } = useStyles();
  const { setIsModalOpen } = props;
  const [tempId, setTempId] = useState<string>('');
  const [showAgentSidebar, activateAgent, deactivateAgent, currentAgentItem] = useMarketStore(
    (s) => [
      marketStoreSelectors.showAgentSideBar(s),
      s.activateAgent,
      s.deactivateAgent,
      marketStoreSelectors.currentAgentItem(s),
    ],
  );
  const [subscribed] = useAgentStore((s) => [agentSelectors.subscribed(s)]);

  const actions = [];
  if (currentAgentItem) {
    const isSubscribed = subscribed(currentAgentItem.agentId);

    if (isSubscribed) {
      actions.push(
        <ChatButton
          key={`${currentAgentItem.agentId}-chat`}
          agent={currentAgentItem}
          onClick={() => {
            setIsModalOpen(false);
          }}
        />,
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
      expand={showAgentSidebar}
      minWidth={SIDEBAR_WIDTH}
      maxWidth={SIDEBAR_MAX_WIDTH}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useMarketStore.getState().currentAgentId);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
      placement={'right'}
    >
      <AgentCard
        actions={actions}
        agent={currentAgentItem}
        extra={
          <Author
            author={currentAgentItem?.author}
            homepage={currentAgentItem?.homepage}
            createAt={currentAgentItem?.createAt}
          />
        }
        footer={<SystemRole systemRole={currentAgentItem?.meta.readme} style={{ marginTop: 16 }} />}
      />
    </DraggablePanel>
  );
};

export default memo(MarketInfo);
