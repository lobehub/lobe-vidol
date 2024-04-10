import type { ThemeMode } from 'antd-style';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface ThemeStore {
  setThemeMode: (themeMode: ThemeMode) => void;
  themeMode: ThemeMode;
}

export const useThemeStore = createWithEqualityFn<ThemeStore>()(
  (set) => ({
    setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),
    themeMode: 'auto' as ThemeMode,
  }),
  shallow,
);
