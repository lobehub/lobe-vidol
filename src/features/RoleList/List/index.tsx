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
  const [filterAgentListIds, activateAgent, agentListIds] = useAgentStore((s) => [
    agentListSelectors.filterAgentListIds(s, filter),
    s.activateAgent,
    agentListSelectors.agentListIds(s),
  ]);
  const { styles } = useStyles();

  return (
    <>
      {filterAgentListIds.map((id) => (
        <LazyLoad className={styles} key={id}>
          <SessionItem
            id={id}
            onClick={() => {
              activateAgent(id);
            }}
          />
        </LazyLoad>
      ))}
      {agentListIds.length === 0 && <div></div>}
    </>
  );
});

export default SessionList;
