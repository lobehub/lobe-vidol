import { chainEmotionAnalysis } from '@/chains/emotionAnalysis';
import { DEFAULT_MODEL_PROVIDER_LIST } from '@/config/modelProviders';
import { DEFAULT_CHAT_MODEL, DEFAULT_CHAT_PROVIDER } from '@/constants/agent';
import { AgentRuntime, ChatCompletionErrorPayload, ModelProvider } from '@/libs/agent-runtime';
import { AudioPlayer } from '@/libs/audio/AudioPlayer';
import { MotionPresetName } from '@/libs/emoteController/motionPresetMap';
import { speakCharacter } from '@/libs/messages/speakCharacter';
import { speakChatItem } from '@/libs/messages/speakChatItem';
import { SpeakAudioOptions } from '@/libs/messages/type';
import { useGlobalStore } from '@/store/global';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useSettingStore } from '@/store/setting';
import { systemAgentSelectors } from '@/store/setting/selectors';
import { modelConfigSelectors } from '@/store/setting/selectors/modelConfig';
import { modelProviderSelectors } from '@/store/setting/selectors/modelProvider';
import { ChatErrorType } from '@/types/fetch';
import { ChatStreamPayload } from '@/types/provider/chat';
import { ExpressionType } from '@/types/touch';
import { createErrorResponse } from '@/utils/errorResponse';
import { FetchSSEOptions, fetchSSE } from '@/utils/fetch';

import { createHeaderWithAuth, getProviderAuthPayload } from './_auth';

interface FetchOptions extends FetchSSEOptions {
  historySummary?: string;
  isWelcomeQuestion?: boolean;
  signal?: AbortSignal | undefined;
}

interface FetchAITaskResultParams extends FetchSSEOptions {
  abortController?: AbortController;
  onError?: (e: Error, rawError?: any) => void;
  /**
   * 加载状态变化处理函数
   * @param loading - 是否处于加载状态
   */
  onLoadingChange?: (loading: boolean) => void;
  /**
   * 请求对象
   */
  params: Partial<ChatStreamPayload>;
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
  params: Partial<ChatStreamPayload>,
  options?: FetchOptions,
) => {
  const { provider = DEFAULT_CHAT_PROVIDER, messages, ...res } = params;
  const { signal } = options ?? {};

  let model = res.model || DEFAULT_CHAT_MODEL;

  if (provider === ModelProvider.Azure) {
    const chatModelCards = modelProviderSelectors.getModelCardsById(provider)(
      useSettingStore.getState(),
    );

    const deploymentName = chatModelCards.find((i) => i.id === model)?.deploymentName;
    if (deploymentName) model = deploymentName;
  }

  const postMessages = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const payload = { ...res, model, messages: postMessages };

  /**
   * Use browser agent runtime
   */
  const enableFetchOnClient = modelConfigSelectors.isProviderFetchOnClient(provider)(
    useSettingStore.getState(),
  );

  let fetcher: typeof fetch | undefined = undefined;

  if (enableFetchOnClient) {
    fetcher = async () => {
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
    };
  }

  const headers = await createHeaderWithAuth({
    headers: { 'Content-Type': 'application/json' },
    provider,
  });

  const providerConfig = DEFAULT_MODEL_PROVIDER_LIST.find((item) => item.id === provider);

  return fetchSSE(`/api/chat/${provider}`, {
    body: JSON.stringify(payload),
    fetcher: fetcher,
    headers,
    method: 'POST',
    onAbort: options?.onAbort,
    onErrorHandle: options?.onErrorHandle,
    onFinish: options?.onFinish,
    onMessageHandle: options?.onMessageHandle,
    signal,
    // use smoothing when enable client fetch
    // https://github.com/lobehub/lobe-chat/issues/3800
    smoothing: providerConfig?.smoothing || enableFetchOnClient,
  });
};

export const fetchPresetTaskResult = async ({
  params,
  onMessageHandle,
  onFinish,
  onError,
  onLoadingChange,
  abortController,
}: FetchAITaskResultParams) => {
  const errorHandle = (error: Error, errorContent?: any) => {
    onLoadingChange?.(false);
    if (abortController?.signal.aborted) {
      return;
    }
    onError?.(error, errorContent);
    console.error(error);
  };

  onLoadingChange?.(true);

  try {
    await chatCompletion(params, {
      onErrorHandle: (error) => {
        errorHandle(new Error(error.message), error);
      },
      onFinish,
      onMessageHandle,
      signal: abortController?.signal,
    });

    onLoadingChange?.(false);
  } catch (e) {
    errorHandle(e as Error);
  }
};

/**
 * 情感分析, 添加情绪类别，然后类似触摸响应播放表情和动作
 * @param message - 文本
 * @returns 表情和动作
 */
export const analyzeEmotion = async (message: string) => {
  // 获取系统代理情感分析模型配置
  const systemAgentForEmotionAnalysis = systemAgentSelectors.emotionAnalysis(
    useSettingStore.getState(),
  );
  // 进行情感分析
  const { messages } = chainEmotionAnalysis(message);

  let expression: ExpressionType = 'aa';
  let motion: MotionPresetName = MotionPresetName.Idle;

  await fetchPresetTaskResult({
    params: {
      ...systemAgentForEmotionAnalysis,
      messages,
      stream: false,
    },
    onMessageHandle: async (chunk) => {
      if (chunk.type === 'text') {
        try {
          const result = JSON.parse(chunk.text);
          expression = result.expression;
          motion = result.motion;
        } catch (e) {
          console.error('情感分析结果解析失败:', e);
        }
      }
    },
  });

  return { expression, motion };
};

/**
 * 情感分析, 播放表情和动作
 * @param message - 文本
 * @param options - 语音选项
 * @returns 表情和动作
 */
export const handleEmotionSpeak = async (message: string, options?: SpeakAudioOptions) => {
  const chatMode = useGlobalStore.getState().chatMode;
  const currentAgent = sessionSelectors.currentAgent(useSessionStore.getState());
  const tts = { ...currentAgent?.tts, message };

  if (chatMode === 'camera') {
    const viewer = useGlobalStore.getState().viewer;
    const { expression, motion } = await analyzeEmotion(message);
    await speakCharacter(
      {
        expression,
        motion,
        tts,
      },
      viewer,
      {
        ...options,
        onComplete: () => {
          options?.onComplete?.();
          viewer.resetToIdle();
        },
      },
    );
  } else {
    await speakChatItem(tts, options);
  }
};

export const handleSpeakAi = async (message: string, options?: SpeakAudioOptions) => {
  const chatMode = useGlobalStore.getState().chatMode;
  const currentAgent = sessionSelectors.currentAgent(useSessionStore.getState());
  const tts = { ...currentAgent?.tts, message };

  if (chatMode === 'camera') {
    const viewer = useGlobalStore.getState().viewer;
    await speakCharacter(
      {
        expression: 'aa',
        tts,
      },
      viewer,
      options,
    );
  } else {
    await speakChatItem(tts, options);
  }
};

export const handleStopSpeak = async () => {
  const viewer = useGlobalStore.getState().viewer;
  const chatMode = useGlobalStore.getState().chatMode;

  if (chatMode === 'camera') {
    viewer.model?.stopSpeak();
  } else {
    const audioPlayer = AudioPlayer.getInstance();
    audioPlayer.stop();
  }
};
