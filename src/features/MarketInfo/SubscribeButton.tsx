import { Button, Progress, message } from 'antd';
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
      {isSubscribed ? (
        '取消订阅'
      ) : (
        <Flexbox align={'center'} horizontal gap={8}>
          下载订阅{' '}
          {downloading ? <Progress type="circle" percent={percent} size={[20, 20]} /> : null}
        </Flexbox>
      )}
    </Button>
  );
});

export default SubscribeButton;
