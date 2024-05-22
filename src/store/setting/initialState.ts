import type { ThemeMode } from 'antd-style';

import { UserConfig } from '@/types/config';

export interface SettingState {
  config: UserConfig;
}

const initialState: SettingState = {
  config: {
    backgroundEffect: 'glow',
    languageModel: {
      openAI: {
        apikey: '',
        endpoint: '',
        model: 'gpt-3.5-turbo',
      },
    },
    nickName: '',
    themeMode: 'auto' as ThemeMode,
  },
};

export { initialState };
