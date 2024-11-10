import { isProviderDisableBroswerRequest } from '@/config/modelProviders';
import { SettingStore } from '@/store/setting';
import { GlobalLLMProviderKey } from '@/types/provider/modelProvider';

import { currentLanguageModelConfig, getProviderConfigById } from './config';
import { keyVaultsConfigSelectors } from './keyVaults';

const isProviderEnabled = (provider: GlobalLLMProviderKey) => (s: SettingStore) =>
  getProviderConfigById(provider)(s)?.enabled || false;

const providerWhitelist = new Set(['ollama']);
/**
 * @description The conditions to enable client fetch
 * 1. If no baseUrl and apikey input, force on Server.
 * 2. If only contains baseUrl, force on Client
 * 3. Follow the user settings.
 * 4. On Server, by default.
 */
const isProviderFetchOnClient = (provider: GlobalLLMProviderKey | string) => (s: SettingStore) => {
  const config = getProviderConfigById(provider)(s);

  // If the provider already disable broswer request in model config, force on Server.
  if (isProviderDisableBroswerRequest(provider)) return false;

  // If the provider in the whitelist, follow the user settings
  if (providerWhitelist.has(provider) && typeof config?.fetchOnClient !== 'undefined')
    return config?.fetchOnClient;

  // 1. If no baseUrl and apikey input, force on Server.
  const isProviderEndpointNotEmpty =
    keyVaultsConfigSelectors.isProviderEndpointNotEmpty(provider)(s);
  const isProviderApiKeyNotEmpty = keyVaultsConfigSelectors.isProviderApiKeyNotEmpty(provider)(s);
  if (!isProviderEndpointNotEmpty && !isProviderApiKeyNotEmpty) return false;

  // 2. If only contains baseUrl, force on Client
  if (isProviderEndpointNotEmpty && !isProviderApiKeyNotEmpty) return true;

  // 3. Follow the user settings.
  if (typeof config?.fetchOnClient !== 'undefined') return config?.fetchOnClient;

  // 4. On Server, by default.
  return false;
};

const getCustomModelCard =
  ({ id, provider }: { id?: string; provider?: string }) =>
  (s: SettingStore) => {
    if (!provider) return;

    const config = getProviderConfigById(provider)(s);

    return config?.customModelCards?.find((m) => m.id === id);
  };

// const currentEditingCustomModelCard = (s: SettingStore) => {
//   if (!s.editingCustomCardModel) return;
//   const { id, provider } = s.editingCustomCardModel;

//   return getCustomModelCard({ id, provider })(s);
// };

const isAutoFetchModelsEnabled =
  (provider: GlobalLLMProviderKey) =>
  (s: SettingStore): boolean => {
    return getProviderConfigById(provider)(s)?.autoFetchModelLists || false;
  };

const openAIConfig = (s: SettingStore) => currentLanguageModelConfig(s).openai;
const bedrockConfig = (s: SettingStore) => currentLanguageModelConfig(s).bedrock;
const ollamaConfig = (s: SettingStore) => currentLanguageModelConfig(s).ollama;
const azureConfig = (s: SettingStore) => currentLanguageModelConfig(s).azure;
const sensenovaConfig = (s: SettingStore) => currentLanguageModelConfig(s).sensenova;

const isAzureEnabled = (s: SettingStore) => currentLanguageModelConfig(s).azure.enabled;

export const modelConfigSelectors = {
  azureConfig,
  bedrockConfig,

  // currentEditingCustomModelCard,
  getCustomModelCard,

  isAutoFetchModelsEnabled,
  isAzureEnabled,
  isProviderEnabled,
  isProviderFetchOnClient,

  ollamaConfig,
  openAIConfig,
  sensenovaConfig,
};
