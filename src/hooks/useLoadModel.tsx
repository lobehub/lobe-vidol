import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

export const useLoadModel = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchModelBlob = async (agentId: string, modelUrl: string) => {
    setDownloading(true);
    setPercent(0);
    try {
      const blob = await fetchWithProgress(modelUrl, {
        onProgress: (loaded, total) => {
          setPercent(Math.ceil((loaded / total) * 100));
        },
      });
      const modelPath = getModelPathByAgentId(agentId);
      await storage.setItem(modelPath, blob);

      return blob;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloading,
    percent,
    fetchModelBlob,
  };
};
