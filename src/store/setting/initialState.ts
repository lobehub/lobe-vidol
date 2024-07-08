import { Config } from '@/types/config';

export interface SettingState {
  config: Config;
}

const initialState: SettingState = {
  config: {
    backgroundEffect: 'glow',
    languageModel: {
      openAI: {
        apikey: '',
        endpoint: '',
      },
    },
  },
};

export { initialState };
