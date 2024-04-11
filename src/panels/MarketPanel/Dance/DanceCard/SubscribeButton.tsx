import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { Button, message } from 'antd';

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
          message.success('已取消订阅');
        } else {
          subscribe(dance);
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
