import { JWTPayload, LOBE_CHAT_AUTH_HEADER } from '@/constants/auth';
import { ModelProvider } from '@/libs/agent-runtime';
import { useSettingStore } from '@/store/setting';
import { keyVaultsConfigSelectors } from '@/store/setting/selectors';
import { GlobalLLMProviderKey } from '@/types/provider/modelProvider';
import { createJWT } from '@/utils/jwt';

export const getProviderAuthPayload = (provider: string) => {
  switch (provider) {
    case ModelProvider.Bedrock: {
      const { accessKeyId, region, secretAccessKey, sessionToken } =
        keyVaultsConfigSelectors.bedrockConfig(useSettingStore.getState());

      const awsSecretAccessKey = secretAccessKey;
      const awsAccessKeyId = accessKeyId;

      const apiKey = (awsSecretAccessKey || '') + (awsAccessKeyId || '');

      return {
        apiKey,
        awsAccessKeyId,
        awsRegion: region,
        awsSecretAccessKey,
        awsSessionToken: sessionToken,
      };
    }

    case ModelProvider.SenseNova: {
      const { sensenovaAccessKeyID, sensenovaAccessKeySecret } =
        keyVaultsConfigSelectors.sensenovaConfig(useSettingStore.getState());

      const apiKey = (sensenovaAccessKeyID || '') + ':' + (sensenovaAccessKeySecret || '');

      return {
        apiKey,
        sensenovaAccessKeyID: sensenovaAccessKeyID,
        sensenovaAccessKeySecret: sensenovaAccessKeySecret,
      };
    }

    case ModelProvider.Wenxin: {
      const { secretKey, accessKey } = keyVaultsConfigSelectors.wenxinConfig(
        useSettingStore.getState(),
      );

      const apiKey = (accessKey || '') + (secretKey || '');

      return {
        apiKey,
        wenxinAccessKey: accessKey,
        wenxinSecretKey: secretKey,
      };
    }

    case ModelProvider.Azure: {
      const azure = keyVaultsConfigSelectors.azureConfig(useSettingStore.getState());

      return {
        apiKey: azure.apiKey,
        azureApiVersion: azure.apiVersion,
        endpoint: azure.endpoint,
      };
    }

    case ModelProvider.Ollama: {
      const config = keyVaultsConfigSelectors.ollamaConfig(useSettingStore.getState());

      return { endpoint: config?.baseURL };
    }

    default: {
      const config = keyVaultsConfigSelectors.getVaultByProvider(provider as GlobalLLMProviderKey)(
        useSettingStore.getState(),
      );

      return { apiKey: config?.apiKey, endpoint: config?.baseURL };
    }
  }
};

const createAuthTokenWithPayload = async (payload = {}) => {
  const accessCode = keyVaultsConfigSelectors.password(useSettingStore.getState());
  // const userId = userProfileSelectors.userId(useSettingStore.getState());

  return await createJWT<JWTPayload>({
    accessCode,
    // userId,
    ...payload,
  });
};

interface AuthParams {
  // eslint-disable-next-line no-undef
  headers?: HeadersInit;
  payload?: Record<string, any>;
  provider?: string;
}

// eslint-disable-next-line no-undef
export const createHeaderWithAuth = async (params?: AuthParams): Promise<HeadersInit> => {
  let payload = params?.payload || {};

  if (params?.provider) {
    payload = { ...payload, ...getProviderAuthPayload(params?.provider) };
  }

  const token = await createAuthTokenWithPayload(payload);

  // eslint-disable-next-line no-undef
  return { ...params?.headers, [LOBE_CHAT_AUTH_HEADER]: token };
};
