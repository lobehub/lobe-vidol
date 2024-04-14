import React from 'react';

import GridList from '@/components/GridList';
import { useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

interface AgentListProps {
  className?: string;
  dataSource: Agent[];
  style?: React.CSSProperties;
}

const AgentList = (props: AgentListProps) => {
  const { dataSource, className, style } = props;
  const [activateAgent, currentIdentifier] = useAgentStore((s) => [
    s.activateAgent,
    s.currentIdentifier,
  ]);

  return (
    <GridList
      className={className}
      style={style}
      items={dataSource.map((items) => ({
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

export default AgentList;
