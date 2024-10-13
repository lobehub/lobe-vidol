import { Avatar, Icon } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Progress, Tooltip, Typography, message } from 'antd';
import { LoaderCircle, Play } from 'lucide-react';
import React, { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ListItem from '@/components/ListItem';
import { useLoadAudio } from '@/hooks/useLoadAudio';
import { useLoadCamera } from '@/hooks/useLoadCamera';
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
  const [currentIdentifier, activateDance, setCurrentPlayId] = useDanceStore((s) => [
    s.currentIdentifier,
    s.activateDance,
    s.setCurrentPlayId,
  ]);

  const isSelected = currentIdentifier === danceItem.danceId;
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);
  const { t } = useTranslation('dance');
  const [danceLoading, setDanceLoading] = useState(false);

  const { downloading: audioDownloading, percent: audioPercent, fetchAudioUrl } = useLoadAudio();
  const { downloading: srcDownloading, percent: srcPercent, fetchSrcUrl } = useLoadSrc();
  const {
    downloading: cameraDownloading,
    percent: cameraPercent,
    fetchCameraUrl,
  } = useLoadCamera();
  const viewer = useGlobalStore((s) => s.viewer);

  const handlePlayDance = async () => {
    setCurrentPlayId(danceItem.danceId);
    const audioPromise = fetchAudioUrl(danceItem.danceId, danceItem.audio);
    const srcPromise = fetchSrcUrl(danceItem.danceId, danceItem.src);
    const cameraPromise = danceItem.camera
      ? fetchCameraUrl(danceItem.danceId, danceItem.camera)
      : undefined;
    const [srcUrl, audioUrl, cameraUrl] = await Promise.all([
      srcPromise,
      audioPromise,
      cameraPromise,
    ]);
    if (srcUrl && audioUrl) {
      setDanceLoading(true);
      try {
        await viewer?.dance(srcUrl, audioUrl, cameraUrl);
      } catch (error) {
        message.error(t('dancePlayError', { ns: 'error' }));
        console.error('error', error);
      } finally {
        setDanceLoading(false);
      }
    }
  };

  return (
    <ListItem
      ref={hoverRef}
      showAction={isHovered || open || audioDownloading || srcDownloading || cameraDownloading}
      actions={[
        audioDownloading ? (
          <Tooltip title={t('download.audio')}>
            <Progress
              key={`progress-${danceItem.danceId}`}
              type="circle"
              className={styles.progress}
              percent={Math.ceil(audioPercent)}
              size={[32, 32]}
            />
          </Tooltip>
        ) : null,
        srcDownloading ? (
          <Tooltip title={t('download.src')}>
            <Progress
              key={`progress-${danceItem.danceId}`}
              type="circle"
              className={styles.progress}
              percent={Math.ceil(srcPercent)}
              size={[32, 32]}
            />
          </Tooltip>
        ) : null,
        cameraDownloading ? (
          <Tooltip title={t('download.camera')}>
            <Progress
              key={`progress-${danceItem.danceId}`}
              type="circle"
              className={styles.progress}
              percent={Math.ceil(cameraPercent)}
              size={[32, 32]}
            />
          </Tooltip>
        ) : null,
        <Actions danceItem={danceItem} setOpen={setOpen} key={`actions-${danceItem.danceId}`} />,
      ]}
      onClick={() => {
        activateDance(danceItem.danceId);
      }}
      onDoubleClick={handlePlayDance}
      className={styles.listItem}
      avatar={
        <div style={{ position: 'relative' }}>
          <Avatar src={danceItem?.thumb} shape={'square'} size={48} />
          {isHovered || danceLoading ? (
            <div className={styles.mask} onClick={handlePlayDance}>
              <Icon
                icon={danceLoading ? LoaderCircle : Play}
                title={t('actions.play')}
                className={styles.playIcon}
                spin={danceLoading}
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
