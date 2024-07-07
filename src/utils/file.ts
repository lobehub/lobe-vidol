const MODEL_SCHEMA = 'model';
const AUDIO_SCHEMA = 'audio';
const Dance_SCHEMA = 'dance';

export const getModelPathByAgentId = (agentId: string) => {
  return `${MODEL_SCHEMA}://${agentId}`;
};

export const isLocalModelPath = (path: string) => {
  return path.startsWith(MODEL_SCHEMA);
};

export const getAudioPathByDanceId = (danceId: string) => {
  return `${AUDIO_SCHEMA}://${danceId}`;
};

export const getDancePathByDanceId = (danceId: string) => {
  return `${Dance_SCHEMA}://${danceId}`;
};
