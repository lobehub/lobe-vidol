import { Dance } from '@/types/dance';

import { DanceStore } from '../index';

const currentPlay = (s: DanceStore): Dance | undefined => {
  const { currentPlayId, danceList } = s;
  const currentDance = danceList.find((item) => item.danceId === currentPlayId);
  if (!currentDance) return undefined;

  return currentDance;
};

const getDanceItemByPlayId = (s: DanceStore) => (playId: string) => {
  const { danceList } = s;
  const currentDance = danceList.find((item) => item.danceId === playId);
  if (!currentDance) return undefined;

  return currentDance;
};

export const playListSelectors = {
  currentPlay,
  getDanceItemByPlayId,
};
