import { DraggablePanel } from '@lobehub/ui';
import { Skeleton, Space } from 'antd';
import dynamic from 'next/dynamic';
import React, { memo, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
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

interface ChatInfoProps {
  mobile?: boolean;
}

const ChatInfo = memo(({ mobile }: ChatInfoProps) => {
  const [showAgentInfo, setShowAgentInfo] = useGlobalStore((s) => [
    s.showAgentInfo,
    s.setShowAgentInfo,
  ]);

  useEffect(() => {
    if (mobile && showAgentInfo) {
      setShowAgentInfo(false);
    }
  }, [mobile]);

  const handleExpandChange = (expand: boolean) => {
    if (!mobile) {
      setShowAgentInfo(expand);
    }
  };

  return (
    <DraggablePanel
      defaultSize={{ width: SIDEBAR_WIDTH }}
      minWidth={SIDEBAR_WIDTH}
      maxWidth={SIDEBAR_MAX_WIDTH}
      mode={'fixed'}
      placement={'right'}
      onExpandChange={handleExpandChange}
      expand={showAgentInfo}
    >
      <AgentDetail />
    </DraggablePanel>
  );
});

export default memo(ChatInfo);
