import { Button, message } from 'antd';

import { agentListSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

interface SubscribeButtonProps {
  agent: Agent;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [subscribe, unsubscribe, subscribed] = useAgentStore((s) => [
    s.subscribe,
    s.unsubscribe,
    agentListSelectors.subscribed(s),
  ]);

  const { agent } = props;

  const isSubscribed = subscribed(agent.agentId);

  return (
    <Button
      onClick={() => {
        if (isSubscribed) {
          unsubscribe(agent.agentId);
          message.success('已取消订阅');
        } else {
          subscribe(agent);
          message.success('订阅成功，请查看订阅列表');
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? '取消订阅' : '订阅'}
    </Button>
  );
};

export default SubscribeButton;
