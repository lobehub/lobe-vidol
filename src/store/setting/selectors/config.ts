import { t } from 'i18next';

// import { merge } from 'lodash-es';
import { DEFAULT_LANG } from '@/constants/locale';
import { Locales } from '@/locales/resources';
import { SettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { Config, TTSConfig, TouchConfig } from '@/types/config';
import {
  GlobalLLMProviderKey,
  ProviderConfig,
  UserModelProviderConfig,
} from '@/types/provider/modelProvider';
import { TouchAction, TouchAreaEnum } from '@/types/touch';
import { isOnServerSide } from '@/utils/env';

export const currentConfig = (s: SettingStore): Config => s.config;
// merge(s.defaultConfig, s.config);

export const currentLanguageModelConfig = (s: SettingStore): UserModelProviderConfig => {
  return s.config.languageModel || {};
};

export const getProviderConfigById = (provider: string) => (s: SettingStore) =>
  currentLanguageModelConfig(s)[provider as GlobalLLMProviderKey] as ProviderConfig | undefined;

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
  currentLanguageModelConfig,
  currentTouchConfig,
  currentLanguage,
  currentConfig,
  currentTTSConfig,
  getTouchActionsByGenderAndArea,
  getProviderConfigById,
};
