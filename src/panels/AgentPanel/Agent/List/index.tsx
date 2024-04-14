import React, { memo } from 'react';

import GridList from '@/components/GridList';
import { useAgentStore } from '@/store/agent';

interface AgentListProps {
  className?: string;
  style?: React.CSSProperties;
}

const AgentList = (props: AgentListProps) => {
  const { className, style } = props;

  const [subscribedList, activateAgent, currentIdentifier] = useAgentStore((s) => [
    s.subscribedList,
    s.activateAgent,
    s.currentIdentifier,
  ]);

  return (
    <GridList
      className={className}
      style={style}
      items={subscribedList.map((items) => ({
        avatar: items.meta.avatar,
        id: items.agentId,
        name: items.meta.name,
      }))}
      onClick={(id) => {
        activateAgent(id);
      }}
      isActivated={(id) => id === currentIdentifier}
    />
  );
};

export default memo(AgentList);
