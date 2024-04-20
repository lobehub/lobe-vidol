import AgentMeta from '@/components/AgentMeta';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
    </div>
  );
};

export default Header;
