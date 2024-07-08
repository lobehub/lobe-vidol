import { useState } from 'react';

import { upload } from '@/services/upload';
import { AgentMeta } from '@/types/agent';
import { isLocalModelPath } from '@/utils/file';
import { base64ToFile } from '@/utils/imageToBase64';
import storage from '@/utils/storage';

export const useUploadAgent = () => {
  const [uploading, setUploading] = useState(false);
  const [avatarProgress, setAvatarProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const [modelProgress, setModelProgress] = useState(0);

  const uploadAgentData = async (agentId: string, meta: AgentMeta) => {
    setUploading(true);
    setAvatarProgress(0);
    setCoverProgress(0);
    setModelProgress(0);

    const avatarPromise = new Promise<string | undefined>((resolve) => {
      const avatarUrl = meta.avatar;
      if (meta.avatar.includes('base64')) {
        const file = base64ToFile(meta.avatar, `${agentId}-avatar`);
        upload(file, {
          onProgress: (progress: number) => {
            setAvatarProgress(progress);
          },
        })
          .then((url) => resolve(url))
          .catch(() => resolve(avatarUrl));
      } else {
        resolve(avatarUrl);
      }
    });

    const coverPromise = new Promise<string | undefined>((resolve) => {
      const coverUrl = meta.cover;
      if (meta.cover.includes('base64')) {
        const file = base64ToFile(meta.cover, `${agentId}-cover`);
        upload(file, {
          onProgress: (progress) => {
            setCoverProgress(progress);
          },
        })
          .then((url) => resolve(url))
          .catch(() => resolve(coverUrl));
      } else {
        resolve(coverUrl);
      }
    });

    const modelPromise = new Promise<string | undefined>((resolve) => {
      const modelUrl = meta.model;
      if (modelUrl && isLocalModelPath(modelUrl)) {
        storage
          .getItem(modelUrl)
          .then((modelBlob) => {
            if (modelBlob) {
              upload(
                new File([modelBlob], `${agentId}-model.vrm`, { type: 'application/octet-stream' }),
                {
                  onProgress: (progress) => {
                    setModelProgress(progress);
                  },
                },
              )
                .then((url) => resolve(url))
                .catch(() => resolve(modelUrl));
            } else {
              resolve(modelUrl);
            }
          })
          .catch(() => resolve(modelUrl));
      } else {
        resolve(modelUrl);
      }
    });

    try {
      const [avatarUrl, coverUrl, modelUrl] = await Promise.all([
        avatarPromise,
        coverPromise,
        modelPromise,
      ]);
      return { avatarUrl, coverUrl, modelUrl };
    } catch (e) {
      console.error(e);
      return { avatarUrl: '', coverUrl: '', modelUrl: '' };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading: uploading,
    percent: {
      avatar: avatarProgress,
      cover: coverProgress,
      model: modelProgress,
    },
    uploadAgentData,
  };
};
