import { produce } from 'immer';
import { StateCreator } from 'zustand/vanilla';

import { DEFAULT_DANCE } from '@/constants/dance';
import { DanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';

export interface PlayListStore {
  /**
   * Add a dance to the playlist and play it.
   * @param dance
   */
  addAndPlayItem: (dance: Dance) => void;

  /**
   * Add a dance to the playlist.
   */
  addToPlayList: (dance: Dance) => void;
  /**
   * Clear the playlist.
   */
  clearPlayList: () => void;
  /**
   * current playing dance.
   */
  currentPlay: Dance | null;
  /**
   * next dance.
   */
  nextDance: () => void;
  /**
   * Play a dance.
   * @param dance
   */
  playItem: (dance: Dance) => void;
  /**
   * Playlist.
   */
  playlist: Dance[];
  /**
   * previous dance.
   */
  prevDance: () => void;
  /**
   * Remove a dance from the playlist.
   * @param dance
   */
  removePlayItem: (dance: Dance) => void;
  /**
   * Set the playlist.
   * @param playlist
   */
  setPlayList: (playlist: Dance[]) => void;
  /**
   * Toggle play or pause.
   */
  togglePlayPause: () => void;
}

export const createPlayListStore: StateCreator<
  DanceStore,
  [['zustand/devtools', never]],
  [],
  PlayListStore
> = (set, get) => {
  return {
    /**
     * Add a dance to the playlist and play it. add to the first.
     * @param dance
     */
    addAndPlayItem: (dance) => {
      const { playlist, playItem } = get();

      const nextPlayList = produce(playlist, (draftState) => {
        const index = draftState.findIndex((item) => item.name === dance.name);
        if (index === -1) {
          draftState.unshift(dance);
        } else {
          draftState.splice(index, 1);
          draftState.unshift(dance);
        }
      });

      set({ playlist: nextPlayList });

      playItem(dance);
    },
    /**
     * Add a dance to the playlist. add to the last.
     * @param dance
     */
    addToPlayList: (dance) => {
      const { playlist } = get();

      const nextPlayList = produce(playlist, (draftState) => {
        const index = draftState.findIndex((item) => item.name === dance.name);
        if (index === -1) {
          draftState.push(dance);
        }
      });

      set({ playlist: nextPlayList });
    },
    clearPlayList: () => {
      set({ currentPlay: null, isPlaying: false, playlist: [] });
    },
    currentPlay: DEFAULT_DANCE,

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
