const MODEL_SCHEMA = 'model';
const AUDIO_SCHEMA = 'audio';
const Dance_SCHEMA = 'dance';

export const getModelPathByAgentId = (id: string) => {
  return `${MODEL_SCHEMA}://${id}`;
};

export const getAudioPathByDanceId = (id: string) => {
  return `${AUDIO_SCHEMA}://${id}`;
};

export const getDancePathByDanceId = (id: string) => {
  return `${Dance_SCHEMA}://${id}`;
};
