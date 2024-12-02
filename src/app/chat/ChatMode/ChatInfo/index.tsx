import { DraggablePanel, DraggablePanelContainer } from '@lobehub/ui';
import { Skeleton, Space } from 'antd';
import { createStyles, useResponsive } from 'antd-style';
import isEqual from 'lodash-es/isEqual';
import dynamic from 'next/dynamic';
import { rgba } from 'polished';
import React, { memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { SIDEBAR_WIDTH } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

const AgentDetail = dynamic(() => import('./AgentDetail'), {
  ssr: false,
  loading: () => (
    <Flexbox style={{ padding: 12 }} gap={16} align={'center'} justify={'center'}>
      <Skeleton.Avatar active shape="circle" size={96} />
      <Skeleton.Input active size="small" />
      <Skeleton active paragraph={{ rows: 2, width: '100%' }} title={false} />
      <Space>
        <Skeleton.Button active />
        <Skeleton.Button active />
      </Space>
      <Skeleton active paragraph={{ rows: 3, width: '100%' }} title={false} />
    </Flexbox>
  ),
});

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  drawer: css`
    z-index: 10;
    background-color: ${rgba(token.colorBgLayout, 0.2)};
    backdrop-filter: saturate(180%) blur(8px);
  `,
}));

const ChatInfo = memo(() => {
  const { styles } = useStyles();
  const { md = true, lg = true } = useResponsive();

  const [showAgentInfo, setShowAgentInfo] = useGlobalStore((s) => [
    s.showAgentInfo,
    s.setShowAgentInfo,
  ]);

  const [cacheExpand, setCacheExpand] = useState<boolean>(Boolean(showAgentInfo));

  const handleExpand = (expand: boolean) => {
    if (isEqual(expand, Boolean(showAgentInfo))) return;
    setShowAgentInfo(expand);
    setCacheExpand(expand);
  };

  useEffect(() => {
    if (lg && cacheExpand) setShowAgentInfo(true);
    if (!lg) setShowAgentInfo(false);
  }, [lg, cacheExpand]);

  return (
    <DraggablePanel
      className={styles.drawer}
      classNames={{
        content: styles.content,
      }}
      minWidth={SIDEBAR_WIDTH}
      mode={md ? 'fixed' : 'float'}
      placement={'right'}
      onExpandChange={handleExpand}
      expand={showAgentInfo}
    >
      <DraggablePanelContainer
        style={{
          flex: 'none',
          height: '100%',
          maxHeight: '100vh',
          minWidth: SIDEBAR_WIDTH,
        }}
      >
        <AgentDetail />
      </DraggablePanelContainer>
    </DraggablePanel>
  );
});

export default memo(ChatInfo);
