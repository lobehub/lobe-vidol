'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React from 'react';

import AgentCard from '@/components/agent/AgentCard';
import Dance from '@/features/Actions/Dance';
import Edit from '@/features/Actions/Edit';
import Voice from '@/features/Actions/Voice';
import { sessionSelectors, useSessionStore } from '@/store/session';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
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
      maxWidth={360}
      mode={'fixed'}
      placement={'right'}
    >
      <AgentCard
        actions={[<Edit key={'edit'} />, <Voice key={'voice'} />, <Dance key={'dance'} />]}
        agent={currentAgent}
      />
    </DraggablePanel>
  );
};

export default Header;
