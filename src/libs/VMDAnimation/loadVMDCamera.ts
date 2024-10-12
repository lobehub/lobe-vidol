import { AnimationClip, Camera } from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';

export async function loadVMDCamera(
  url: string,
  camera: Camera,
): Promise<AnimationClip | undefined> {
  const loader = new MMDLoader();

  return new Promise((resolve, reject) => {
    loader.loadAnimation(
      url,
      camera,
      (animation) => {
        if (!animation) {
          console.warn('无法加载 VMD 相机动画');
          resolve(undefined);
          return;
        }

        if (!(animation instanceof AnimationClip)) {
          console.warn('加载的动画不是 AnimationClip 类型');
          resolve(undefined);
          return;
        }

        console.log('VMD相机动画加载成功:', animation);

        // 暂时不应用动画，只返回它
        resolve(animation);
      },
      undefined,
      reject,
    );
  });
}
