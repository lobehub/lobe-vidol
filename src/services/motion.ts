import { DEFAULT_MOTION_ANIMATION } from '@/constants/touch';
import { fetchWithProgress } from '@/utils/fetch';
import { getMotionPathByMotionId } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

export const getMotionBlobUrl = async (motionId: string) => {
  const item = DEFAULT_MOTION_ANIMATION.find((item) => item.id === motionId);
  if (item?.id) {
    const localMotionPath = getMotionPathByMotionId(item.id);
    let motionBlob = await cacheStorage.getItem(localMotionPath);
    if (!motionBlob) {
      motionBlob = await fetchWithProgress(item.url);
      await cacheStorage.setItem(localMotionPath, motionBlob);
    }
    return motionBlob ? window.URL.createObjectURL(motionBlob) : null;
  }
  return null;
};
