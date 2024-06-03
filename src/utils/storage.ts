import localforage from 'localforage';

export const getItem = async (key: string) => {
  return await localforage.getItem(key);
};

export const setItem = async (key: string, value: any) => {
  return await localforage.setItem(key, value);
};

export const removeItem = async (key: string) => {
  return await localforage.removeItem(key);
};

export default {
  getItem,
  setItem,
  removeItem,
};
