import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React, { memo, useState } from 'react';

import Author from '@/components/Author';
import DanceInfo from '@/components/DanceInfo';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import SubscribeButton from '@/panels/DancePanel/Market/Card/SubscribeButton';
import UnSubscribeButton from '@/panels/DancePanel/Market/Card/UnSubscribeButton';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { marketStoreSelectors, useMarketStore } from '@/store/market';

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

  const [subscribed] = useDanceStore((s) => [danceListSelectors.subscribed(s)]);

  const actions = [];
  if (currentDanceItem) {
    const isSubscribed = subscribed(currentDanceItem.danceId);

    if (isSubscribed) {
      actions.push(
        <UnSubscribeButton
          dance={currentDanceItem}
          key={`${currentDanceItem.danceId}-unsubscribe`}
        />,
      );
    } else {
      actions.push(
        <SubscribeButton dance={currentDanceItem} key={`${currentDanceItem.danceId}-subscribe`} />,
      );
    }
  }

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: SIDEBAR_WIDTH }}
      expand={showDanceSidebar}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
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
      <DanceInfo
        actions={actions}
        dance={currentDanceItem}
        extra={
          <Author
            homepage={currentDanceItem?.homepage}
            author={currentDanceItem?.author}
            createAt={currentDanceItem?.createAt}
          />
        }
      />
    </DraggablePanel>
  );
};

export default memo(Header);
