import { AnimationClip, PerspectiveCamera } from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';

export async function loadVMDCamera(
  url: string,
  camera: PerspectiveCamera,
): Promise<AnimationClip | null> {
  const loader = new MMDLoader();

  return new Promise((resolve, reject) => {
    loader.loadAnimation(
      url,
      camera,
      (animation) => {
        resolve(animation as AnimationClip);
      },
      undefined,
      reject,
    );
  });
}
