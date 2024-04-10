import { getDanceIndex } from '@/services/dance';
import { MarketStore } from '@/store/market';
import { Dance } from '@/types/dance'; // 更改这里
import { isEqual } from 'lodash-es';
import { StateCreator } from 'zustand/vanilla';

export interface DanceStore {
  // 更改这里
  activateDance: (identifier: string) => void; 
  // 更改这里
  currentDanceId: string; 
  // 更改这里
  danceList: Dance[]; 
  // 更改这里
  danceLoading: boolean; // 更改这里
  deactivateDance: () => void; // 更改这里
  fetchDanceIndex: () => void; // 更改这里
}

export const createDanceStore: StateCreator<
  // 更改这里
  MarketStore,
  [['zustand/devtools', never]],
  [],
  DanceStore // 更改这里
> = (set, get) => {
  return {
    // 更改这里
activateDance: (identifier) => {
      // 更改这里
      set({ currentDanceId: identifier }); // 更改这里
    }, 
    
currentDanceId: '', 
    
// 更改这里
danceList: [], 
    // 更改这里
danceLoading: false,
    deactivateDance: () => {
      // 更改这里
      set({ currentDanceId: undefined }); // 更改这里
    },
    fetchDanceIndex: async () => {
      // 更改这里
      set({ danceLoading: true }); // 更改这里
      try {
        const { dances = [] } = await getDanceIndex();
        const { danceList } = get(); // 更改这里
        if (!isEqual(danceList, dances)) set({ danceList: dances }); // 更改这里
      } catch {
        set({ danceList: [] }); // 更改这里
      } finally {
        set({ danceLoading: false }); // 更改这里
      }
    },
  };
};
