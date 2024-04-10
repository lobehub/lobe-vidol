import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import LazyLoad from 'react-lazy-load';
import SessionItem from './SessionItem';

const useStyles = createStyles(
  ({ css }) => css`
    min-height: 70px;
  `,
);

interface SessionListProps {
  filter?: string;
}

const SessionList = memo<SessionListProps>(({ filter }) => {
  const [sessionListIds, getAgentById] = useSessionStore((s) => [
    sessionSelectors.sessionListIds(s),
    sessionSelectors.getAgentById(s),
  ]);
  const [switchSession] = useSessionStore((s) => [s.switchSession]);
  const { styles } = useStyles();

  const dataSource = sessionListIds.filter((agentId) => {
    const agent = getAgentById(agentId);
    const { name, description } = agent?.meta || {};
    return !filter || name?.includes(filter) || description?.includes(filter);
  });

  return dataSource.map((id) => (
    <LazyLoad className={styles} key={id}>
      <SessionItem
        id={id}
        onClick={() => {
          switchSession(id);
        }}
      />
    </LazyLoad>
  ));
});

export default SessionList;
