import { agentListSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { Button } from 'antd';

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
        } else {
          subscribe(agent);
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? '取消订阅' : '订阅'}
    </Button>
  );
};

export default SubscribeButton;
