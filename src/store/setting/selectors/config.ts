import { SettingStore } from '@/store/setting';
import { OpenAIConfig } from '@/types/config';

const currentOpenAIConfig = (s: SettingStore): OpenAIConfig => {
  return s.config.languageModel.openAI;
};

export const configSelectors = {
  currentOpenAIConfig,
};
