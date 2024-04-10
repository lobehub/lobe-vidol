import { DANCE_INDEX_URL } from '@/constants/common';
/**
 * 请求 Dance 列表
 */
export const getLocalDanceList = async () => {
  const res = await fetch('/api/dance/list');

  return res.json();
};

/**
 * 删除本地 Agent 目录
 */
export const deleteLocalDance = async (agentId: string) => {
  const res = await fetch(`/api/dance/${agentId}`, {
    method: 'DELETE',
  });

  return res.json();
};

/**
 * 请求线上 Dance index
 */
export const getDanceIndex = async (url: string = DANCE_INDEX_URL) => {
  const res = await fetch(url);

  return res.json();
};

export const downloadGithubDance = async (url: string) => {
  const res = await fetch('/api/dance/download', {
    body: JSON.stringify({ url }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return res.json();
};
