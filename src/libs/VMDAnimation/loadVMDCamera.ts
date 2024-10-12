import { AnimationClip, PerspectiveCamera } from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';

export async function loadVMDCamera(
  url: string,
  camera: PerspectiveCamera,
  scale: number = 0.1,
): Promise<AnimationClip | null> {
  const loader = new MMDLoader();

  return new Promise((resolve, reject) => {
    loader.loadAnimation(
      url,
      camera,
      (animation) => {
        // 对动画进行处理
        const processedAnimation = processAnimation(animation as AnimationClip, scale);
        resolve(processedAnimation);
      },
      undefined,
      reject,
    );
  });
}

function processAnimation(animation: AnimationClip, scale: number): AnimationClip {
  // 遍历所有轨道并进行调整
  animation.tracks.forEach((track) => {
    if (track.name === '.position') {
      // 调整位置
      for (let i = 0; i < track.values.length; i += 3) {
        track.values[i] *= scale; // 缩放 X 坐标
        track.values[i + 1] *= scale; // 缩放 Y 坐标
        track.values[i + 2] *= scale; // 缩放 Z 坐标
      }
    }
  });

  return animation;
}
