import { AnimationClip, PerspectiveCamera } from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';

export async function loadVMDCamera(
  url: string,
  camera: PerspectiveCamera,
  scale: number = 0.085, // 添加缩放参数，默认为 0.1
): Promise<AnimationClip | null> {
  const loader = new MMDLoader();
  const helper = new MMDAnimationHelper({ afterglow: 2.0 });

  return new Promise((resolve, reject) => {
    loader.loadAnimation(
      url,
      camera,
      (animation) => {
        // 使用 MMDAnimationHelper 添加相机动画
        helper.add(camera, {
          animation: animation as AnimationClip,
          physics: false,
        });

        // MMDAnimationHelper 会修改原始的 AnimationClip, 进行相关转化
        const processedAnimation = animation as AnimationClip;

        // 对动画进行缩放处理
        scaleAnimation(processedAnimation, scale);

        resolve(processedAnimation);
      },
      undefined,
      reject,
    );
  });
}

/**
 * 1. VRM模型通常以米为单位，1个单位 = 1米, 标准VRM模型身高通常在1.5到1.8米之间
 * 2. MMD模型的1个单位 ≈ 1厘米，标准MMD模型身高 ≈ 20单位 ≈ 20厘米
 * 3. 所以 MMD 的 VMD 文件比例尺是不一样的。
 * @param animation
 * @param scale
 */
function scaleAnimation(animation: AnimationClip, scale: number): void {
  animation.tracks.forEach((track) => {
    if (track.name === '.position') {
      for (let i = 0; i < track.values.length; i += 3) {
        track.values[i] *= scale;
        track.values[i + 1] *= scale;
        track.values[i + 2] *= scale;
      }
    } else if (track.name === '.target') {
      for (let i = 0; i < track.values.length; i += 3) {
        track.values[i] *= scale;
        track.values[i + 1] *= scale;
        track.values[i + 2] *= scale;
      }
    }
    // 注意：我们不缩放旋转和FOV，因为这些通常不需要缩放
  });
}
