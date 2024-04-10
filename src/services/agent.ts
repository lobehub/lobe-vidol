import { AGENT_INDEX_URL } from '@/constants/common';

/**
 * 请求线上 Agent index
 */
export const getAgentIndex = async (url: string = AGENT_INDEX_URL) => {
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
