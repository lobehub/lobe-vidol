import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { fetchWithProgress } from '@/utils/fetch';
import { getAudioPathByDanceId, getDancePathByDanceId } from '@/utils/file';
import { blobToDataURI } from '@/utils/imageToBase64';
import { setItem } from '@/utils/storage';

export const useDownloadDance = () => {
  const [downloading, setDownloading] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const [danceProgress, setDanceProgress] = useState(0);

  const { t } = useTranslation('common');
  const [addDanceItem] = useDanceStore((s) => [s.addDanceItem]);
  const fetchDanceData = async (dance: Dance) => {
    setDownloading(true);
    setAudioProgress(0);
    setCoverProgress(0);
    setDanceProgress(0);

    const coverPromise = fetchWithProgress(dance.cover, {
      onProgress: (loaded, total) => {
        setCoverProgress(Math.ceil((loaded / total) * 100));
      },
    }).then(blobToDataURI);

    const audioPromise = await fetchWithProgress(dance.audio, {
      onProgress: (loaded, total) => {
        setAudioProgress((loaded / total) * 100);
      },
    });

    const dancePromise = fetchWithProgress(dance.src, {
      onProgress: (loaded, total) => {
        setDanceProgress(Math.ceil((loaded / total) * 100));
      },
    }).then((res) => res.arrayBuffer());

    try {
      const [audioBlob, coverBase64, danceArrayBuffer] = await Promise.all([
        audioPromise,
        coverPromise,
        dancePromise,
      ]);
      const danceKey = getDancePathByDanceId(dance.danceId);
      await setItem(danceKey, danceArrayBuffer);

      const audioKey = getAudioPathByDanceId(dance.danceId);
      await setItem(audioKey, audioBlob);

      addDanceItem({ ...dance, cover: coverBase64 });
      message.success(dance.name + t('actions.downloadSuccess'));
    } catch (e) {
      console.error(e);
      message.error(dance.name + t('actions.downloadFailed'));
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloading,
    percent: {
      audio: audioProgress,
      cover: coverProgress,
      dance: danceProgress,
    },
    fetchDanceData,
  };
};
