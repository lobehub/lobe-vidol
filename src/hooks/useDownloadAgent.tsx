import { message } from 'antd';
import { useState } from 'react';

import { useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { fetchWithProgress } from '@/utils/fetch';
import { getModelPathByAgentId } from '@/utils/file';
import { blobToDataURI } from '@/utils/imageToBase64';
import { setItem } from '@/utils/storage';

export const useDownloadAgent = () => {
  const [downloading, setDownloading] = useState(false);
  const [avatarTotal, setAvatarTotal] = useState(0);
  const [avatarLoaded, setAvatarLoaded] = useState(0);
  const [coverTotal, setCoverTotal] = useState(0);
  const [coverLoaded, setCoverLoaded] = useState(0);
  const [modelTotal, setModelTotal] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(0);

  const [addLocalAgent] = useAgentStore((s) => [s.addLocalAgent]);

  const fetchAgentData = async (agent: Agent) => {
    setDownloading(true);
    setAvatarTotal(0);
    setAvatarLoaded(0);
    setCoverTotal(0);
    setCoverLoaded(0);
    setModelTotal(0);
    setModelLoaded(0);

    const avatarPromise = fetchWithProgress(agent.meta.avatar!, {
      onProgress: (loaded, total) => {
        setAvatarTotal(total);
        setAvatarLoaded(loaded);
      },
    }).then(blobToDataURI);

    const coverPromise = fetchWithProgress(agent.meta.cover!, {
      onProgress: (loaded, total) => {
        setCoverLoaded(loaded);
        setCoverTotal(total);
      },
    }).then(blobToDataURI);

    const modelPromise = fetchWithProgress(agent.meta.model!, {
      onProgress: (loaded, total) => {
        setModelLoaded(loaded);
        setModelTotal(total);
      },
    });

    try {
      const [avatar, cover, model] = await Promise.all([avatarPromise, coverPromise, modelPromise]);
      const modelKey = getModelPathByAgentId(agent.agentId);
      await setItem(modelKey, model);

      addLocalAgent({ ...agent, meta: { ...agent.meta, avatar, cover } });
      message.success(agent.meta.name + '下载成功');
    } catch (e) {
      console.error(e);
      message.error(agent.meta.name + '下载失败');
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloading,
    percent: downloading
      ? Math.ceil(
          ((avatarLoaded + coverLoaded + modelLoaded) / (avatarTotal + coverTotal + modelTotal)) *
            100,
        )
      : 0,
    fetchAgentData,
  };
};
