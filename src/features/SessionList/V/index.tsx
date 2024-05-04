import { Space, Tag } from 'antd';
import { memo } from 'react';

import { DEFAULT_AGENT, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { useSessionStore } from '@/store/session';

import ListItem from '../ListItem';

const V = memo(() => {
  const [activeId, switchSession] = useSessionStore((s) => [s.activeId, s.switchSession]);

  return (
    <ListItem
      onClick={() => {
        switchSession(LOBE_VIDOL_DEFAULT_AGENT_ID);
      }}
      active={activeId === LOBE_VIDOL_DEFAULT_AGENT_ID}
      avatar={DEFAULT_AGENT.meta.avatar}
      title={
        <Space align={'center'}>
          {DEFAULT_AGENT.meta.name}
          <Tag color="geekblue">官方助手</Tag>
        </Space>
      }
      description={DEFAULT_AGENT.meta.description}
    />
  );
});

export default V;
