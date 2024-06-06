import { Button, Progress, message } from 'antd';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import { useLoadAudio } from '@/hooks/useLoadAudio';
import { useLoadDance } from '@/hooks/useLoadDance';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';

interface SubscribeButtonProps {
  dance: Dance;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [addDanceItem, removeDanceItem, subscribed] = useDanceStore((s) => [
    s.addDanceItem,
    s.removeDanceItem,
    danceListSelectors.subscribed(s),
  ]);

  const { dance } = props;

  const isSubscribed = subscribed(dance.danceId);

  const { downloading: audioDownloading, percent: audioPercent, fetchAudioUrl } = useLoadAudio();
  const { downloading: danceDownloading, percent: dancePercent, fetchDanceBuffer } = useLoadDance();

  return (
    <Button
      disabled={audioDownloading || danceDownloading}
      onClick={async () => {
        if (isSubscribed) {
          removeDanceItem(dance.danceId).then(() => {
            message.success('已取消订阅');
          });
        } else {
          const audioPromise = fetchAudioUrl(dance.danceId, dance.audio);
          const dancePromise = fetchDanceBuffer(dance.danceId, dance.src);
          await Promise.all([audioPromise, dancePromise])
            .then(() => {
              addDanceItem(dance);
              message.success('订阅成功');
            })
            .catch(() => {
              message.error('下载文件失败');
            });
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? (
        '取消订阅'
      ) : (
        <Flexbox align={'center'} horizontal gap={8}>
          下载订阅{' '}
          {audioDownloading || danceDownloading ? (
            <Progress type="circle" percent={(dancePercent + audioPercent) / 2} size={[20, 20]} />
          ) : null}
        </Flexbox>
      )}
    </Button>
  );
};

export default SubscribeButton;
