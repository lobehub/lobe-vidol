import {
  Ai21ProviderCard,
  Ai360ProviderCard,
  AnthropicProviderCard,
  BaichuanProviderCard,
  BedrockProviderCard,
  DEFAULT_MODEL_PROVIDER_LIST,
  DeepSeekProviderCard,
  FireworksAIProviderCard,
  GithubProviderCard,
  GoogleProviderCard,
  GroqProviderCard,
  HuggingFaceProviderCard,
  HunyuanProviderCard,
  MinimaxProviderCard,
  MistralProviderCard,
  MoonshotProviderCard,
  NovitaProviderCard,
  OllamaProviderCard,
  OpenAIProviderCard,
  OpenRouterProviderCard,
  PerplexityProviderCard,
  QwenProviderCard,
  SenseNovaProviderCard,
  SiliconCloudProviderCard,
  SparkProviderCard,
  StepfunProviderCard,
  TaichuProviderCard,
  TogetherAIProviderCard,
  UpstageProviderCard,
  WenxinProviderCard,
  ZeroOneProviderCard,
  ZhiPuProviderCard,
  filterEnabledModels,
} from '@/config/modelProviders';
import {
  DEFAULT_TOUCH_ACTION_CONFIG_FEMALE,
  DEFAULT_TOUCH_ACTION_CONFIG_MALE,
} from '@/constants/touch';
import { GenderEnum } from '@/types/agent';
import { Config } from '@/types/config';
import { ModelProviderCard } from '@/types/llm';

export interface SettingState {
  config: Config;
  defaultModelProviderList: ModelProviderCard[];
  editingCustomCardModel?: { id: string; provider: string } | undefined;
  modelProviderList: ModelProviderCard[];
}

const initialState: SettingState = {
  modelProviderList: DEFAULT_MODEL_PROVIDER_LIST,
  defaultModelProviderList: DEFAULT_MODEL_PROVIDER_LIST,
  config: {
    keyVaults: {},
    locale: 'auto',
    backgroundEffect: 'glow',
    tts: {
      // 默认不启用客户端调用，本地调试时启用，等后续有成熟的解决方案再启用
      clientCall: false,
    },
    languageModel: {
      ai21: {
        enabled: false,
        enabledModels: filterEnabledModels(Ai21ProviderCard),
      },
      ai360: {
        enabled: false,
        enabledModels: filterEnabledModels(Ai360ProviderCard),
      },
      anthropic: {
        enabled: false,
        enabledModels: filterEnabledModels(AnthropicProviderCard),
      },
      azure: {
        enabled: false,
      },
      baichuan: {
        enabled: false,
        enabledModels: filterEnabledModels(BaichuanProviderCard),
      },
      bedrock: {
        enabled: false,
        enabledModels: filterEnabledModels(BedrockProviderCard),
      },
      deepseek: {
        enabled: false,
        enabledModels: filterEnabledModels(DeepSeekProviderCard),
      },
      fireworksai: {
        enabled: false,
        enabledModels: filterEnabledModels(FireworksAIProviderCard),
      },
      github: {
        enabled: false,
        enabledModels: filterEnabledModels(GithubProviderCard),
      },
      google: {
        enabled: false,
        enabledModels: filterEnabledModels(GoogleProviderCard),
      },
      groq: {
        enabled: false,
        enabledModels: filterEnabledModels(GroqProviderCard),
      },
      huggingface: {
        enabled: false,
        enabledModels: filterEnabledModels(HuggingFaceProviderCard),
      },
      hunyuan: {
        enabled: false,
        enabledModels: filterEnabledModels(HunyuanProviderCard),
      },
      minimax: {
        enabled: false,
        enabledModels: filterEnabledModels(MinimaxProviderCard),
      },
      mistral: {
        enabled: false,
        enabledModels: filterEnabledModels(MistralProviderCard),
      },
      moonshot: {
        enabled: false,
        enabledModels: filterEnabledModels(MoonshotProviderCard),
      },
      novita: {
        enabled: false,
        enabledModels: filterEnabledModels(NovitaProviderCard),
      },
      ollama: {
        enabled: true,
        enabledModels: filterEnabledModels(OllamaProviderCard),
        fetchOnClient: true,
      },
      openai: {
        enabled: true,
        enabledModels: filterEnabledModels(OpenAIProviderCard),
      },
      openrouter: {
        enabled: false,
        enabledModels: filterEnabledModels(OpenRouterProviderCard),
      },
      perplexity: {
        enabled: false,
        enabledModels: filterEnabledModels(PerplexityProviderCard),
      },
      qwen: {
        enabled: false,
        enabledModels: filterEnabledModels(QwenProviderCard),
      },
      sensenova: {
        enabled: false,
        enabledModels: filterEnabledModels(SenseNovaProviderCard),
      },
      siliconcloud: {
        enabled: false,
        enabledModels: filterEnabledModels(SiliconCloudProviderCard),
      },
      spark: {
        enabled: false,
        enabledModels: filterEnabledModels(SparkProviderCard),
      },
      stepfun: {
        enabled: false,
        enabledModels: filterEnabledModels(StepfunProviderCard),
      },
      taichu: {
        enabled: false,
        enabledModels: filterEnabledModels(TaichuProviderCard),
      },
      togetherai: {
        enabled: false,
        enabledModels: filterEnabledModels(TogetherAIProviderCard),
      },
      upstage: {
        enabled: false,
        enabledModels: filterEnabledModels(UpstageProviderCard),
      },
      wenxin: {
        enabled: false,
        enabledModels: filterEnabledModels(WenxinProviderCard),
      },
      zeroone: {
        enabled: false,
        enabledModels: filterEnabledModels(ZeroOneProviderCard),
      },
      zhipu: {
        enabled: false,
        enabledModels: filterEnabledModels(ZhiPuProviderCard),
      },
    },
    touch: {
      [GenderEnum.FEMALE]: DEFAULT_TOUCH_ACTION_CONFIG_FEMALE,
      [GenderEnum.MALE]: DEFAULT_TOUCH_ACTION_CONFIG_MALE,
    },
  },
};

export { initialState };
