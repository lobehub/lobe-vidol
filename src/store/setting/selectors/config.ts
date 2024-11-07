import { t } from 'i18next';

import { DEFAULT_LANG } from '@/constants/locale';
import { Locales } from '@/locales/resources';
import { SettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { OpenAIConfig, TTSConfig, TouchConfig } from '@/types/config';
import { TouchAction, TouchAreaEnum } from '@/types/touch';
import { isOnServerSide } from '@/utils/env';

const currentOpenAIConfig = (s: SettingStore): OpenAIConfig => {
  return s.config.languageModel.openAI;
};

const currentTouchConfig = (s: SettingStore): TouchConfig => {
  return s.config.touch;
};

const currentLanguage = (s: SettingStore) => {
  const locale = s.config.locale;

  if (locale === 'auto') {
    if (isOnServerSide) return DEFAULT_LANG;

    return navigator.language as Locales;
  }

  return locale;
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
  currentLanguage,
  currentTTSConfig,
  getTouchActionsByGenderAndArea,
};
