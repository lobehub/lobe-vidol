import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from '@/components/ListItem';
import { useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

import { useStyles } from './style';

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
  const { styles } = useStyles();

  return (
    <div className={classNames(className, styles.list)} style={style}>
      {dataSource.map((item) => {
        const { avatar, name } = item.meta;
        const isSelected = item.agentId === currentIdentifier;
        return (
          <ListItem
            key={item.agentId}
            title={name}
            avatar={avatar}
            onClick={() => {
              activateAgent(item.agentId);
            }}
            active={isSelected}
          />
        );
      })}
    </div>
  );
};

export default memo(AgentList);
