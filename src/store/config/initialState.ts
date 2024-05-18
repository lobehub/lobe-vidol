import { DEFAULT_SETTINGS } from '@/constants/settings';
import { INITIAL_COORDINATES } from '@/constants/token';
import { Config, PanelConfig, PanelKey } from '@/types/config';

export interface ConfigState {
  config: Config;
  focusList: PanelKey[];
  panel: PanelConfig;
}

const initialState: ConfigState = {
  config: DEFAULT_SETTINGS,
  focusList: [],

  panel: {
    agent: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    dance: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    role: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    market: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
  },
};

export { initialState };
