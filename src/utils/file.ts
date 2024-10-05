const MODEL_SCHEMA = 'model';
const AUDIO_SCHEMA = 'audio';
const DANCE_SCHEMA = 'dance';
const BACKGROUND_SCHEMA = 'background';
const MOTION_SCHEMA = 'motion';

export const getModelPathByAgentId = (agentId: string) => {
  return `${MODEL_SCHEMA}://${agentId}`;
};

export const isLocalModelPath = (path: string) => {
  return path.startsWith(MODEL_SCHEMA);
};

export const getAudioPathByDanceId = (danceId: string) => {
  return `${AUDIO_SCHEMA}://${danceId}`;
};

export const getMotionPathByMotionId = (motionId: string) => {
  return `${MOTION_SCHEMA}://${motionId}`;
};

export const getDancePathByDanceId = (danceId: string) => {
  return `${DANCE_SCHEMA}://${danceId}`;
};

export const getBackgroundPathById = (backgroundId: string) => {
  return `${BACKGROUND_SCHEMA}://${backgroundId}`;
};
