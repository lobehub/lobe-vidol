import localforage from 'localforage';

const createStorage = (name: string) => {
  const instance = localforage.createInstance({
    name: name,
  });

  return {
    clear: async () => {
      return await instance.clear();
    },
    getItem: async (key: string): Promise<any> => {
      return await instance.getItem(key);
    },
    keys: async () => {
      return await instance.keys();
    },
    removeItem: async (key: string) => {
      return await instance.removeItem(key);
    },
    setItem: async (key: string, value: any) => {
      return await instance.setItem(key, value);
    },
    /**
     * 获取存储大小(M)
     */
    size: async () => {
      const keys = await instance.keys();
      let size = 0;
      for (const key of keys) {
        const item = await instance.getItem(key);
        if (item) {
          size += (item as Blob).size || 0;
        }
      }

      size = Math.floor(size / (1024 * 1024));
      return size;
    },
  };
};
/**
 * 用于存储应用数据，如 session列表，角色列表，舞蹈列表等。
 */
export const vidolStorage = createStorage('LobeVidol');
/**
 * 用于缓存各类生成数据，如角色的语音文件，模型文件，音乐文件，音频文件等。
 */
export const cacheStorage = createStorage('Cache');
