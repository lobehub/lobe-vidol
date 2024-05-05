import React, { memo, useEffect } from 'react';

import GridList from '@/components/GridList';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useMarketStore } from '@/store/market';

const AgentList = () => {
  const [activateAgent, agentList, agentLoading, currentAgentId, fetchAgentIndex] = useMarketStore(
    (s) => [s.activateAgent, s.agentList, s.agentLoading, s.currentAgentId, s.fetchAgentIndex],
  );
  useEffect(() => {
    fetchAgentIndex();
  }, [fetchAgentIndex]);

  const [subscribed] = useAgentStore((s) => [agentListSelectors.subscribed(s)]);

  return (
    <GridList
      loading={agentLoading}
      items={agentList.map((items) => ({
        avatar: items.meta.avatar,
        id: items.agentId,
        name: items.meta.name,
      }))}
      onClick={(id) => {
        activateAgent(id);
      }}
      isActivated={(id) => id === currentAgentId}
      isChecked={(id) => subscribed(id)}
    />
  );
};

export default memo(AgentList);
