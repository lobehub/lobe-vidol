import { Space, Tag } from 'antd';
import { memo } from 'react';

import { DEFAULT_VIDOL_AGENT, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { sessionSelectors, useSessionStore } from '@/store/session';

import ListItem from '../ListItem';

const V = memo(() => {
  const [activeId, switchSession] = useSessionStore((s) => [s.activeId, s.switchSession]);
  const [getLastMessageByAgentId] = useSessionStore((s) => [
    sessionSelectors.getLastMessageByAgentId(s),
  ]);

  const lastMessage = getLastMessageByAgentId(LOBE_VIDOL_DEFAULT_AGENT_ID);

  return (
    <ListItem
      onClick={() => {
        switchSession(LOBE_VIDOL_DEFAULT_AGENT_ID);
      }}
      active={activeId === LOBE_VIDOL_DEFAULT_AGENT_ID}
      avatar={DEFAULT_VIDOL_AGENT.meta.avatar}
      title={
        <Space align={'center'}>
          {DEFAULT_VIDOL_AGENT.meta.name}
          <Tag color="geekblue">官方助手</Tag>
        </Space>
      }
      description={lastMessage?.content || DEFAULT_VIDOL_AGENT.greeting || ''}
    />
  );
});

export default V;
