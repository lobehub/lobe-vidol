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
        model: 'gpt-3.5-turbo',
      },
    },
  },
};

export { initialState };
