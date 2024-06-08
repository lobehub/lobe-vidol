import { useState } from 'react';
import useSWR from 'swr';

import { fetchWithProgress } from '@/utils/fetch';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

export const useLoadModel = (agentId: string, model: string) => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const { data: vrmUrl, error } = useSWR(model, async (url) => {
    const modelPath = getModelPathByAgentId(agentId);
    // 根据 AgentId 获取本地模型数据
    let blob = (await storage.getItem(modelPath)) as Blob | null;
    if (!blob) {
      setDownloading(true);
      setPercent(0);

      blob = await fetchWithProgress(url, {
        onProgress: (loaded, total) => {
          setPercent(Math.ceil((loaded / total) * 100));
        },
      });
      setDownloading(false);

      await storage.setItem(modelPath, blob);
    }
    return blob ? URL.createObjectURL(blob) : null;
  });

  return {
    downloading,
    percent,
    vrmUrl,
    error,
  };
};
