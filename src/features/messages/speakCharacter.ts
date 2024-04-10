import { speechApi } from '@/services/tts';
import { Screenplay } from '@/types/touch';
import { wait } from '@/utils/wait';
import { Viewer } from '../vrmViewer/viewer';

const createSpeakCharacter = () => {
  let lastTime = 0;
  let prevFetchPromise: Promise<unknown> = Promise.resolve();
  let prevSpeakPromise: Promise<unknown> = Promise.resolve();

  return (
    screenplay: Screenplay,
    viewer: Viewer,
    onStart?: () => void,
    onComplete?: () => void,
  ) => {
    const fetchPromise = prevFetchPromise.then(async () => {
      const now = Date.now();
      if (now - lastTime < 1000) {
        await wait(1000 - (now - lastTime));
      }

      const buffer = await speechApi(screenplay.tts).catch(() => null);
      lastTime = Date.now();
      return buffer;
    });

    prevFetchPromise = fetchPromise;
    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(([audioBuffer]) => {
      onStart?.();
      if (!audioBuffer) {
        return;
      }
      return viewer.model?.speak(audioBuffer, screenplay);
    });
    prevSpeakPromise.then(() => {
      onComplete?.();
    });
  };
};

export const speakCharacter = createSpeakCharacter();
