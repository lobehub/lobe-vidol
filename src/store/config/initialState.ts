import { INITIAL_COORDINATES } from '@/constants/common';
import { Config, PanelConfig, PanelKey } from '@/types/config';

export interface ConfigState {
  config: Config;
  focusList: PanelKey[];
  panel: PanelConfig;
}

const initialState: ConfigState = {
  config: {
    backgroundEffect: 'glow',
    languageModel: {
      openAI: {
        apikey: '',
        endpoint: '',
        model: 'gpt-3.5-turbo',
      },
    },
    primaryColor: 'blue',
  },
  focusList: [],

  panel: {
    agent: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    chat: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    config: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    dance: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    live: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    market: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
    role: {
      coordinates: INITIAL_COORDINATES,
      open: false,
    },
  },
};

export { initialState };
