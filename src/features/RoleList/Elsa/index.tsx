import { Space, Tag } from 'antd';
import { memo } from 'react';

import { DEFAULT_VIDOL_AGENT, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { useAgentStore } from '@/store/agent';

import ListItem from '../ListItem';

const V = memo(() => {
  const [activeId, activateAgent] = useAgentStore((s) => [s.currentIdentifier, s.activateAgent]);

  return (
    <ListItem
      onClick={() => {
        activateAgent(LOBE_VIDOL_DEFAULT_AGENT_ID);
      }}
      active={activeId === LOBE_VIDOL_DEFAULT_AGENT_ID}
      avatar={DEFAULT_VIDOL_AGENT.meta.avatar}
      title={
        <Space align={'center'}>
          {DEFAULT_VIDOL_AGENT.meta.name}
          <Tag color="geekblue">官方助手</Tag>
        </Space>
      }
      description={DEFAULT_VIDOL_AGENT.meta.description}
    />
  );
});

export default V;
