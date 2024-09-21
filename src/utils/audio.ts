import { speechApi } from '@/services/tts';

const audioCache = new Map<string, Blob>();

export const preloadAudio = async (ttsParams: any) => {
  const cacheKey = JSON.stringify(ttsParams);
  if (!audioCache.has(cacheKey)) {
    const audioBuffer = await speechApi(ttsParams);
    const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
    audioCache.set(cacheKey, blob);
  }
  return audioCache.get(cacheKey);
};

export const getPreloadedAudio = async (ttsParams: any): Promise<ArrayBuffer | null> => {
  const cacheKey = JSON.stringify(ttsParams);
  const cachedBlob = audioCache.get(cacheKey);
  if (cachedBlob) {
    return await cachedBlob.arrayBuffer();
  }
  return null;
};
