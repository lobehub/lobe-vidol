import { DraggablePanel } from '@lobehub/ui';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import { useRouter } from 'next/navigation';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Author from '@/components/Author';
import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import SubscribeButton from '@/features/MarketInfo/SubscribeButton';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { marketStoreSelectors, useMarketStore } from '@/store/market';
import { useSessionStore } from '@/store/session';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    overflow: auto;
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
  const router = useRouter();
  const { t } = useTranslation('chat');
  const [tempId, setTempId] = useState<string>('');
  const [showAgentSidebar, activateAgent, deactivateAgent, currentAgentItem] = useMarketStore(
    (s) => [
      marketStoreSelectors.showAgentSideBar(s),
      s.activateAgent,
      s.deactivateAgent,
      marketStoreSelectors.currentAgentItem(s),
    ],
  );
  const [closePanel] = useGlobalStore((s) => [s.closePanel]);
  const [subscribed] = useAgentStore((s) => [agentSelectors.subscribed(s)]);

  const createSession = useSessionStore((s) => s.createSession);

  const actions = [];
  if (currentAgentItem) {
    const isSubscribed = subscribed(currentAgentItem.agentId);

    if (isSubscribed) {
      actions.push(
        <Button
          key="chat"
          onClick={() => {
            createSession(currentAgentItem);
            router.push('/chat');
            closePanel('market');
          }}
          type={'primary'}
        >
          {t('chat')}
        </Button>,
      );
    }

    actions.push(
      <SubscribeButton agent={currentAgentItem} key={`${currentAgentItem.agentId}-subscribe`} />,
    );
  }

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: SIDEBAR_WIDTH }}
      expand={showAgentSidebar}
      minWidth={SIDEBAR_WIDTH}
      maxWidth={SIDEBAR_MAX_WIDTH}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useMarketStore.getState().currentAgentId);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
      placement={'right'}
    >
      <AgentCard
        actions={actions}
        agent={currentAgentItem}
        extra={
          <Author
            author={currentAgentItem?.author}
            homepage={currentAgentItem?.homepage}
            createAt={currentAgentItem?.createAt}
          />
        }
        footer={<SystemRole systemRole={currentAgentItem?.meta.readme} style={{ marginTop: 16 }} />}
      />
    </DraggablePanel>
  );
};

export default memo(Header);
