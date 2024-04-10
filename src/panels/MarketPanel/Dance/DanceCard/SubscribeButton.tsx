import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { Button } from 'antd';

interface SubscribeButtonProps {
  dance: Dance;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [subscribe, unsubscribe, subscribed] = useDanceStore((s) => [
    s.subscribe,
    s.unsubscribe,
    danceListSelectors.subscribed(s),
  ]);

  const { dance } = props;

  const isSubscribed = subscribed(dance.danceId);

  return (
    <Button
      onClick={() => {
        if (isSubscribed) {
          unsubscribe(dance.danceId);
        } else {
          subscribe(dance);
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? '取消订阅' : '订阅'}
    </Button>
  );
};

export default SubscribeButton;
