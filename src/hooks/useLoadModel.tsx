import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getModelPathByAgentId } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

export const useLoadModel = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchModelUrl = async (agentId: string, remoteModelUrl: string) => {
    const localModelPath = getModelPathByAgentId(agentId);
    let modelBlob = await cacheStorage.getItem(localModelPath);

    try {
      if (!modelBlob) {
        setDownloading(true);
        setPercent(0);
        modelBlob = await fetchWithProgress(remoteModelUrl, {
          onProgress: (loaded, total) => {
            setPercent(Math.ceil((loaded / total) * 100));
          },
        });
        const modelPath = getModelPathByAgentId(agentId);
        await cacheStorage.setItem(modelPath, modelBlob);
      }
    } finally {
      setDownloading(false);
    }

    if (!modelBlob) return null;

    return URL.createObjectURL(modelBlob);
  };

  return {
    downloading,
    percent,
    fetchModelUrl,
  };
};
