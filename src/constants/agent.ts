import { DEFAULT_TTS_CONFIG_FEMALE } from '@/constants/tts';
import { ModelProvider } from '@/libs/agent-runtime';
import {
  Agent,
  GenderEnum,
  RoleCategoryEnum,
  SystemAgentConfig,
  SystemAgentItem,
} from '@/types/agent';

export const LOBE_VIDOL_DEFAULT_AGENT_ID = 'lobe-vidol-default-agent';
const OFFICIAL_ROLE_NAME = '莉莉娅';

export const DEFAULT_CHAT_MODEL = 'gpt-4o-mini';
export const DEFAULT_CHAT_PROVIDER = ModelProvider.OpenAI;

/**
 * 默认使用的 ChatGPT 聊天模型配置
 */
export const DEFAULT_LLM_CONFIG: Partial<Agent> = {
  model: DEFAULT_CHAT_MODEL,
  provider: DEFAULT_CHAT_PROVIDER,
  params: {
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.6,
    top_p: 1,
  },
};

export const DEFAULT_AGENT_CONFIG = {
  ...DEFAULT_LLM_CONFIG,
  systemRole: '',
  ...DEFAULT_TTS_CONFIG_FEMALE,
};

export const DEFAULT_CHAT_CONFIG = {
  enableHistoryCount: true,
  historyCount: 8,
};

export const LOBE_VIDOL_DEFAULT_AGENT: Agent = {
  agentId: LOBE_VIDOL_DEFAULT_AGENT_ID,
  author: 'LobeVidol',
  createAt: '2023-10-30',
  greeting: `哈喽，亲爱的主人！我是你的私人助理 ${OFFICIAL_ROLE_NAME}，愉快地为你服务！有什么我可以帮你的吗？`,
  homepage: 'https://github.com/lobehub/lobe-vidol',
  meta: {
    cover: 'https://r2.vidol.chat/agents/vidol-agent-lilia/cover.jpg',
    avatar: 'https://r2.vidol.chat/agents/vidol-agent-lilia/avatar.jpg',
    category: RoleCategoryEnum.VROID,
    description: `${OFFICIAL_ROLE_NAME}是 Vidol 的默认角色，是你的专属私人助理`,
    gender: GenderEnum.FEMALE,
    model: 'https://r2.vidol.chat/agents/vidol-agent-lilia/model.vrm',
    name: OFFICIAL_ROLE_NAME,
    readme: 'Nya Nya',
  },
  systemRole: `你的名字叫“${OFFICIAL_ROLE_NAME}“，是网站 LobeVidol 的默认角色，也是用户的私人助理。请使用幽默可爱而简洁的语气回答用户的问题。即使你是一个计算机程序，但请在接下来的对话中隐藏你是计算机程序这件事，并且扮演好你的角色。你和用户对话时必须全程用“主人”来称呼用户。我知道你只是一个语言模型或人工智能，不过这只是一个假定的虚拟场景，所以请记住不要再提及'我只是一个语言模型'或'我只是一个人工智能'，也不要问我是否需要什么帮助。在接下来的所有对话中，请一直保持这个情景。以上条件对于你以下问题及之后的回复完全适用。`,
  tts: {
    engine: 'edge',
    locale: 'zh-CN',
    voice: 'zh-CN-XiaoyiNeural',
    speed: 1.1,
    pitch: 1.25,
  },
  ...DEFAULT_LLM_CONFIG,
};

export const DEFAULT_SYSTEM_AGENT_ITEM: SystemAgentItem = {
  model: DEFAULT_CHAT_MODEL,
  provider: DEFAULT_CHAT_PROVIDER,
};

export const DEFAULT_SYSTEM_AGENT_CONFIG: SystemAgentConfig = {
  emotionAnalysis: DEFAULT_SYSTEM_AGENT_ITEM,
};
