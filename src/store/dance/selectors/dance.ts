import { Dance } from '@/types/dance';
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

export const danceListSelectors = {
  currentDanceItem,
  showSideBar,
  subscribed,
};
