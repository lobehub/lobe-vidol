import React from 'react';

import AgentMeta from '@/components/AgentMeta';
import AudioPlayer from '@/features/AudioPlayer';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <div className={styles.player}>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Header;
