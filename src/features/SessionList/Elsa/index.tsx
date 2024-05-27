import { Space, Tag } from 'antd';
import { memo } from 'react';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';

import ListItem from '../ListItem';

const Elsa = memo(() => {
  const [activeId, switchSession] = useSessionStore((s) => [s.activeId, s.switchSession]);
  const defaultAgent = useAgentStore((s) => s.defaultAgent);

  return (
    <ListItem
      onClick={() => {
        switchSession(LOBE_VIDOL_DEFAULT_AGENT_ID);
      }}
      active={activeId === LOBE_VIDOL_DEFAULT_AGENT_ID}
      avatar={defaultAgent.meta.avatar}
      title={
        <Space align={'center'}>
          {defaultAgent.meta.name}
          <Tag color="geekblue">默认助手</Tag>
        </Space>
      }
      description={defaultAgent.greeting || defaultAgent.meta.description || ''}
    />
  );
});

export default Elsa;
