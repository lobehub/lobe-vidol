import React, { memo } from 'react';

import SystemRole from '@/components/agent/SystemRole';
import { Agent } from '@/types/agent';

import AgentCard from '../AgentCard';
import { useStyles } from './style';

interface AgentInfoProps {
  actions?: React.ReactNode[];
  agent?: Agent;
}

const AgentInfo = (props: AgentInfoProps) => {
  const { styles } = useStyles();
  const { agent, actions = [] } = props;
  const { systemRole } = agent || {};

  return (
    <div className={styles.container}>
      <AgentCard actions={actions} agent={agent} />
      <SystemRole systemRole={systemRole} />
    </div>
  );
};

export default memo(AgentInfo);
