import { DEFAULT_DANCE } from '@/constants/dance';
import { DanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { produce } from 'immer';
import { StateCreator } from 'zustand/vanilla';

export interface PlayListStore {
  addAndPlayItem: (dance: Dance) => void;
  clearPlayList: () => void;
  currentPlay: Dance | null;
  nextDance: () => void;
  playItem: (dance: Dance) => void;
  playlist: Dance[];
  prevDance: () => void;
  removePlayItem: (dance: Dance) => void;
  setPlayList: (playlist: Dance[]) => void;
  togglePlayPause: () => void;
}

export const createPlayListStore: StateCreator<
  DanceStore,
  [['zustand/devtools', never]],
  [],
  PlayListStore
> = (set, get) => {
  return {
    addAndPlayItem: (dance) => {
      const { playlist, playItem } = get();

      const nextPlayList = produce(playlist, (draftState) => {
        const index = draftState.findIndex((item) => item.name === dance.name);
        if (index === -1) {
          draftState.unshift(dance);
        }
      });

      set({ playlist: nextPlayList });

      playItem(dance);
    },
    clearPlayList: () => {
      set({ currentPlay: null, isPlaying: false, playlist: [] });
    },
    currentPlay: null,

    isPlaying: false,

    nextDance: () => {
      const { currentPlay, playlist, playItem } = get();
      if (currentPlay && playlist.length > 0) {
        const currentPlayIndex = playlist.findIndex((item) => item.name === currentPlay.name);
        if (currentPlayIndex < playlist.length - 1) {
          playItem(playlist[currentPlayIndex + 1]);
        } else {
          playItem(playlist[0]);
        }
      }
    },

    playItem: (dance) => {
      set({ currentPlay: dance, isPlaying: true });
    },
    playlist: [DEFAULT_DANCE],
    prevDance: () => {
      const { currentPlay, playlist, playItem } = get();
      if (currentPlay && playlist.length > 0) {
        const currentPlayIndex = playlist.findIndex((item) => item.name === currentPlay.name);
        if (currentPlayIndex > 0) {
          playItem(playlist[currentPlayIndex - 1]);
        } else {
          const dance = playlist.at(-1);
          if (dance) playItem(dance);
        }
      }
    },
    removePlayItem: (dance) => {
      const { playlist } = get();
      const nextPlayList = produce(playlist, (draftState) => {
        const currentPlayIndex = draftState.findIndex((item) => item.name === dance.name);
        draftState.splice(currentPlayIndex, 1);
      });

      if (nextPlayList.length === 0) {
        set({ currentPlay: null, isPlaying: false, playlist: nextPlayList });
      } else {
        set({ playlist: nextPlayList });
      }
    },
    setPlayList: (playlist) => {
      set({ playlist: playlist });
    },
    togglePlayPause: () => {
      if (!get().currentPlay) return;
      set({ isPlaying: !get().isPlaying });
    },
  };
};
