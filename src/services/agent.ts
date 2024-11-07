import { AGENT_MARKET_URL } from '@/constants/common';
import { isLocaleNotSupport } from '@/constants/locale';
import { Locales, normalizeLocale } from '@/locales/resources';

/**
 * 请求线上 Agent index
 */
export const getAgentIndex = async (locale: Locales) => {
  const url = isLocaleNotSupport(locale)
    ? AGENT_MARKET_URL
    : `${AGENT_MARKET_URL}/index.${normalizeLocale(locale)}.json`;

  const res = await fetch(url);

  return res.json();
};

export const getAgentDetail = async (id: string, locale: Locales) => {
  const url = isLocaleNotSupport(locale)
    ? `${AGENT_MARKET_URL}/${id}.json`
    : `${AGENT_MARKET_URL}/${id}.${normalizeLocale(locale)}.json`;

  const res = await fetch(url);

  return res.json();
};

export const downloadGithubAgent = async (url: string) => {
  const res = await fetch('/api/agent/download', {
    body: JSON.stringify({ url }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return res.json();
};
