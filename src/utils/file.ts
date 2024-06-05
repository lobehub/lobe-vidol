import { Dance } from '@/types/dance';
import storage from '@/utils/storage';

const MODEL_SCHEMA = 'model';
const AUDIO_SCHEMA = 'audio';
const Dance_SCHEMA = 'dance';

export const getModelPathByAgentId = (id: string) => {
  return `${MODEL_SCHEMA}://${id}`;
};

export const getAudioPathByDanceId = (id: string) => {
  return `${AUDIO_SCHEMA}://${id}`;
};

export const getDancePathByDanceId = (id: string) => {
  return `${Dance_SCHEMA}://${id}`;
};

export const getCurrentPlayData = async (
  currentPlay: Dance,
): Promise<
  | {
      audioBlob: Blob;
      danceBuffer: ArrayBuffer;
    }
  | undefined
> => {
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
  let audioBlob = (await storage.getItem(localAudioPath)) as Blob;
  if (!audioBlob) {
    audioBlob = await fetch(currentPlay.audio).then((res) => res.blob());
    await storage.setItem(localAudioPath, audioBlob);
  }

  return {
    danceBuffer: danceBuffer,
    audioBlob: audioBlob,
  };
};
