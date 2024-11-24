import { message } from 'antd';

import { AudioPlayer } from '@/libs/audio/AudioPlayer';
import { speechApi } from '@/services/tts';
import { TTS } from '@/types/tts';

import { SpeakAudioOptions } from './type';

const audioPlayer = AudioPlayer.getInstance();

export const speakChatItem = async (tts: TTS, options?: SpeakAudioOptions) => {
  if (!tts?.message) return;
  try {
    const audioBuffer = await speechApi(tts);
    options?.onStart?.();
    await audioPlayer.play(audioBuffer, () => {
      options?.onComplete?.();
    });
  } catch (err) {
    options?.onError?.(err as Error);
  }
};
