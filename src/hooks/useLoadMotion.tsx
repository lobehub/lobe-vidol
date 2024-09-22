import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getMotionPathByMotionId } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

export const useLoadMotion = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchMotionUrl = async (motionId: string, motionUrl: string) => {
    const localMotionPath = getMotionPathByMotionId(motionId);
    let motionBlob = await cacheStorage.getItem(localMotionPath);

    try {
      if (!motionBlob) {
        setDownloading(true);
        setPercent(0);

        motionBlob = await fetchWithProgress(motionUrl, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        });
        await cacheStorage.setItem(localMotionPath, motionBlob);
      }
    } finally {
      setDownloading(false);
    }

    if (!motionBlob) return null;

    return URL.createObjectURL(motionBlob);
  };

  return {
    downloading,
    percent,
    fetchMotionUrl,
  };
};
