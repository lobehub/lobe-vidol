import localforage from 'localforage';

const createStorage = (name: string) => {
  const instance = localforage.createInstance({
    name: name,
  });

  return {
    getItem: async (key: string): Promise<any> => {
      return await instance.getItem(key);
    },
    setItem: async (key: string, value: any) => {
      return await instance.setItem(key, value);
    },
    removeItem: async (key: string) => {
      return await instance.removeItem(key);
    },
    clear: async () => {
      return await instance.clear();
    },
  };
};

export const vidolStorage = createStorage('LobeVidol');
export const cacheStorage = createStorage('Cache');

// 使用
// defaultStorage.getItem('key');
// anotherStorage.setItem('key', 'value');
