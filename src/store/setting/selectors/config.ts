import { t } from 'i18next';

import { SettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { OpenAIConfig, TTSConfig, TouchConfig } from '@/types/config';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

const currentOpenAIConfig = (s: SettingStore): OpenAIConfig => {
  return s.config.languageModel.openAI;
};

const currentTouchConfig = (s: SettingStore): TouchConfig => {
  return s.config.touch;
};

const currentTTSConfig = (s: SettingStore): TTSConfig => {
  return s.config.tts;
};

const getTouchActionsByGenderAndArea = (
  s: SettingStore,
  gender: GenderEnum,
  touchArea: TouchAreaEnum,
): TouchAction[] => {
  const items = s.config.touch?.[gender]?.[touchArea] || [];
  return items.map((item) => ({ ...item, text: t(item.text, { ns: 'role' }) || item.text }));
};

export const configSelectors = {
  currentOpenAIConfig,
  currentTouchConfig,
  currentTTSConfig,
  getTouchActionsByGenderAndArea,
};
