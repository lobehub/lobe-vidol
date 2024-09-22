import { isArrayBuffer } from 'lodash-es';
import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getAudioPathByDanceId } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

export const useLoadAudio = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchAudioUrl = async (danceId: string, audioUrl: string) => {
    const localAudioPath = getAudioPathByDanceId(danceId);
    let audioBlob = await cacheStorage.getItem(localAudioPath);
    // 存量转换
    if (audioBlob && isArrayBuffer(audioBlob)) {
      // 如果存的是 ArrayBuffer，设置为空重新下载;
      audioBlob = null;
    }

    try {
      if (!audioBlob) {
        setDownloading(true);
        setPercent(0);

        audioBlob = await fetchWithProgress(audioUrl, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        });
        await cacheStorage.setItem(localAudioPath, audioBlob);
      }
    } finally {
      setDownloading(false);
    }
    if (!audioBlob) return null;

    return URL.createObjectURL(audioBlob);
  };

  return {
    downloading,
    percent,
    fetchAudioUrl,
  };
};
