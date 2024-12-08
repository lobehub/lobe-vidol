import { message } from 'antd';

import { AudioPlayer } from '@/libs/audio/AudioPlayer';
import { Viewer } from '@/libs/vrmViewer/viewer';
import { speechApi } from '@/services/tts';
import { Screenplay } from '@/types/touch';
import { getPreloadedVoice } from '@/utils/voice';
import { wait } from '@/utils/wait';

import { SpeakAudioOptions } from './type';

const createSpeakCharacter = () => {
  let lastTime = 0;
  let prevFetchPromise: Promise<unknown> = Promise.resolve();
  let prevSpeakPromise: Promise<unknown> = Promise.resolve();

  return (screenplay: Screenplay, viewer: Viewer, options?: SpeakAudioOptions) => {
    const fetchPromise = prevFetchPromise.then(async () => {
      const now = Date.now();
      if (now - lastTime < 1000) {
        await wait(1000 - (now - lastTime));
      }

      const buffer =
        (await getPreloadedVoice(screenplay.tts)) ||
        (await speechApi(screenplay.tts).catch((err) => {
          options?.onError?.(err as Error);
        }));
      lastTime = Date.now();
      return buffer;
    });

    prevFetchPromise = fetchPromise;

    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(async ([audioBuffer]) => {
      options?.onStart?.();
      if (!audioBuffer) {
        options?.onError?.(new Error('No audio buffer'));
        return;
      }
      await viewer.model?.speak(audioBuffer, screenplay);
    });
    prevSpeakPromise.then(() => {
      options?.onComplete?.();
    });
  };
};

export const speakCharacter = createSpeakCharacter();
