import { DEFAULT_MOTION_ANIMATION } from '@/constants/touch';
import { fetchWithProgress } from '@/utils/fetch';
import { getMotionPathByMotionId } from '@/utils/file';
import storage from '@/utils/storage';

export const getMotionBlobUrl = async (motionId: string) => {
  const item = DEFAULT_MOTION_ANIMATION.find((item) => item.id === motionId)!;

  const localMotionPath = getMotionPathByMotionId(item.id);
  let motionBlob = await storage.getItem(localMotionPath);
  if (!motionBlob) {
    motionBlob = await fetchWithProgress(item.url);
  }
  return window.URL.createObjectURL(motionBlob);
};
