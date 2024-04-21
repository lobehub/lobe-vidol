'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React from 'react';

import AgentInfo from '@/components/AgentInfo';
import Dance from '@/features/Actions/Dance';
import Edit from '@/features/Actions/Edit';
import Log from '@/features/Actions/Log';
import ViewerMode from '@/features/Actions/ViewerMode';
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
      <AgentInfo
        actions={[
          <Edit key={'edit'} />,
          <Voice key={'voice'} />,
          <Log key={'log'} />,
          <Dance key={'dance'} />,
        ]}
        agent={currentAgent}
      />
      <ViewerMode key={'viewer'} />,
    </DraggablePanel>
  );
};

export default Header;
