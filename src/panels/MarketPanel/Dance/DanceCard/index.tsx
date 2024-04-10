import DanceInfo from '@/components/DanceInfo';
import { marketStoreSelectors, useMarketStore } from '@/store/market';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';
import SubscribeButton from './SubscribeButton';

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
  const [showDanceSidebar, activateDance, deactivateDance, currentDanceItem] = useMarketStore(
    (s) => [
      marketStoreSelectors.showDanceSideBar(s),
      s.activateDance,
      s.deactivateDance,
      marketStoreSelectors.currentDanceItem(s),
    ],
  );

  const actions = [];
  if (currentDanceItem) {
    actions.push(<SubscribeButton dance={currentDanceItem} key="download" />);
  }

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: 280 }}
      expand={showDanceSidebar}
      maxWidth={400}
      minWidth={280}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useMarketStore.getState().currentDanceId);
          deactivateDance();
        } else if (tempId) {
          activateDance(tempId);
        }
      }}
      placement={'right'}
    >
      <DanceInfo actions={actions} dance={currentDanceItem} />
    </DraggablePanel>
  );
};

export default memo(Header);
