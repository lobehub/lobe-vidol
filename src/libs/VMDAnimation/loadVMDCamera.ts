import { Parser } from 'mmd-parser';
import {
  AnimationClip,
  Euler,
  Quaternion,
  QuaternionKeyframeTrack,
  Vector3,
  VectorKeyframeTrack,
} from 'three';

export async function loadVMDCamera(url: string): Promise<AnimationClip | null> {
  const parser = new Parser();
  const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
  const vmd = parser.parseVmd(arrayBuffer);

  if (!vmd.cameras || vmd.cameras.length === 0) {
    console.warn('No camera animation found in VMD file');
    return null;
  }

  const cameraPositions: number[] = [];
  const cameraQuaternions: number[] = [];
  const cameraTimes: number[] = [];

  vmd.cameras.forEach((camera) => {
    const time = camera.frameNum / 30; // 假设 30fps
    cameraTimes.push(time);

    // 直接使用 VMD 中的位置数据，不进行转换
    const position = new Vector3(camera.position[0], camera.position[1], camera.position[2]);
    cameraPositions.push(position.x, position.y, position.z);

    // 将 VMD 的欧拉角转换为四元数
    const rotation = new Euler(camera.rotation[0], camera.rotation[1], camera.rotation[2], 'ZYX');
    const quaternion = new Quaternion().setFromEuler(rotation);
    cameraQuaternions.push(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  });

  const positionTrack = new VectorKeyframeTrack('.position', cameraTimes, cameraPositions);
  const rotationTrack = new QuaternionKeyframeTrack('.quaternion', cameraTimes, cameraQuaternions);

  return new AnimationClip('camera', -1, [positionTrack, rotationTrack]);
}
