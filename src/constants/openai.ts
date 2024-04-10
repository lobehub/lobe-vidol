export const OPENAI_API_KEY = 'x-openai-apikey';
export const OPENAI_END_POINT = 'x-openai-endpoint';

interface OPENAI_MODEL {
  /**
   * 最大 Token 数
   */
  maxToken: number;
  /**
   * 模型名称
   */
  name: string;
}

/**
 * OpenAI 模型列表
 */
export const OPENAI_MODEL_LIST: OPENAI_MODEL[] = [
  // GPT 3.5: https://platform.openai.com/docs/models/gpt-3-5
  {
    maxToken: 16_385,
    name: 'gpt-3.5-turbo-1106',
  },
  {
    maxToken: 4096,
    name: 'gpt-3.5-turbo',
  },
  {
    maxToken: 16_385,
    name: 'gpt-3.5-turbo-16k',
  },
  {
    maxToken: 4096,
    name: 'gpt-3.5-turbo-instruct',
  },
  // GPT 4.0 https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
  {
    maxToken: 128_000,
    name: 'gpt-4-1106-preview',
  },
  {
    maxToken: 128_000,
    name: 'gpt-4-vision-preview',
  },
  {
    maxToken: 8192,
    name: 'gpt-4',
  },
  {
    maxToken: 32_768,
    name: 'gpt-4-32k',
  },
  {
    maxToken: 8192,
    name: 'gpt-4-0613',
  },
  {
    maxToken: 32_768,
    name: 'gpt-4-32k-0613',
  },
];
