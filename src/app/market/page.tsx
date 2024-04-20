'use client';

import AgentMarket from '@/panels/AgentPanel/Market';

import { useStyles } from './style';

const Index = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.content}>
      <AgentMarket />
    </div>
  );
};

export default Index;
