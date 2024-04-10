import { MarketStore } from '@/store/market';
import { Dance } from '@/types/dance';

const showDanceSideBar = (s: MarketStore) => !!s.currentDanceId;

const currentDanceItem = (s: MarketStore): Dance | undefined => {
  const { currentDanceId, danceList } = s;
  const currentDance = danceList.find((item) => item.danceId === currentDanceId);
  if (!currentDance) return undefined;

  return currentDance;
};

export const danceSelectors = {
  currentDanceItem,
  showDanceSideBar,
};
