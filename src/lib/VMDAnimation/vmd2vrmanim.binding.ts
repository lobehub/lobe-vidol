import { VRM, VRMExpressionPresetName, VRMHumanBoneName } from '@pixiv/three-vrm';
import {
  AnimationClip,
  KeyframeTrack,
  NumberKeyframeTrack,
  Object3D,
  QuaternionKeyframeTrack,
  Vector3,
  VectorKeyframeTrack,
} from 'three';
import { convert as convertSync } from './vmd2vrmanim';
import VRMIKHandler from './vrm-ik-handler';

export interface AnimationData {
  duration: number;
  timelines: Timeline[];
}

export interface Timeline {
  name: VRMHumanBoneName | VRMExpressionPresetName;
  type: string;
  isIK?: boolean;
  times: number[];
  values: number[];
}

export interface VRMOffsets {
  hipsOffset?: number[];
  leftFootOffset?: number[];
  rightFootOffset?: number[];
  leftToeOffset?: number[];
  rightToeOffset?: number[];
}

export function convert(buffer: ArrayBufferLike, vrm?: VRM) {
  return convertSync(buffer, vrm ? toOffset(vrm) : undefined);
}

export function toOffset(vrm: VRM): VRMOffsets {
  const { humanoid } = vrm;
  if (!humanoid) throw new Error('VRM does not have humanoid');
  const currentPose = humanoid.getNormalizedPose();
  humanoid.resetNormalizedPose();
  const hips = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips);
  const leftFoot = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftFoot);
  const leftToe = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftToes);
  const rightFoot = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightFoot);
  const rightToe = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightToes);
  humanoid.setNormalizedPose(currentPose);
  return {
    hipsOffset: calculatePosition(hips, hips),
    leftFootOffset: calculatePosition(hips, leftFoot),
    leftToeOffset: calculatePosition(leftFoot, leftToe),
    rightFootOffset: calculatePosition(hips, rightFoot),
    rightToeOffset: calculatePosition(rightFoot, rightToe),
  };
}

const tempV3 = new Vector3();
function calculatePosition(from?: Object3D | null, to?: Object3D | null) {
  if (!from || !to) return;
  let current: Object3D | null = to;
  const chain: Object3D[] = [to];
  while (current.parent && current !== from) {
    chain.push(current.parent);
    current = current.parent;
  }
  if (current == null) return;
  chain.reverse();
  const position = tempV3.set(0, 0, 0);
  for (const node of chain) position.add(node.position);
  return position.toArray();
}

export function bindToVRM(data: AnimationData, vrm: VRM) {
  const tracks: KeyframeTrack[] = [];
  for (const { type, name, isIK, times, values } of data.timelines) {
    let srcName: string;
    switch (type) {
      case 'morph': {
        const track = vrm.expressionManager?.getExpressionTrackName(name);
        if (!track) continue;
        srcName = track;
        break;
      }
      case 'position':
      case 'rotation': {
        if (isIK) {
          const handler = VRMIKHandler.get(vrm);
          const target = handler.getAndEnableIK(name as VRMHumanBoneName);
          if (!target) continue;
          srcName = target.name;
        } else {
          const bone = vrm.humanoid?.getNormalizedBone(name as VRMHumanBoneName);
          if (!bone) continue;
          srcName = bone.node.name;
        }
        break;
      }
      default:
        continue;
    }
    switch (type) {
      case 'morph':
        tracks.push(new NumberKeyframeTrack(srcName, times, values));
        break;
      case 'position':
        tracks.push(new VectorKeyframeTrack(`${srcName}.position`, times, values));
        break;
      case 'rotation':
        tracks.push(new QuaternionKeyframeTrack(`${srcName}.quaternion`, times, values));
        break;
    }
  }
  return new AnimationClip(`clip${Date.now()}`, data.duration, tracks);
}
