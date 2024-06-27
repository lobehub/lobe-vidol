import { Button, Progress, message } from 'antd';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import { useDownloadDance } from '@/hooks/useDownloadDance';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';

interface SubscribeButtonProps {
  dance: Dance;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [removeDanceItem, subscribed] = useDanceStore((s) => [
    s.removeDanceItem,
    danceListSelectors.subscribed(s),
  ]);

  const { dance } = props;

  const isSubscribed = subscribed(dance.danceId);

  const { downloading, percent, fetchDanceData } = useDownloadDance();

  return (
    <Button
      disabled={downloading}
      onClick={async () => {
        if (isSubscribed) {
          removeDanceItem(dance.danceId).then(() => {
            message.success('已取消订阅');
          });
        } else {
          await fetchDanceData(dance);
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? (
        '取消订阅'
      ) : (
        <Flexbox align={'center'} horizontal gap={8}>
          下载订阅
          {downloading ? (
            <Progress
              type="circle"
              percent={(percent.dance + percent.cover + percent.audio) / 3}
              size={[20, 20]}
            />
          ) : null}
        </Flexbox>
      )}
    </Button>
  );
};

export default SubscribeButton;
