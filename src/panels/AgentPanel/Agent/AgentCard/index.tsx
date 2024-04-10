import AgentInfo from '@/components/AgentInfo';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { DraggablePanel } from '@lobehub/ui';
import { Button, Popconfirm } from 'antd';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';

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
  const [showAgentSidebar, activateAgent, deactivateAgent, unsubscribe] = useAgentStore((s) => [
    agentListSelectors.showSideBar(s),
    s.activateAgent,
    s.deactivateAgent,
    s.unsubscribe,
  ]);
  const [openPanel, closePanel] = useConfigStore((s) => [s.openPanel, s.closePanel]);
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));
  const createSession = useSessionStore((s) => s.createSession);

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: 280 }}
      expand={showAgentSidebar}
      maxWidth={400}
      minWidth={280}
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
            key="chat"
            onClick={() => {
              if (!currentAgent) return;
              createSession(currentAgent);
              closePanel('agent');
            }}
            type={'primary'}
          >
            加载
          </Button>,
          <Button
            key="edit"
            onClick={() => {
              if (!currentAgent) return;
              createSession(currentAgent);
              openPanel('role');
            }}
          >
            编辑
          </Button>,
          <Popconfirm
            cancelText="取消"
            description={`确定取消角色 ${currentAgent?.meta.name} 的订阅吗？`}
            key="delete"
            okText="确定"
            onConfirm={() => {
              if (!currentAgent) return;
              unsubscribe(currentAgent.agentId);
            }}
            title="取消订阅？"
          >
            <Button danger>取消订阅</Button>
          </Popconfirm>,
        ]}
        agent={currentAgent}
      />
    </DraggablePanel>
  );
};

export default memo(Header);
