import * as THREE from 'three';

import { convert } from '@/libs/VMDAnimation/vmd2vrmanim';

export async function loadVMDCamera(url: string): Promise<THREE.AnimationClip | null> {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  const animation = convert(buffer);
  return bindToCamera(animation);
}

function bindToCamera(animation: any): THREE.AnimationClip {
  const tracks: THREE.KeyframeTrack[] = [];

  if (animation.position) {
    tracks.push(
      new THREE.VectorKeyframeTrack(
        '.position',
        animation.position.times,
        animation.position.values,
      ),
    );
  }

  if (animation.rotation) {
    tracks.push(
      new THREE.QuaternionKeyframeTrack(
        '.quaternion',
        animation.rotation.times,
        animation.rotation.values,
      ),
    );
  }

  return new THREE.AnimationClip('camera', -1, tracks);
}
