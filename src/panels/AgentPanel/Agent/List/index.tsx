import { GradientButton } from '@lobehub/ui';
import { useRouter } from 'next/navigation';
import React, { memo } from 'react';

import GridList from '@/components/GridList';
import { useAgentStore } from '@/store/agent';

interface AgentListProps {
  className?: string;
  style?: React.CSSProperties;
}

const AgentList = (props: AgentListProps) => {
  const { className, style } = props;
  const router = useRouter();

  const [localAgentList, activateAgent, currentIdentifier] = useAgentStore((s) => [
    s.localAgentList,
    s.activateAgent,
    s.currentIdentifier,
  ]);

  return (
    <GridList
      className={className}
      style={style}
      items={localAgentList.map((items) => ({
        avatar: items.meta.avatar,
        id: items.agentId,
        name: items.meta.name,
      }))}
      onClick={(id) => {
        activateAgent(id);
      }}
      isActivated={(id) => id === currentIdentifier}
      empty={{
        actions: [
          <GradientButton
            key="subscribe"
            glow
            size={'middle'}
            onClick={() => {
              router.push('/market');
            }}
          >
            + 订阅角色
          </GradientButton>,
        ],
      }}
    />
  );
};

export default memo(AgentList);
