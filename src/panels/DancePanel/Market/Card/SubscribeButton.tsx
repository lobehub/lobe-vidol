import { Button, Progress, message } from 'antd';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { fetchWithProgress } from '@/utils/fetch';
import { getAudioPathByDanceId, getDancePathByDanceId } from '@/utils/file';
import { setItem } from '@/utils/storage';

interface SubscribeButtonProps {
  dance: Dance;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [downloading, setDownloading] = React.useState(false);
  const [audioPercent, setAudioPercent] = React.useState(0);
  const [dancePercent, setDancePercent] = React.useState(0);
  const [addDanceItem, removeDanceItem, subscribed] = useDanceStore((s) => [
    s.addDanceItem,
    s.removeDanceItem,
    danceListSelectors.subscribed(s),
  ]);

  const { dance } = props;

  const isSubscribed = subscribed(dance.danceId);

  return (
    <Button
      disabled={downloading}
      onClick={async () => {
        if (isSubscribed) {
          removeDanceItem(dance.danceId).then(() => {
            message.success('已取消订阅');
          });
        } else {
          setDownloading(true);
          setAudioPercent(0);
          setDancePercent(0);
          try {
            const danceFetchPromise = fetchWithProgress(dance.src!, {
              onProgress: (loaded, total) => {
                setDancePercent((loaded / total) * 100);
              },
            });
            const audioFetchPromise = fetchWithProgress(dance.audio!, {
              onProgress: (loaded, total) => {
                setAudioPercent((loaded / total) * 100);
              },
            });
            const [danceBlob, audioBlob] = await Promise.all([
              danceFetchPromise,
              audioFetchPromise,
            ]);

            const danceArrayBuffer = await danceBlob.arrayBuffer();
            const dancePath = getDancePathByDanceId(dance.danceId);
            await setItem(dancePath, danceArrayBuffer);

            const audioPath = getAudioPathByDanceId(dance.danceId);
            await setItem(audioPath, audioBlob);
          } catch (e) {
            console.error(e);
            message.error('下载失败');
          } finally {
            setDownloading(false);
            setAudioPercent(0);
            setDancePercent(0);
          }
          addDanceItem(dance);
          message.success('订阅成功');
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? (
        '取消订阅'
      ) : (
        <Flexbox align={'center'} horizontal gap={8}>
          下载订阅{' '}
          {downloading ? (
            <Progress type="circle" percent={(dancePercent + audioPercent) / 2} size={[20, 20]} />
          ) : null}
        </Flexbox>
      )}
    </Button>
  );
};

export default SubscribeButton;
