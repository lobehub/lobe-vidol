import { DEFAULT_TTS_CONFIG_FEMALE } from '@/constants/tts';
import { Agent } from '@/types/agent';

export const LOBE_VIDOL_DEFAULT_AGENT_ID = 'lobe-vidol-default-agent';

/**
 * 默认使用的 ChatGPT 聊天模型配置
 */
export const DEFAULT_LLM_CONFIG: Partial<Agent> = {
  model: 'gpt-4o-mini',
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
