import { useState } from 'react';

import { Viewer } from '@/features/vrmViewer/viewer';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

export const useLoadVrm = (viewer: Viewer) => {
  const [loading, setLoading] = useState(false);
  const getAgentModelById = useAgentStore((s) => agentSelectors.getAgentModelById(s));

  const loadVrm = async (agentId: string) => {
    // 获取模型路径
    let vrmUrl = getAgentModelById(agentId);
    // 如果没有模型路径，卸载模型
    if (!vrmUrl) {
      viewer.unloadVRM();
      return;
    }

    const modelPath = getModelPathByAgentId(agentId);

    // 根据 AgentId 获取本地模型数据
    let blob = await storage.getItem(modelPath);

    if (!blob) {
      blob = await fetch(vrmUrl).then((res) => res.blob());
      await storage.setItem(modelPath, blob);
    }

    vrmUrl = window.URL.createObjectURL(blob as Blob);

    setLoading(true);
    viewer.loadVrm(vrmUrl).finally(() => {
      setLoading(false);
    });
  };

  return { loading, loadVrm };
};
