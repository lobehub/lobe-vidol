import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getCameraPathByDanceId } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

export const useLoadCamera = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchCameraUrl = async (danceId: string, camera: string) => {
    const localCameraPath = getCameraPathByDanceId(danceId);
    let cameraBlob = await cacheStorage.getItem(localCameraPath);

    try {
      if (!cameraBlob) {
        setDownloading(true);
        setPercent(0);

        cameraBlob = await fetchWithProgress(camera, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        });
        await cacheStorage.setItem(localCameraPath, cameraBlob);
      }
    } finally {
      setDownloading(false);
    }

    if (!cameraBlob) return undefined;

    return URL.createObjectURL(cameraBlob);
  };

  return {
    downloading,
    percent,
    fetchCameraUrl: fetchCameraUrl,
  };
};
