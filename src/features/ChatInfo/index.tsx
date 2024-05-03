'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React from 'react';

import AgentCard from '@/components/agent/AgentCard';
import { SIDEBAR_WIDTH } from '@/constants/common';
import MiniPlayer from '@/features/AudioPlayer/MiniPlayer';
import { sessionSelectors, useSessionStore } from '@/store/session';

import Operations from './Operations';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    position: relative;
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      minWidth={SIDEBAR_WIDTH}
      maxWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      placement={'right'}
    >
      <AgentCard agent={currentAgent} extra={<MiniPlayer />} footer={<Operations />} />
    </DraggablePanel>
  );
};

export default Header;
