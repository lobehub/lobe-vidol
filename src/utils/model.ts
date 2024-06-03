import storage from '@/utils/storage';

const MODEL_SCHEMA = 'model';

export const getModelPathByAgentId = (id: string) => {
  return `${MODEL_SCHEMA}://${id}`;
};

export const isModelPath = (key: string) => {
  return key.startsWith(MODEL_SCHEMA);
};

export const checkLocalModel = async (agentId: string) => {
  const key = getModelPathByAgentId(agentId);
  const model = await storage.getItem(key);
  return !!model;
};
