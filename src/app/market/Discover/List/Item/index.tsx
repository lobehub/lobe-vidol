import { Avatar } from '@lobehub/ui';
import { useHover } from 'ahooks';
import React, { memo, useRef } from 'react';

import ListItem from '@/components/ListItem';
import { useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

import { useStyles } from './style';

interface AgentItemProps {
  agentItem: Agent;
}

const AgentItem = (props: AgentItemProps) => {
  const { agentItem } = props;
  const { styles } = useStyles();
  const [currentIdentifier, activateAgent] = useAgentStore((s) => [
    s.currentIdentifier,
    s.activateAgent,
  ]);

  const isSelected = currentIdentifier === agentItem.agentId;
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  return (
    <ListItem
      ref={hoverRef}
      onClick={() => {
        console.log('agentItem', agentItem);
        activateAgent(agentItem.agentId);
      }}
      className={styles.listItem}
      avatar={
        <div style={{ position: 'relative' }}>
          <Avatar src={agentItem?.meta?.avatar} shape={'square'} size={72} />
        </div>
      }
      title={agentItem?.meta?.name}
      description={agentItem?.meta?.description}
      active={isSelected || isHovered}
      addon={`By ${agentItem?.author}`}
    />
  );
};

export default memo(AgentItem);
