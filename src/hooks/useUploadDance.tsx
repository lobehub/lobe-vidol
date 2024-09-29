import { useState } from 'react';

import { upload } from '@/services/upload';

export const useUploadDance = () => {
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState({
    audio: 0,
    src: 0,
    cover: 0,
  });

  const uploadDanceData = async (
    danceId: string,
    files: { audio: File; cover: File; src: File },
  ) => {
    setUploading(true);
    setPercent({ audio: 0, src: 0, cover: 0 });

    try {
      const audioUrl = await upload(files.audio, {
        onProgress: (progress) => setPercent((prev) => ({ ...prev, audio: progress })),
      });
      const srcUrl = await upload(files.src, {
        onProgress: (progress) => setPercent((prev) => ({ ...prev, src: progress })),
      });
      const coverUrl = await upload(files.cover, {
        onProgress: (progress) => setPercent((prev) => ({ ...prev, cover: progress })),
      });

      return { audioUrl, srcUrl, coverUrl };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    percent,
    uploadDanceData,
  };
};
