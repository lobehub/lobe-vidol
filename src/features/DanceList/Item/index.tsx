import { Avatar } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Progress, Typography } from 'antd';
import React, { memo, useRef, useState } from 'react';

import ListItem from '@/components/ListItem';
import Actions from '@/features/DanceList/Item/Actions';
import { useLoadAudio } from '@/hooks/useLoadAudio';
import { useLoadDance } from '@/hooks/useLoadDance';
import { useDanceStore } from '@/store/dance';
import { useGlobalStore } from '@/store/global';
import { Dance } from '@/types/dance';

import { useStyles } from './style';

const { Text } = Typography;

interface DanceItemProps {
  danceItem: Dance;
}

const DanceItem = (props: DanceItemProps) => {
  const { danceItem } = props;
  const [open, setOpen] = useState(false);

  const { styles } = useStyles();
  const [currentPlayId, setCurrentPlayId] = useDanceStore((s) => [
    s.currentPlayId,
    s.setCurrentPlayId,
  ]);

  const isCurrentPlay = currentPlayId ? currentPlayId === danceItem.danceId : false;
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  const { downloading: audioDownloading, percent: audioPercent, fetchAudioBuffer } = useLoadAudio();
  const { downloading: danceDownloading, percent: dancePercent, fetchDanceBuffer } = useLoadDance();
  const viewer = useGlobalStore((s) => s.viewer);

  const handlePlayPause = () => {
    const audioPromise = fetchAudioBuffer(danceItem.danceId, danceItem.audio);
    const dancePromise = fetchDanceBuffer(danceItem.danceId, danceItem.src);
    Promise.all([dancePromise, audioPromise]).then((res) => {
      if (!res) return;
      const [danceBuffer, audioBuffer] = res;
      viewer.model?.dance(danceBuffer, audioBuffer);
    });
    setCurrentPlayId(danceItem.danceId);
  };

  return (
    <ListItem
      ref={hoverRef}
      showAction={isHovered || open || audioDownloading || danceDownloading}
      actions={[
        audioDownloading || danceDownloading ? (
          <Progress
            key={`progress-${danceItem.danceId}`}
            type="circle"
            className={styles.progress}
            percent={Math.ceil((dancePercent + audioPercent) / 2)}
            size={[32, 32]}
          />
        ) : null,
        <Actions danceItem={danceItem} setOpen={setOpen} key={`actions-${danceItem.danceId}`} />,
      ]}
      onClick={handlePlayPause}
      className={styles.listItem}
      avatar={
        <div style={{ position: 'relative' }}>
          <Avatar src={danceItem?.thumb} shape={'square'} size={48} />
        </div>
      }
      title={danceItem?.name}
      description={
        <Text type="secondary" ellipsis={{ tooltip: true }}>
          {danceItem?.author}
        </Text>
      }
      active={isCurrentPlay || isHovered}
    />
  );
};

export default memo(DanceItem);
