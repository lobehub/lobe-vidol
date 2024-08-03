import { isArrayBuffer } from 'lodash-es';
import { useState } from 'react';

import { fetchWithProgress } from '@/utils/fetch';
import { getAudioPathByDanceId } from '@/utils/file';
import storage from '@/utils/storage';

export const useLoadAudio = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchAudioBuffer = async (danceId: string, audioUrl: string) => {
    const localAudioPath = getAudioPathByDanceId(danceId);
    let audioBuffer = (await storage.getItem(localAudioPath)) as ArrayBuffer;
    // 存量转换
    if (audioBuffer && !isArrayBuffer(audioBuffer)) {
      audioBuffer = await (audioBuffer as Blob).arrayBuffer();
    }
    try {
      if (!audioBuffer) {
        setDownloading(true);
        setPercent(0);

        audioBuffer = await fetchWithProgress(audioUrl, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        }).then((res) => res.arrayBuffer());
        await storage.setItem(localAudioPath, audioBuffer);
      }
    } finally {
      setDownloading(false);
    }
    return audioBuffer;
  };

  return {
    downloading,
    percent,
    fetchAudioBuffer,
  };
};
