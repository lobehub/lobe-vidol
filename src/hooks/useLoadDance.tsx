import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getDancePathByDanceId } from '@/utils/file';
import storage from '@/utils/storage';

export const useLoadDance = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchDanceBuffer = async (danceId: string, src: string) => {
    const localDancePath = getDancePathByDanceId(danceId);
    let danceBuffer = (await storage.getItem(localDancePath)) as ArrayBuffer;

    try {
      if (!danceBuffer) {
        setDownloading(true);
        setPercent(0);

        danceBuffer = await fetchWithProgress(src, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        }).then((res) => res.arrayBuffer());
        await storage.setItem(localDancePath, danceBuffer);
      }
    } finally {
      setDownloading(false);
    }
    return danceBuffer;
  };

  return {
    downloading,
    percent,
    fetchDanceBuffer,
  };
};
