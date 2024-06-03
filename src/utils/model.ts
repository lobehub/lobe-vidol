import storage from '@/utils/storage';

const MODEL_SCHEMA = 'model';

export const generateLocalModelKey = (name: string, size: number) => {
  return `${MODEL_SCHEMA}://${name}-${size}`;
};

export const generateRemoteModelKey = (id: string) => {
  return `${MODEL_SCHEMA}://${id}`;
};

export const isModelKey = (key: string) => {
  return key.startsWith(MODEL_SCHEMA);
};

export const checkLocalModel = async (agentId: string) => {
  const key = generateRemoteModelKey(agentId);
  const model = await storage.getItem(key);
  return !!model;
};
