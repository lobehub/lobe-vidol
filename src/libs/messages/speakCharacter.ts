import { DEFAULT_MOTION_ANIMATION } from '@/constants/touch';
import { Viewer } from '@/libs/vrmViewer/viewer';
import { getMotionBlobUrl } from '@/services/motion';
import { speechApi } from '@/services/tts';
import { Screenplay } from '@/types/touch';
import { fetchWithProgress } from '@/utils/fetch';
import { getMotionPathByMotionId } from '@/utils/file';
import storage from '@/utils/storage';
import { wait } from '@/utils/wait';

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

      const [buffer, motionUrl] = await Promise.all([
        speechApi(screenplay.tts).catch(() => null),
        screenplay.motion ? getMotionBlobUrl(screenplay.motion) : Promise.resolve(null),
      ]);
      if (motionUrl) {
        screenplay.motion = motionUrl;
      }
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
