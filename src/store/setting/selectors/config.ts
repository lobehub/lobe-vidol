import { SettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { OpenAIConfig } from '@/types/config';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

const currentOpenAIConfig = (s: SettingStore): OpenAIConfig => {
  return s.config.languageModel.openAI;
};

const currentFemaleTouchConfig = (s: SettingStore, touchArea: TouchAreaEnum): TouchAction[] => {
  return s.config.touch[GenderEnum.FEMALE]?.[touchArea] || [];
};

const currentMaleTouchConfig = (s: SettingStore, touchArea: TouchAreaEnum): TouchAction[] => {
  return s.config.touch[GenderEnum.MALE]?.[touchArea] || [];
};

const currentOtherTouchConfig = (s: SettingStore, touchArea: TouchAreaEnum): TouchAction[] => {
  return s.config.touch[GenderEnum.OTHER]?.[touchArea] || [];
};

export const configSelectors = {
  currentOpenAIConfig,
  currentFemaleTouchConfig,
  currentMaleTouchConfig,
  currentOtherTouchConfig,
};
