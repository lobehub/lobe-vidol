import {
  DEFAULT_TOUCH_ACTION_CONFIG_FEMALE,
  DEFAULT_TOUCH_ACTION_CONFIG_MALE,
} from '@/constants/touch';
import { GenderEnum } from '@/types/agent';
import { Config } from '@/types/config';

export interface SettingState {
  config: Config;
}

const initialState: SettingState = {
  config: {
    locale: 'auto',
    backgroundEffect: 'glow',
    languageModel: {
      openAI: {
        apikey: '',
        endpoint: '',
      },
    },
    touch: {
      [GenderEnum.FEMALE]: DEFAULT_TOUCH_ACTION_CONFIG_FEMALE,
      [GenderEnum.MALE]: DEFAULT_TOUCH_ACTION_CONFIG_MALE,
    },
  },
};

export { initialState };
