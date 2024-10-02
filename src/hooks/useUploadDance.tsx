import { useState } from 'react';

import { upload } from '@/services/upload';
import { base64ToFile } from '@/utils/imageToBase64';

interface DanceMeta {
  audio: File;
  cover: string;
  src: File;
  thumb: string;
}

export const useUploadDance = () => {
  const [uploading, setUploading] = useState(false);
  const [coverProgress, setCoverProgress] = useState(0);
  const [thumbProgress, setThumbProgress] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [srcProgress, setSrcProgress] = useState(0);

  const uploadDanceData = async (danceId: string, meta: DanceMeta) => {
    setUploading(true);
    setCoverProgress(0);
    setThumbProgress(0);
    setAudioProgress(0);
    setSrcProgress(0);

    const coverPromise = new Promise<string | undefined>((resolve, reject) => {
      const coverUrl = meta.cover;
      if (meta.cover.includes('base64')) {
        const file = base64ToFile(meta.cover, `${danceId}-cover`);
        upload(file, {
          onProgress: (progress: number) => {
            setCoverProgress(progress);
          },
        })
          .then((url) => resolve(url))
          .catch(() => reject(new Error('Upload failed')));
      } else {
        resolve(coverUrl);
      }
    });
    const thumbPromise = new Promise<string | undefined>((resolve, reject) => {
      const coverUrl = meta.thumb;
      if (meta.thumb.includes('base64')) {
        const file = base64ToFile(meta.thumb, `${danceId}-thumb`);
        upload(file, {
          onProgress: (progress: number) => {
            setCoverProgress(progress);
          },
        })
          .then((url) => resolve(url))
          .catch(() => reject(new Error('Upload failed')));
      } else {
        resolve(coverUrl);
      }
    });

    const audioPromise = new Promise<string | undefined>((resolve, reject) => {
      if (meta.audio instanceof File) {
        upload(meta.audio, {
          onProgress: (progress) => {
            setAudioProgress(progress);
          },
        })
          .then((url) => resolve(url))
          .catch(() => reject(new Error('音频上传失败')));
      } else {
        resolve(meta.audio);
      }
    });

    const srcPromise = new Promise<string | undefined>((resolve, reject) => {
      if (meta.src instanceof File) {
        upload(meta.src, {
          onProgress: (progress) => {
            setSrcProgress(progress);
          },
        })
          .then((url) => resolve(url))
          .catch(() => reject(new Error('舞蹈文件上传失败')));
      } else {
        resolve(meta.src);
      }
    });

    try {
      const [coverUrl, thumbUrl, audioUrl, srcUrl] = await Promise.all([
        coverPromise,
        thumbPromise,
        audioPromise,
        srcPromise,
      ]);
      return { coverUrl, thumbUrl, audioUrl, srcUrl };
    } catch (e) {
      console.error(e);
      return { coverUrl: '', thumbUrl: '', audioUrl: '', danceUrl: '' };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    percent: {
      cover: coverProgress,
      thumb: thumbProgress,
      audio: audioProgress,
      src: srcProgress,
    },
    uploadDanceData,
  };
};
