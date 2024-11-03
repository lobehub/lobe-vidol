import { EdgeSpeechTTS } from '@lobehub/tts';
import { t } from 'i18next';

import { configSelectors, useSettingStore } from '@/store/setting';
import { TTS, TTS_ENGINE, Voice } from '@/types/tts';

export const speechApi = async (tts: TTS) => {
  const { engine = 'edge', message, style, pitch = 1, speed = 1, voice, locale = 'en-US' } = tts;

  const settingStore = useSettingStore.getState();
  const clientCall = configSelectors.currentTTSConfig(settingStore).clientCall;

  if (engine === 'edge') {
    const payload = {
      input: message || '',
      options: {
        voice: voice || 'en-US-GuyNeural',
        style,
        pitch: (pitch - 1) / 2,
        rate: speed - 1,
      },
    };
    let res;
    try {
      if (clientCall) {
        const instance = new EdgeSpeechTTS({ locale });
        res = await instance.create(payload);
      } else {
        res = await fetch(`/api/voice/${engine}`, {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
      }
      const buffer = await res.arrayBuffer();
      return buffer;
    } catch (error) {
      console.error('TTS error', error);
      throw new Error(t('ttsTransformFailed', { ns: 'error' }));
    }
  } else {
    throw new Error('TTS engine not supported');
  }
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
