import { DEFAULT_MOTION_ANIMATION } from '@/constants/touch';
import { Viewer } from '@/libs/vrmViewer/viewer';
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

      const buffer = await speechApi(screenplay.tts).catch(() => null);
      if (screenplay.motion) {
        const item = DEFAULT_MOTION_ANIMATION.find((item) => item.id === screenplay.motion)!;

        const localMotionPath = getMotionPathByMotionId(item.id);
        let motionBlob = await storage.getItem(localMotionPath);
        if (!motionBlob) {
          motionBlob = await fetchWithProgress(item.url);
        }
        screenplay.motion = window.URL.createObjectURL(motionBlob);
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
