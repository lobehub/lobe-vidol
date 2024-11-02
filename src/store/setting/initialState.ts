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
    tts: {
      // 默认不启用客户端调用，本地调试时启用，等后续有成熟的解决方案再启用
      clientCall: false,
    },
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
