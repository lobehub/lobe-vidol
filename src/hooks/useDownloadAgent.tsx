import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { fetchWithProgress } from '@/utils/fetch';
import { getModelPathByAgentId } from '@/utils/file';
import { blobToDataURI } from '@/utils/imageToBase64';
import { setItem } from '@/utils/storage';

export const useDownloadAgent = () => {
  const [downloading, setDownloading] = useState(false);
  const [avatarProgress, setAvatarProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const [modelProgress, setModelProgress] = useState(0);

  const { t } = useTranslation('common');

  const [addLocalAgent] = useAgentStore((s) => [s.addLocalAgent]);

  const fetchAgentData = async (agent: Agent) => {
    setDownloading(true);
    setAvatarProgress(0);
    setCoverProgress(0);
    setModelProgress(0);

    const avatarPromise = fetchWithProgress(agent.meta.avatar!, {
      onProgress: (loaded, total) => {
        setAvatarProgress(Math.ceil((loaded / total) * 100));
      },
    }).then(blobToDataURI);

    const coverPromise = fetchWithProgress(agent.meta.cover!, {
      onProgress: (loaded, total) => {
        setCoverProgress(Math.ceil((loaded / total) * 100));
      },
    }).then(blobToDataURI);

    const modelPromise = fetchWithProgress(agent.meta.model!, {
      onProgress: (loaded, total) => {
        setModelProgress(Math.ceil((loaded / total) * 100));
      },
    });

    try {
      const [avatar, cover, model] = await Promise.all([avatarPromise, coverPromise, modelPromise]);
      const modelKey = getModelPathByAgentId(agent.agentId);
      await setItem(modelKey, model);

      addLocalAgent({ ...agent, meta: { ...agent.meta, avatar, cover } });
      message.success(agent.meta.name + t('actions.downloadSuccess'));
    } catch (e) {
      console.error(e);
      message.error(agent.meta.name + t('actions.downloadFailed'));
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloading,
    percent: {
      avatar: avatarProgress,
      cover: coverProgress,
      model: modelProgress,
    },
    fetchAgentData,
  };
};
