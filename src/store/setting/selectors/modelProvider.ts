import { uniqBy } from 'lodash-es';

import { filterEnabledModels } from '@/config/modelProviders';
import { ChatModelCard, ModelProviderCard } from '@/types/llm';
import { GlobalLLMProviderKey } from '@/types/provider/modelProvider';

import { SettingStore } from '../index';
import { currentConfig, getProviderConfigById } from './config';

/**
 * get the server side model cards
 */
// const serverProviderModelCards =
//   (provider: GlobalLLMProviderKey) =>
//   (s: UserStore): ChatModelCard[] | undefined => {
//     const config = s.serverLanguageModel?.[provider] as ServerModelProviderConfig | undefined;

//     if (!config) return;

//     return config.serverModelCards;
//   };

const remoteProviderModelCards =
  (provider: GlobalLLMProviderKey) =>
  (s: SettingStore): ChatModelCard[] | undefined => {
    const cards = currentConfig(s).languageModel?.[provider]?.remoteModelCards as
      | ChatModelCard[]
      | undefined;

    if (!cards) return;

    return cards;
  };

const isProviderEnabled = (provider: GlobalLLMProviderKey) => (s: SettingStore) =>
  getProviderConfigById(provider)(s)?.enabled || false;

// Default Model Provider List

/**
 * define all the model list of providers
 */
const defaultModelProviderList = (s: SettingStore): ModelProviderCard[] =>
  s.defaultModelProviderList;

export const getDefaultModeProviderById = (provider: string) => (s: SettingStore) =>
  defaultModelProviderList(s).find((s) => s.id === provider);

/**
 * get the default enabled models for a provider
 * it's a default enabled model list by Lobe Chat
 * e.g. openai is ['gpt-4o-mini','gpt-4o','gpt-4-turbo']
 */
const getDefaultEnabledModelsById = (provider: string) => (s: SettingStore) => {
  const modelProvider = getDefaultModeProviderById(provider)(s);

  if (modelProvider) return filterEnabledModels(modelProvider);

  return undefined;
};

const getDefaultModelCardById = (id: string) => (s: SettingStore) => {
  const list = defaultModelProviderList(s);

  return list.flatMap((i) => i.chatModels).find((m) => m.id === id);
};

// Model Provider List

const getModelCardsById =
  (provider: string) =>
  (s: SettingStore): ChatModelCard[] => {
    const builtinCards = getDefaultModeProviderById(provider)(s)?.chatModels || [];

    const userCards = (getProviderConfigById(provider)(s)?.customModelCards || []).map(
      (model: any) => ({
        ...model,
        isCustom: true,
      }),
    );

    return uniqBy([...userCards, ...builtinCards], 'id');
  };

const getEnableModelsById = (provider: string) => (s: SettingStore) => {
  if (!getProviderConfigById(provider)(s)?.enabledModels) return;

  return getProviderConfigById(provider)(s)?.enabledModels?.filter(Boolean);
};

const modelProviderList = (s: SettingStore): ModelProviderCard[] => s.modelProviderList;

const modelProviderListForModelSelect = (s: SettingStore): ModelProviderCard[] =>
  modelProviderList(s)
    .filter((s) => s.enabled)
    .map((provider) => ({
      ...provider,
      chatModels: provider.chatModels.filter((model) => model.enabled),
    }));

const getModelCardById = (id: string) => (s: SettingStore) => {
  const list = modelProviderList(s);

  return list.flatMap((i) => i.chatModels).find((m) => m.id === id);
};

const isModelEnabledFunctionCall = (id: string) => (s: SettingStore) =>
  getModelCardById(id)(s)?.functionCall || false;

// vision model white list, these models will change the content from string to array
// refs: https://github.com/lobehub/lobe-chat/issues/790
const isModelEnabledVision = (id: string) => (s: SettingStore) =>
  getModelCardById(id)(s)?.vision || id.includes('vision');

const isModelEnabledFiles = (id: string) => (s: SettingStore) => getModelCardById(id)(s)?.files;

const isModelEnabledUpload = (id: string) => (s: SettingStore) =>
  isModelEnabledVision(id)(s) || isModelEnabledFiles(id)(s);

const isModelHasMaxToken = (id: string) => (s: SettingStore) =>
  typeof getModelCardById(id)(s)?.tokens !== 'undefined';

const modelMaxToken = (id: string) => (s: SettingStore) => getModelCardById(id)(s)?.tokens || 0;

export const modelProviderSelectors = {
  defaultModelProviderList,
  getDefaultEnabledModelsById,
  getDefaultModelCardById,

  getEnableModelsById,
  getModelCardById,

  getModelCardsById,
  isModelEnabledFiles,
  isModelEnabledFunctionCall,
  isModelEnabledUpload,
  isModelEnabledVision,
  isModelHasMaxToken,

  isProviderEnabled,

  modelMaxToken,
  modelProviderList,

  modelProviderListForModelSelect,

  remoteProviderModelCards,
  // serverProviderModelCards,
};
