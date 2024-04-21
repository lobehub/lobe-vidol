import { GradientButton } from '@lobehub/ui';
import { useRouter } from 'next/navigation';
import React, { memo, useContext } from 'react';

import GridList from '@/components/GridList';
import { PanelContext } from '@/panels/PanelContext';
import { useAgentStore } from '@/store/agent';

interface AgentListProps {
  className?: string;
  setTab?: (tab: string) => void;
  style?: React.CSSProperties;
}

const AgentList = (props: AgentListProps) => {
  const { className, style, setTab } = props;
  const router = useRouter();
  const isTab = useContext(PanelContext);

  const [subscribedList, activateAgent, currentIdentifier] = useAgentStore((s) => [
    s.subscribedList,
    s.activateAgent,
    s.currentIdentifier,
  ]);

  return (
    <GridList
      className={className}
      style={style}
      items={subscribedList.map((items) => ({
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
              if (isTab && setTab) {
                setTab('market');
              } else {
                router.push('/market');
              }
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
