import { message } from 'antd';

import { AudioPlayer } from '@/libs/audio/AudioPlayer';
import { Viewer } from '@/libs/vrmViewer/viewer';
import { speechApi } from '@/services/tts';
import { Screenplay } from '@/types/touch';
import { getPreloadedVoice } from '@/utils/voice';
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

      const buffer =
        (await getPreloadedVoice(screenplay.tts)) ||
        (await speechApi(screenplay.tts).catch((err) => {
          message.error((err as Error).message);
        }));
      lastTime = Date.now();
      return buffer;
    });

    prevFetchPromise = fetchPromise;
    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(([audioBuffer]) => {
      onStart?.();
      if (!audioBuffer) {
        return;
      }
      if (viewer.model) {
        viewer.model.speak(audioBuffer, screenplay);
      } else {
        // 使用 AudioPlayer 单例来播放音频
        const audioPlayer = AudioPlayer.getInstance();
        audioPlayer.play(audioBuffer);
      }
    });
    prevSpeakPromise.then(() => {
      onComplete?.();
    });
  };
};

export const speakCharacter = createSpeakCharacter();
