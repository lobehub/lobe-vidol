import { INITIAL_Z_INDEX } from '@/constants/common';
import { ConfigStore } from '@/store/config';
import { OpenAIConfig, PanelKey } from '@/types/config';

const currentOpenAIConfig = (s: ConfigStore): OpenAIConfig | undefined => {
  return s.config.languageModel.openAI;
};

const getPanelZIndex = (s: ConfigStore, panelKey: PanelKey) => {
  const focusList = s.focusList;
  const index = focusList.indexOf(panelKey);
  return index === -1 ? INITIAL_Z_INDEX : INITIAL_Z_INDEX + index;
};

export const configSelectors = {
  currentOpenAIConfig,
  getPanelZIndex,
};
