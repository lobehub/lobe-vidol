import HolographicCard from '@/components/HolographicCard';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));

  return (
    <div className={styles.content}>
      <HolographicCard img={currentAgent?.meta.cover} />
    </div>
  );
};

export default Docker;
