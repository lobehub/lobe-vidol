import { createStyles } from 'antd-style';
import { memo } from 'react';
import LazyLoad from 'react-lazy-load';

import { agentListSelectors, useAgentStore } from '@/store/agent';

import SessionItem from './Item';

const useStyles = createStyles(
  ({ css }) => css`
    min-height: 70px;
  `,
);

interface SessionListProps {
  filter?: string;
}

const SessionList = memo<SessionListProps>(({ filter }) => {
  const [agentListIds, getAgentById, activateAgent] = useAgentStore((s) => [
    agentListSelectors.agentListIds(s),
    s.getAgentById,
    s.activateAgent,
  ]);
  const { styles } = useStyles();

  const dataSource = agentListIds.filter((agentId) => {
    const agent = getAgentById(agentId);
    const { name, description } = agent?.meta || {};
    return !filter || name?.includes(filter) || description?.includes(filter);
  });

  return dataSource.map((id) => (
    <LazyLoad className={styles} key={id}>
      <SessionItem
        id={id}
        onClick={() => {
          activateAgent(id);
        }}
      />
    </LazyLoad>
  ));
});

export default SessionList;
