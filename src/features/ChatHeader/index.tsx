import AgentMeta from '@/components/AgentMeta';
import { sessionSelectors, useSessionStore } from '@/store/session';

import ViewerMode from './ViewerMode';
import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <ViewerMode key={'viewer'} />
    </div>
  );
};

export default Header;
