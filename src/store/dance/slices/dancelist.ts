import { produce } from 'immer';
import { isEqual } from 'lodash-es';
import { StateCreator } from 'zustand/vanilla';

import { getDanceIndex } from '@/services/dance';
import { DanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { getAudioPathByDanceId, getDancePathByDanceId } from '@/utils/file';
import storage from '@/utils/storage';

export interface DanceListStore {
  activateDance: (identifier: string) => void;
  addDanceItem: (dance: Dance) => void;
  currentIdentifier: string;
  danceList: Dance[];
  danceLoading: boolean;
  deactivateDance: () => void;
  fetchDanceIndex: () => void;
  isPlaying: boolean;
  removeDanceItem: (danceId: string) => Promise<void>;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const createDanceStore: StateCreator<
  DanceStore,
  [['zustand/devtools', never]],
  [],
  DanceListStore
> = (set, get) => {
  return {
    activateDance: (identifier) => {
      set({ currentIdentifier: identifier });
    },
    currentIdentifier: '',
    danceList: [],
    danceLoading: false,
    deactivateDance: () => {
      set({ currentIdentifier: undefined });
    },
    fetchDanceIndex: async () => {
      set({ danceLoading: true });
      try {
        const { dances = [] } = await getDanceIndex();
        const { danceList } = get();
        if (!isEqual(danceList, dances)) set({ danceList: dances });
      } catch {
        set({ danceList: [] });
      } finally {
        set({ danceLoading: false });
      }
    },
    isPlaying: false,
    setIsPlaying: (isPlaying) => {
      set({ isPlaying });
    },
    addDanceItem: (dance) => {
      const { danceList } = get();

      const newList = produce(danceList, (draft) => {
        const index = draft.findIndex((item) => item.danceId === dance.danceId);

        if (index === -1) {
          draft.unshift(dance);
        }
      });
      set({ danceList: newList });
    },
    removeDanceItem: async (danceId) => {
      const { danceList } = get();
      const newList = produce(danceList, (draft) => {
        const index = draft.findIndex((item) => item.danceId === danceId);

        if (index !== -1) {
          draft.splice(index, 1);
        }
      });
      await storage.removeItem(getDancePathByDanceId(danceId));
      await storage.removeItem(getAudioPathByDanceId(danceId));
      set({ currentIdentifier: newList[0]?.danceId, danceList: newList });
    },
  };
};
