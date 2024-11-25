import { AudioPlayer } from '@/libs/audio/AudioPlayer';
import { speechApi } from '@/services/tts';
import { TTS } from '@/types/tts';
import { wait } from '@/utils/wait';

import { SpeakAudioOptions } from './type';

const audioPlayer = AudioPlayer.getInstance();

const createSpeakChatItem = () => {
  let lastTime = 0;
  let prevFetchPromise: Promise<unknown> = Promise.resolve();
  let prevSpeakPromise: Promise<unknown> = Promise.resolve();

  return (tts: TTS, options?: SpeakAudioOptions) => {
    const fetchPromise = prevFetchPromise.then(async () => {
      const now = Date.now();
      if (now - lastTime < 1000) {
        await wait(1000 - (now - lastTime));
      }

      const buffer = await speechApi(tts).catch((err) => {
        options?.onError?.(err as Error);
      });
      lastTime = Date.now();
      return buffer;
    });

    prevFetchPromise = fetchPromise;
    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(async ([audioBuffer]) => {
      if (!audioBuffer) {
        options?.onError?.(new Error('No audio buffer'));
        return;
      }
      options?.onStart?.();
      await audioPlayer.play(audioBuffer, () => {
        options?.onComplete?.();
      });
    });
    prevSpeakPromise.then(() => {
      options?.onComplete?.();
    });
  };
};

export const speakChatItem = createSpeakChatItem();
