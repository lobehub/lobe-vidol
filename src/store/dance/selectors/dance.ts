import { Dance } from '@/types/dance';
import { getAudioPathByDanceId, getDancePathByDanceId } from '@/utils/file';
import storage from '@/utils/storage';

import { DanceStore } from '../index';

const showSideBar = (s: DanceStore) => !!s.currentIdentifier;

const currentDanceItem = (s: DanceStore): Dance | undefined => {
  const { currentIdentifier, danceList } = s;
  const currentDance = danceList.find((item) => item.danceId === currentIdentifier);
  if (!currentDance) return undefined;

  return currentDance;
};

const subscribed = (s: DanceStore) => (danceId: string) => {
  const { danceList } = s;
  const index = danceList.findIndex((item) => item.danceId === danceId);

  return index !== -1;
};

const getCurrentPlayData = async (
  s: DanceStore,
): Promise<
  | {
      audioBlob: Blob;
      danceBuffer: ArrayBuffer;
    }
  | undefined
> => {
  const currentPlay = s.currentPlay;
  if (!currentPlay) return undefined;

  // 舞蹈文件
  const localDancePath = getDancePathByDanceId(currentPlay.danceId);
  let danceBuffer = (await storage.getItem(localDancePath)) as ArrayBuffer;
  if (!danceBuffer) {
    danceBuffer = await fetch(currentPlay.src).then((res) => res.arrayBuffer());
    await storage.setItem(localDancePath, danceBuffer);
  }

  // 音频文件
  const localAudioPath = getAudioPathByDanceId(currentPlay.danceId);
  const audioBlob = (await storage.getItem(localAudioPath)) as Blob;
  if (!audioBlob) {
    const audioBlob = await fetch(currentPlay.audio).then((res) => res.blob());
    await storage.setItem(localAudioPath, audioBlob);
  }

  return {
    danceBuffer: danceBuffer,
    audioBlob: audioBlob,
  };
};

export const danceListSelectors = {
  currentDanceItem,
  showSideBar,
  getCurrentPlayData,
  subscribed,
};
