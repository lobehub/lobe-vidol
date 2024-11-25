import { AudioPlayer } from '@/libs/audio/AudioPlayer';
import { speechApi } from '@/services/tts';
import { TTS } from '@/types/tts';
import { wait } from '@/utils/wait';

import { SpeakAudioOptions } from './type';

const audioPlayer = AudioPlayer.getInstance();

export const speakChatItem = async (tts: TTS, options?: SpeakAudioOptions) => {
  const audioBuffer = await speechApi(tts).catch((err) => {
    options?.onError?.(err as Error);
  });

  if (!audioBuffer) {
    options?.onError?.(new Error('No audio buffer'));
    return;
  }
  options?.onStart?.();
  audioPlayer.play(audioBuffer, () => {
    options?.onComplete?.();
  });
};
