import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { fetchWithProgress } from '@/utils/fetch';
import { getAudioPathByDanceId, getCameraPathByDanceId, getDancePathByDanceId } from '@/utils/file';
import { blobToDataURI } from '@/utils/imageToBase64';
import { cacheStorage } from '@/utils/storage';

export const useDownloadDance = () => {
  const [downloading, setDownloading] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const [danceProgress, setDanceProgress] = useState(0);
  const [cameraProgress, setCameraProgress] = useState(0);

  const { t } = useTranslation('common');
  const [addDanceItem] = useDanceStore((s) => [s.addDanceItem]);

  const fetchDanceData = async (dance: Dance) => {
    setDownloading(true);
    setAudioProgress(0);
    setCoverProgress(0);
    setDanceProgress(0);
    setCameraProgress(0);

    const coverPromise = fetchWithProgress(dance.cover, {
      onProgress: (loaded, total) => {
        setCoverProgress(Math.ceil((loaded / total) * 100));
      },
    }).then(blobToDataURI);

    const audioPromise = await fetchWithProgress(dance.audio, {
      onProgress: (loaded, total) => {
        setAudioProgress(Math.ceil((loaded / total) * 100));
      },
    });

    const dancePromise = fetchWithProgress(dance.src, {
      onProgress: (loaded, total) => {
        setDanceProgress(Math.ceil((loaded / total) * 100));
      },
    });

    const cameraPromise = dance.camera
      ? fetchWithProgress(dance.camera, {
          onProgress: (loaded, total) => {
            setCameraProgress(Math.ceil((loaded / total) * 100));
          },
        })
      : Promise.resolve(null);

    try {
      const [audioBlob, coverBase64, danceBlob, cameraBlob] = await Promise.all([
        audioPromise,
        coverPromise,
        dancePromise,
        cameraPromise,
      ]);

      if (danceBlob) {
        const danceKey = getDancePathByDanceId(dance.danceId);
        await cacheStorage.setItem(danceKey, danceBlob);
      }

      if (audioBlob) {
        const audioKey = getAudioPathByDanceId(dance.danceId);
        await cacheStorage.setItem(audioKey, audioBlob);
      }

      if (cameraBlob) {
        const cameraKey = getCameraPathByDanceId(dance.danceId);
        await cacheStorage.setItem(cameraKey, cameraBlob);
      }

      addDanceItem({ ...dance, cover: coverBase64 });
      message.success(dance.name + t('download.success'));
    } catch (e) {
      console.error(e);
      message.error(dance.name + t('download.failed'));
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
      camera: cameraProgress,
    },
    fetchDanceData,
  };
};
