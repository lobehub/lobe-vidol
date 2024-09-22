import { ChatModelCard } from '@/types/llm';

export const OPENAI_API_KEY = 'x-openai-apikey';
export const OPENAI_END_POINT = 'x-openai-endpoint';

/**
 * OpenAI 模型列表
 */
export const OPENAI_MODEL_LIST: ChatModelCard[] = [
  {
    description: 'Currently points to o1-mini-2024-09-12',
    displayName: 'OpenAI o1-mini',
    enabled: true,
    id: 'o1-mini',
    maxOutput: 65_536,
    tokens: 128_000,
  },
  {
    description: 'Currently points to o1-preview-2024-09-12',
    displayName: 'OpenAI o1-preview',
    enabled: true,
    id: 'o1-preview',
    maxOutput: 32_768,
    tokens: 128_000,
  },

  {
    description: 'Currently points to gpt-4o-mini-2024-07-18',
    displayName: 'GPT-4o mini',
    enabled: true,
    functionCall: true,
    id: 'gpt-4o-mini',
    maxOutput: 16_385,
    tokens: 128_000,
    vision: true,
  },

  {
    description: 'Currently points to gpt-4o-2024-05-13',
    displayName: 'GPT-4o',
    enabled: true,
    functionCall: true,
    maxOutput: 4096,
    id: 'gpt-4o',
    tokens: 128_000,
    vision: true,
  },
  {
    description: 'GPT-4 Turbo 视觉版 (240409)',
    displayName: 'GPT-4 Turbo Vision (240409)',
    functionCall: true,
    id: 'gpt-4-turbo-2024-04-09',
    maxOutput: 4096,
    tokens: 128_000,
    vision: true,
  },

  {
    description: 'Currently points to gpt-4-0613',
    displayName: 'GPT-4',
    functionCall: true,
    id: 'gpt-4',
    maxOutput: 8192,
    tokens: 8192,
  },
  {
    description:
      'GPT 3.5 Turbo，适用于各种文本生成和理解任务，Currently points to gpt-3.5-turbo-0125',
    displayName: 'GPT-3.5 Turbo',
    functionCall: true,
    maxOutput: 4096,
    id: 'gpt-3.5-turbo',
    tokens: 16_385,
  },
];
