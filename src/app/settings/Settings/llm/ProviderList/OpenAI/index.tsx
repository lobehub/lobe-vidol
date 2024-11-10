'use client';

import { OpenAIProviderCard } from '@/config/modelProviders';

import { ProviderItem } from '../../type';

export const useOpenAIProvider = (): ProviderItem => {
  return {
    ...OpenAIProviderCard,
    proxyUrl: {
      placeholder: 'https://api.openai.com/v1',
    },
    showApiKey: true,
  };
};
