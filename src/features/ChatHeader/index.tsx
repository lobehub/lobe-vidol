import { Space } from 'antd';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentMeta from '@/components/agent/AgentMeta';
import PlayControl from '@/features/Actions/PlayControl';
import Video from '@/features/Actions/Video';
import Voice from '@/features/Actions/Voice';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <Flexbox justify={'space-between'} horizontal align={'center'} className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <Space>
        <Voice key={'voice'} />
        <Video key={'video'} />
        <PlayControl key="play" />
      </Space>
    </Flexbox>
  );
};

export default Header;
