import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type Mode = 'camera' | 'chat' | 'call';

export interface ChatStore {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const initialState = {
  mode: 'chat' as Mode,
};
export const useChatStore = createWithEqualityFn<ChatStore>()(
  (set) => ({
    ...initialState,
    setMode: (mode: Mode) => {
      set({ mode });
    },
  }),
  shallow,
);
