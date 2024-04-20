'use client';

import { DraggablePanel } from '@lobehub/ui';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';

import AgentInfo from '@/components/AgentInfo';
import Voice from '@/features/ChatInput/Actions/Voice';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';

import ViewerMode from '../ViewerMode';

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
  const [tempId, setTempId] = useState<string>('');
  const [showAgentSidebar, activateAgent, deactivateAgent] = useAgentStore((s) => [
    agentListSelectors.showSideBar(s),
    s.activateAgent,
    s.deactivateAgent,
  ]);
  const [openPanel] = useConfigStore((s) => [s.openPanel, s.closePanel]);
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: 360 }}
      expand={showAgentSidebar}
      minWidth={280}
      maxWidth={420}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useAgentStore.getState().currentIdentifier);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
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
          <ViewerMode key={'viewer'} />,
        ]}
        agent={currentAgent}
      />
    </DraggablePanel>
  );
};

export default Header;
