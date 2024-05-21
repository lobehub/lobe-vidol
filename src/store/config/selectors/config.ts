import { ConfigStore } from '@/store/config';
import { OpenAIConfig } from '@/types/config';

const currentOpenAIConfig = (s: ConfigStore): OpenAIConfig | undefined => {
  return s.config.languageModel.openAI;
};

export const configSelectors = {
  currentOpenAIConfig,
};
