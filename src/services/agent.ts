import { AGENT_MARKET_URL } from '@/constants/common';

/**
 * 请求线上 Agent index
 */
export const getAgentIndex = async (url: string = `${AGENT_MARKET_URL}/index.json`) => {
  const res = await fetch(url);

  return res.json();
};

export const getAgentDetail = async (id: string) => {
  const res = await fetch(`${AGENT_MARKET_URL}/${id}.json`);

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
