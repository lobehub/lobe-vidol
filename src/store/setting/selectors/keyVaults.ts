import { SettingStore } from '@/store/setting';
import {
  AWSBedrockKeyVault,
  AzureOpenAIKeyVault,
  OpenAICompatibleKeyVault,
  UserKeyVaults,
} from '@/types/provider/keyVaults';
import { GlobalLLMProviderKey } from '@/types/provider/modelProvider';

export const keyVaultsSettings = (s: SettingStore): UserKeyVaults => s.config.keyVaults || {};

const openAIConfig = (s: SettingStore) => keyVaultsSettings(s).openai || {};
const bedrockConfig = (s: SettingStore) => keyVaultsSettings(s).bedrock || {};
const wenxinConfig = (s: SettingStore) => keyVaultsSettings(s).wenxin || {};
const ollamaConfig = (s: SettingStore) => keyVaultsSettings(s).ollama || {};
const sensenovaConfig = (s: SettingStore) => keyVaultsSettings(s).sensenova || {};
const azureConfig = (s: SettingStore) => keyVaultsSettings(s).azure || {};
const getVaultByProvider = (provider: GlobalLLMProviderKey) => (s: SettingStore) =>
  (keyVaultsSettings(s)[provider] || {}) as OpenAICompatibleKeyVault &
    AzureOpenAIKeyVault &
    AWSBedrockKeyVault;

const isProviderEndpointNotEmpty = (provider: string) => (s: SettingStore) => {
  const vault = getVaultByProvider(provider as GlobalLLMProviderKey)(s);
  return !!vault?.baseURL || !!vault?.endpoint;
};

const isProviderApiKeyNotEmpty = (provider: string) => (s: SettingStore) => {
  const vault = getVaultByProvider(provider as GlobalLLMProviderKey)(s);
  return !!vault?.apiKey || !!vault?.accessKeyId || !!vault?.secretAccessKey;
};

const password = (s: SettingStore) => keyVaultsSettings(s).password || '';

export const keyVaultsConfigSelectors = {
  azureConfig,
  bedrockConfig,
  getVaultByProvider,
  isProviderApiKeyNotEmpty,
  isProviderEndpointNotEmpty,
  ollamaConfig,
  openAIConfig,
  password,
  sensenovaConfig,
  wenxinConfig,
};
