import { TTS, TTS_ENGINE, Voice } from '@/types/tts';

export const speechApi = async (tts: TTS) => {
  const { engine = 'edge' } = tts;
  const res = await fetch(`/api/voice/${engine}`, {
    body: JSON.stringify(tts),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (res.status !== 200) {
    const data = await res.json();
    throw new Error(data.errorMessage);
  }

  const buffer = await res.arrayBuffer();
  return buffer;
};

const getVoiceKey = (engine: TTS_ENGINE) => {
  return `vidol_voice_${engine}`;
};
export const voiceListApi = async (engine: TTS_ENGINE): Promise<{ data: Voice[] }> => {
  const key = getVoiceKey(engine);
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key) || '');
  }
  const res = await fetch(`/api/voice/${engine}/voices`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  const result = await res.json();
  sessionStorage.setItem(key, JSON.stringify(result));

  return result;
};
