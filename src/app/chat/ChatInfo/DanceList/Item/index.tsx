import { Avatar, Icon } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Progress, Typography } from 'antd';
import { Pause, Play } from 'lucide-react';
import React, { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ListItem from '@/components/ListItem';
import { useLoadAudio } from '@/hooks/useLoadAudio';
import { useLoadSrc } from '@/hooks/useLoadSrc';
import { useDanceStore } from '@/store/dance';
import { useGlobalStore } from '@/store/global';
import { Dance } from '@/types/dance';

import Actions from './Actions';
import { useStyles } from './style';

const { Text } = Typography;

interface DanceItemProps {
  danceItem: Dance;
}

const DanceItem = (props: DanceItemProps) => {
  const { danceItem } = props;
  const [open, setOpen] = useState(false);

  const { styles } = useStyles();
  const [currentPlayId, currentIdentifier, activateDance, setCurrentPlayId] = useDanceStore((s) => [
    s.currentPlayId,
    s.currentIdentifier,
    s.activateDance,
    s.setCurrentPlayId,
  ]);

  const [isPlaying, setIsPlaying] = useState(false);

  const isCurrentPlay = currentPlayId ? currentPlayId === danceItem.danceId : false;
  const isSelected = currentIdentifier === danceItem.danceId;
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);
  const { t } = useTranslation('dance');

  const { downloading: audioDownloading, percent: audioPercent, fetchAudioUrl } = useLoadAudio();
  const { downloading: srcDownloading, percent: srcPercent, fetchSrcUrl } = useLoadSrc();
  const viewer = useGlobalStore((s) => s.viewer);

  const handlePlayPause = async () => {
    if (isPlaying && isCurrentPlay) {
      setIsPlaying(false);
      viewer?.resetToIdle();
    } else {
      setCurrentPlayId(danceItem.danceId);
      setIsPlaying(true);
      const audioPromise = fetchAudioUrl(danceItem.danceId, danceItem.audio);
      const srcPromise = fetchSrcUrl(danceItem.danceId, danceItem.src);
      const [srcUrl, audioUrl] = await Promise.all([srcPromise, audioPromise]);
      if (srcUrl && audioUrl)
        viewer?.dance(srcUrl, audioUrl, () => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <ListItem
      ref={hoverRef}
      showAction={isHovered || open || audioDownloading || srcDownloading}
      actions={[
        audioDownloading || srcDownloading ? (
          <Progress
            key={`progress-${danceItem.danceId}`}
            type="circle"
            className={styles.progress}
            percent={Math.ceil((srcPercent + audioPercent) / 2)}
            size={[32, 32]}
          />
        ) : null,
        <Actions danceItem={danceItem} setOpen={setOpen} key={`actions-${danceItem.danceId}`} />,
      ]}
      onClick={() => {
        activateDance(danceItem.danceId);
      }}
      onDoubleClick={handlePlayPause}
      className={styles.listItem}
      avatar={
        <div style={{ position: 'relative' }}>
          <Avatar src={danceItem?.thumb} shape={'square'} size={48} />
          {isHovered || isCurrentPlay ? (
            <div className={styles.mask} onClick={handlePlayPause}>
              <Icon
                icon={isCurrentPlay && isPlaying ? Pause : Play}
                title={isCurrentPlay && isPlaying ? t('actions.pause') : t('actions.play')}
                className={styles.playIcon}
              />
            </div>
          ) : null}
        </div>
      }
      title={danceItem?.name}
      description={
        <Text type="secondary" ellipsis={{ tooltip: true }}>
          {danceItem?.author}
        </Text>
      }
      active={isSelected || isHovered}
    />
  );
};

export default memo(DanceItem);
