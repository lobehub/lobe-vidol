import { isArrayBuffer } from 'lodash-es';
import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getDancePathByDanceId } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

export const useLoadDance = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchDanceUrl = async (danceId: string, src: string) => {
    const localDancePath = getDancePathByDanceId(danceId);
    let danceBlob = await cacheStorage.getItem(localDancePath);

    // 存量转换
    if (danceBlob && isArrayBuffer(danceBlob)) {
      // 如果存的是 ArrayBuffer，设置为空重新下载;
      danceBlob = null;
    }

    try {
      if (!danceBlob) {
        setDownloading(true);
        setPercent(0);

        danceBlob = await fetchWithProgress(src, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        });
        await cacheStorage.setItem(localDancePath, danceBlob);
      }
    } finally {
      setDownloading(false);
    }

    if (!danceBlob) return null;

    return URL.createObjectURL(danceBlob);
  };

  return {
    downloading,
    percent,
    fetchDanceUrl,
  };
};
