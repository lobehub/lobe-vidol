import { produce } from 'immer';
import { StateCreator } from 'zustand/vanilla';

import { LOBE_VIDOL_DEFAULT_DANCE_ID } from '@/constants/dance';
import { DanceStore } from '@/store/dance';

export interface PlayListStore {
  /**
   * Add a dance to the playlist and play it.
   * @param dance
   */
  addAndPlayItem: (danceId: string) => void;

  /**
   * Add a dance to the playlist.
   */
  addToPlayList: (danceId: string) => void;
  /**
   * Clear the playlist.
   */
  clearPlayList: () => void;
  /**
   * current playing dance.
   */
  currentPlayId: string;
  /**
   * next dance.
   */
  nextDance: () => void;
  /**
   * Play a dance.
   * @param dance
   */
  playItem: (danceId: string) => void;
  /**
   * Playlist.
   */
  playlist: string[];
  /**
   * previous dance.
   */
  prevDance: () => void;
  /**
   * Remove a dance from the playlist.
   * @param dance
   */
  removePlayItem: (danceId: string) => void;
  /**
   * Set the playlist.
   * @param playlist
   */
  setPlayList: (playlist: string[]) => void;
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
     * @param danceId
     */
    addAndPlayItem: (danceId) => {
      const { playlist, playItem } = get();

      const nextPlayList = produce(playlist, (draftState) => {
        const index = draftState.indexOf(danceId);
        if (index === -1) {
          draftState.unshift(danceId);
        } else {
          draftState.splice(index, 1);
          draftState.unshift(danceId);
        }
      });

      set({ playlist: nextPlayList });

      playItem(danceId);
    },
    /**
     * Add a dance to the playlist. add to the last.
     * @param danceId
     */
    addToPlayList: (danceId) => {
      const { playlist } = get();

      const nextPlayList = produce(playlist, (draftState) => {
        const index = draftState.indexOf(danceId);
        if (index === -1) {
          draftState.push(danceId);
        }
      });

      set({ playlist: nextPlayList });
    },
    clearPlayList: () => {
      set({ currentPlayId: undefined, isPlaying: false, playlist: [] });
    },

    currentPlayId: LOBE_VIDOL_DEFAULT_DANCE_ID,
    isPlaying: false,

    nextDance: () => {
      const { currentPlayId, playlist, playItem } = get();
      if (currentPlayId && playlist.length > 0) {
        const currentPlayIndex = playlist.indexOf(currentPlayId);
        if (currentPlayIndex < playlist.length - 1) {
          playItem(playlist[currentPlayIndex + 1]);
        } else {
          playItem(playlist[0]);
        }
      }
    },

    playItem: (danceId) => {
      set({ currentPlayId: danceId, isPlaying: true });
    },
    playlist: [LOBE_VIDOL_DEFAULT_DANCE_ID],
    prevDance: () => {
      const { currentPlayId, playlist, playItem } = get();
      if (currentPlayId && playlist.length > 0) {
        const currentPlayIndex = playlist.indexOf(currentPlayId);
        if (currentPlayIndex > 0) {
          playItem(playlist[currentPlayIndex - 1]);
        } else {
          const dance = playlist.at(-1);
          if (dance) playItem(dance);
        }
      }
    },
    removePlayItem: (danceId) => {
      const { playlist } = get();
      const nextPlayList = produce(playlist, (draftState) => {
        const currentPlayIndex = playlist.indexOf(danceId);
        draftState.splice(currentPlayIndex, 1);
      });

      if (nextPlayList.length === 0) {
        set({ currentPlayId: undefined, isPlaying: false, playlist: nextPlayList });
      } else {
        set({ playlist: nextPlayList });
      }
    },
    setPlayList: (playlist) => {
      set({ playlist: playlist });
    },
    togglePlayPause: () => {
      if (!get().currentPlayId) return;
      set({ isPlaying: !get().isPlaying });
    },
  };
};
