'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import { sessionSelectors, useSessionStore } from '@/store/session';

import Operations from './Operations';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100% !important;
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
      minWidth={280}
      maxWidth={280}
      mode={'fixed'}
      placement={'right'}
    >
      <AgentCard agent={currentAgent} />
      <Flexbox gap={8} style={{ padding: 8 }}>
        <Operations />
      </Flexbox>
    </DraggablePanel>
  );
};

export default Header;
