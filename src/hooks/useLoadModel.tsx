import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

export const useLoadModel = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchVrmUrl = async (agentId: string, model: string) => {
    const modelPath = getModelPathByAgentId(agentId);
    // 根据 AgentId 获取本地模型数据
    let blob = (await storage.getItem(modelPath)) as Blob | null;

    try {
      if (!blob) {
        setDownloading(true);
        setPercent(0);

        blob = await fetchWithProgress(model, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        });
        await storage.setItem(modelPath, blob);
      }
    } catch {
      blob = null;
    } finally {
      setDownloading(false);
    }
    return blob ? URL.createObjectURL(blob) : null;
  };

  return {
    downloading,
    percent,
    fetchVrmUrl,
  };
};
