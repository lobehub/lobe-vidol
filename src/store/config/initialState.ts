import { DEFAULT_SETTINGS } from '@/constants/settings';
import { Config } from '@/types/config';

export interface ConfigState {
  config: Config;
}

const initialState: ConfigState = {
  config: DEFAULT_SETTINGS,
};

export { initialState };
