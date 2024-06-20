import { Button, Popover, Progress, Space, message } from 'antd';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useDownloadAgent } from '@/hooks/useDownloadAgent';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

interface SubscribeButtonProps {
  agent: Agent;
}

const SubscribeButton = memo((props: SubscribeButtonProps) => {
  const [removeLocalAgent, subscribed] = useAgentStore((s) => [
    s.removeLocalAgent,
    agentSelectors.subscribed(s),
  ]);

  const { fetchAgentData, percent, downloading } = useDownloadAgent();

  const { agent } = props;

  const isSubscribed = subscribed(agent.agentId);

  return (
    <Popover
      open={downloading}
      title={
        <Flexbox>
          <Space>
            <Progress steps={30} percent={percent.cover} size="small" />
            <span>下载封面</span>
          </Space>
          <Space>
            <Progress steps={30} percent={percent.avatar} size="small" />
            <span>下载头像</span>
          </Space>
          <Space>
            <Progress steps={30} percent={percent.model} size="small" />
            <span>下载模型</span>
          </Space>
        </Flexbox>
      }
    >
      <Button
        key={'subscribe'}
        disabled={downloading}
        onClick={async () => {
          if (isSubscribed) {
            removeLocalAgent(agent.agentId).then(() => {
              message.success('已取消订阅');
            });
          } else {
            await fetchAgentData(agent);
          }
        }}
        type={isSubscribed ? 'default' : 'primary'}
      >
        {isSubscribed ? '取消订阅' : '下载订阅'}
      </Button>
    </Popover>
  );
});

export default SubscribeButton;
