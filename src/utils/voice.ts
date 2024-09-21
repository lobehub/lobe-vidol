import { speechApi } from '@/services/tts';
import storage from '@/utils/storage';

const VOICE_CACHE_PREFIX = 'voice_cache_';

export const preloadVoice = async (ttsParams: any) => {
  const cacheKey = VOICE_CACHE_PREFIX + JSON.stringify(ttsParams);
  let cachedVoice = await storage.getItem(cacheKey);

  if (!cachedVoice) {
    const voiceBuffer = await speechApi(ttsParams);
    const blob = new Blob([voiceBuffer], { type: 'audio/mp3' });
    await storage.setItem(cacheKey, blob);
    cachedVoice = blob;
  }

  return cachedVoice;
};

export const getPreloadedVoice = async (ttsParams: any): Promise<ArrayBuffer | null> => {
  const cacheKey = VOICE_CACHE_PREFIX + JSON.stringify(ttsParams);
  const cachedBlob = await storage.getItem(cacheKey);

  if (cachedBlob) {
    return await cachedBlob.arrayBuffer();
  }

  return null;
};
