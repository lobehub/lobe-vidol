import { DEFAULT_CHAT_MODEL, DEFAULT_CHAT_PROVIDER } from '@/constants/agent';
import { AgentRuntime, ChatCompletionErrorPayload, ModelProvider } from '@/libs/agent-runtime';
import { speakCharacter } from '@/libs/messages/speakCharacter';
import { useGlobalStore } from '@/store/global';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useSettingStore } from '@/store/setting';
import { modelConfigSelectors } from '@/store/setting/selectors/modelConfig';
import { modelProviderSelectors } from '@/store/setting/selectors/modelProvider';
import { ChatMessage } from '@/types/chat';
import { ChatErrorType } from '@/types/fetch';
import { ChatStreamPayload } from '@/types/provider/chat';
import { createErrorResponse } from '@/utils/errorResponse';

import { createHeaderWithAuth, getProviderAuthPayload } from './_auth';

interface ChatCompletionPayload extends Partial<Omit<ChatStreamPayload, 'messages'>> {
  messages: ChatMessage[];
}

interface ChatCompletionOptions {
  signal?: AbortSignal;
}

/**
 * Initializes the AgentRuntime with the client store.
 * @param provider - The provider name.
 * @param payload - Init options
 * @returns The initialized AgentRuntime instance
 *
 * **Note**: if you try to fetch directly, use `fetchOnClient` instead.
 */
export function initializeWithClientStore(provider: string, payload: any) {
  // add auth payload
  const providerAuthPayload = getProviderAuthPayload(provider);
  const commonOptions = {
    // Some provider base openai sdk, so enable it run on browser
    dangerouslyAllowBrowser: true,
  };
  let providerOptions = {};

  switch (provider) {
    default:
    case ModelProvider.OpenAI: {
      providerOptions = {
        baseURL: providerAuthPayload?.endpoint,
      };
      break;
    }
    case ModelProvider.Azure: {
      providerOptions = {
        apiVersion: providerAuthPayload?.azureApiVersion,
        // That's a wired properity, but just remapped it
        apikey: providerAuthPayload?.apiKey,
      };
      break;
    }
    case ModelProvider.ZhiPu: {
      break;
    }
    case ModelProvider.Google: {
      providerOptions = {
        baseURL: providerAuthPayload?.endpoint,
      };
      break;
    }
    case ModelProvider.Moonshot: {
      break;
    }
    case ModelProvider.Bedrock: {
      if (providerAuthPayload?.apiKey) {
        providerOptions = {
          accessKeyId: providerAuthPayload?.awsAccessKeyId,
          accessKeySecret: providerAuthPayload?.awsSecretAccessKey,
          region: providerAuthPayload?.awsRegion,
          sessionToken: providerAuthPayload?.awsSessionToken,
        };
      }
      break;
    }
    case ModelProvider.Ollama: {
      providerOptions = {
        baseURL: providerAuthPayload?.endpoint,
      };
      break;
    }
    case ModelProvider.Perplexity: {
      providerOptions = {
        apikey: providerAuthPayload?.apiKey,
        baseURL: providerAuthPayload?.endpoint,
      };
      break;
    }
    case ModelProvider.Qwen: {
      break;
    }

    case ModelProvider.Anthropic: {
      providerOptions = {
        baseURL: providerAuthPayload?.endpoint,
      };
      break;
    }

    case ModelProvider.Mistral: {
      break;
    }
    case ModelProvider.Groq: {
      providerOptions = {
        apikey: providerAuthPayload?.apiKey,
        baseURL: providerAuthPayload?.endpoint,
      };
      break;
    }
    case ModelProvider.DeepSeek: {
      break;
    }
    case ModelProvider.OpenRouter: {
      break;
    }
    case ModelProvider.TogetherAI: {
      break;
    }
    case ModelProvider.ZeroOne: {
      break;
    }
  }

  /**
   * Configuration override order:
   * payload -> providerOptions -> providerAuthPayload -> commonOptions
   */
  return AgentRuntime.initializeWithProviderOptions(provider, {
    [provider]: {
      ...commonOptions,
      ...providerAuthPayload,
      ...providerOptions,
      ...payload,
    },
  });
}

/**
   * Fetch chat completion on the client side.

   */
const fetchOnClient = async (params: {
  payload: Partial<ChatStreamPayload>;
  provider: string;
  signal?: AbortSignal;
}) => {
  const agentRuntime = await initializeWithClientStore(params.provider, params.payload);
  const data = params.payload as ChatStreamPayload;

  /**
   * if enable login and not signed in, return unauthorized error
   */
  // const userStore = useUserStore.getState();
  // if (userStore.enableAuth() && !userStore.isSignedIn) {
  //   throw AgentRuntimeError.createError(ChatErrorType.InvalidAccessCode);
  // }

  return agentRuntime.chat(data, { signal: params.signal });
};

export const chatCompletion = async (
  params: ChatCompletionPayload,
  options?: ChatCompletionOptions,
) => {
  const { provider = DEFAULT_CHAT_PROVIDER, ...res } = params;
  const { signal } = options ?? {};

  let model = res.model || DEFAULT_CHAT_MODEL;

  if (provider === ModelProvider.Azure) {
    const chatModelCards = modelProviderSelectors.getModelCardsById(provider)(
      useSettingStore.getState(),
    );

    const deploymentName = chatModelCards.find((i) => i.id === model)?.deploymentName;
    if (deploymentName) model = deploymentName;
  }

  const payload = { ...res, model };

  /**
   * Use browser agent runtime
   */
  const enableFetchOnClient = modelConfigSelectors.isProviderFetchOnClient(provider)(
    useSettingStore.getState(),
  );

  if (enableFetchOnClient) {
    try {
      return await fetchOnClient({ payload, provider, signal });
    } catch (e) {
      const {
        errorType = ChatErrorType.BadRequest,
        error: errorContent,
        ...res
      } = e as ChatCompletionErrorPayload;

      const error = errorContent || e;
      // track the error at server side
      console.error(`Route: [${provider}] ${errorType}:`, error);

      return createErrorResponse(errorType, { error, ...res, provider });
    }
  }

  const headers = await createHeaderWithAuth({
    headers: { 'Content-Type': 'application/json' },
    provider,
  });

  // 使用服务端调用
  return await fetch(`/api/chat/${provider}`, {
    body: JSON.stringify({
      payload,
    }),
    headers: headers,
    method: 'POST',
    signal: signal,
  });
};

export const handleSpeakAi = async (message: string) => {
  const viewer = useGlobalStore.getState().viewer;
  const currentAgent = sessionSelectors.currentAgent(useSessionStore.getState());

  speakCharacter(
    {
      expression: 'aa',
      tts: {
        ...currentAgent?.tts,
        message: message,
      },
    },
    viewer,
  );
};

export const toggleVoice = async () => {
  const { toggleVoice, voiceOn } = useSessionStore.getState();
  if (voiceOn) {
    const viewer = useGlobalStore.getState().viewer;
    viewer.model?.stopSpeak();
  }
  toggleVoice();
};
