import { message } from 'antd';
import { useState } from 'react';

import { backgroundOptions } from '@/constants/background';
import { fetchWithProgress } from '@/utils/fetch';
import { getBackgroundPathById } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

const getBackgroundUrlById = (backgroundId: string) => {
  const background = backgroundOptions.find((item) => item.id === backgroundId);
  return background
    ? `https://r2.vidol.chat/backgrounds/${encodeURIComponent(background.url)}`
    : undefined;
};

const getBackgroundThumbById = (backgroundId: string) => {
  const background = backgroundOptions.find((item) => item.id === backgroundId);
  return background
    ? `https://r2.vidol.chat/backgrounds/${encodeURIComponent(background.thumbnail)}`
    : undefined;
};

export const useLoadBackground = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchBackgroundUrl = async (backgroundId: string) => {
    const backgroundUrl = getBackgroundUrlById(backgroundId);
    if (!backgroundUrl) {
      message.info('未找到对应的背景图片');
      return;
    }
    const localBackgroundPath = getBackgroundPathById(backgroundId);
    let backgroundBlob = await cacheStorage.getItem(localBackgroundPath);

    try {
      if (!backgroundBlob) {
        setDownloading(true);
        setPercent(0);

        backgroundBlob = await fetchWithProgress(backgroundUrl, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        });
        await cacheStorage.setItem(localBackgroundPath, backgroundBlob);
      }
    } finally {
      setDownloading(false);
    }
    if (!backgroundBlob) return undefined;

    return URL.createObjectURL(backgroundBlob);
  };

  return {
    downloading,
    percent,
    fetchBackgroundUrl,
    getBackgroundUrlById,
    getBackgroundThumbById,
  };
};
