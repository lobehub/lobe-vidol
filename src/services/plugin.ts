import { PluginIndexResponse } from '@/types/plugin';

/**
 * 获取插件列表
 */
export const getPluginIndex = async () => {
  const res = await fetch('/api/plugin/store', {
    method: 'GET',
  });

  return res.json() as Promise<PluginIndexResponse>;
};
