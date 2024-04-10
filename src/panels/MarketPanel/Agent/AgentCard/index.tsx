import AgentInfo from '@/components/AgentInfo';
import { marketStoreSelectors, useMarketStore } from '@/store/market';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';
import DownloadButton from './SubscribeButton';

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
  const [showAgentSidebar, activateAgent, deactivateAgent, currentAgentItem] = useMarketStore(
    (s) => [
      marketStoreSelectors.showAgentSideBar(s),
      s.activateAgent,
      s.deactivateAgent,
      marketStoreSelectors.currentAgentItem(s),
    ],
  );

  const actions = [];
  if (currentAgentItem) {
    actions.push(<DownloadButton agent={currentAgentItem} key="download" />);
  }

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
          setTempId(useMarketStore.getState().currentAgentId);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
      placement={'right'}
    >
      <AgentInfo actions={actions} agent={currentAgentItem} />
    </DraggablePanel>
  );
};

export default memo(Header);
