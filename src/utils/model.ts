const MODEL_SCHEMA = 'model';

export const generateModelKey = (name: string, size: number) => {
  return `${MODEL_SCHEMA}://${name}-${size}`;
};

export const isModelKey = (key: string) => {
  return key.startsWith(MODEL_SCHEMA);
};
