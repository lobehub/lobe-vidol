'use client';

import { DraggablePanel } from '@lobehub/ui';
import { Button } from 'antd';
import { createStyles } from 'antd-style';

import AgentInfo from '@/components/AgentInfo';
import Voice from '@/features/ChatInput/Actions/Voice';
import { useConfigStore } from '@/store/config';
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
  const [openPanel] = useConfigStore((s) => [s.openPanel, s.closePanel]);
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
          <Button
            key="edit"
            onClick={() => {
              openPanel('role');
            }}
          >
            编辑
          </Button>,
          <Voice key={'voice'} />,
        ]}
        agent={currentAgent}
      />
    </DraggablePanel>
  );
};

export default Header;
