import {
  VRMExpressionPresetName as BlendShapePresetName,
  VRMHumanBoneName as HumanoidBoneName,
} from '@pixiv/three-vrm-core';
import { CharsetEncoder, Parser, VmdFile } from 'mmd-parser';
import { MathUtils, Quaternion, Vector3 } from 'three';
import { AnimationData, Timeline, VRMOffsets } from './vmd2vrmanim.binding';

export function isTruely<T>(x: T): x is Exclude<T, false | '' | 0 | null | undefined> {
  return !!x;
}

// Hot patch Charset Encoder in MMD-Parser to forgive invalid charcodes.
{
  const { s2u } = CharsetEncoder.prototype;
  CharsetEncoder.prototype.s2u = function (array: any) {
    try {
      return s2u.call(this, array);
    } catch (e) {
      if (typeof e === 'string') {
        console.warn(`Charset encoder: ${e}`);
        return '';
      }
      throw e;
    }
  };
}

const tempV3 = new Vector3();
const tempQ = new Quaternion();

const enum VMDBoneNames {
  Root = '全ての親',
  Center = 'センター',
  Hips = '下半身',
  Spine = '上半身',
  Chest = '上半身2',
  Neck = '首',
  Head = '頭',
  LeftEye = '左目',
  LeftShoulder = '左肩',
  LeftUpperArm = '左腕',
  LeftLowerArm = '左ひじ',
  LeftHand = '左手首',
  LeftThumbProximal = '左親指０',
  LeftThumbIntermediate = '左親指１',
  LeftThumbDistal = '左親指２',
  LeftIndexProximal = '左人指１',
  LeftIndexIntermediate = '左人指２',
  LeftIndexDistal = '左人指３',
  LeftMiddleProximal = '左中指１',
  LeftMiddleIntermediate = '左中指２',
  LeftMiddleDistal = '左中指３',
  LeftRingProximal = '左薬指１',
  LeftRingIntermediate = '左薬指２',
  LeftRingDistal = '左薬指３',
  LeftLittleProximal = '左小指１',
  LeftLittleIntermediate = '左小指２',
  LeftLittleDistal = '左小指３',
  LeftUpperLeg = '左足',
  LeftLowerLeg = '左ひざ',
  LeftFoot = '左足首',
  LeftFootIK = '左足ＩＫ',
  LeftToes = '左つま先',
  LeftToeIK = '左つま先ＩＫ',
  RightEye = '右目',
  RightShoulder = '右肩',
  RightUpperArm = '右腕',
  RightLowerArm = '右ひじ',
  RightHand = '右手首',
  RightThumbProximal = '右親指０',
  RightThumbIntermediate = '右親指１',
  RightThumbDistal = '右親指２',
  RightIndexProximal = '右人指１',
  RightIndexIntermediate = '右人指２',
  RightIndexDistal = '右人指３',
  RightMiddleProximal = '右中指１',
  RightMiddleIntermediate = '右中指２',
  RightMiddleDistal = '右中指３',
  RightRingProximal = '右薬指１',
  RightRingIntermediate = '右薬指２',
  RightRingDistal = '右薬指３',
  RightLittleProximal = '右小指１',
  RightLittleIntermediate = '右小指２',
  RightLittleDistal = '右小指３',
  RightUpperLeg = '右足',
  RightLowerLeg = '右ひざ',
  RightFoot = '右足首',
  RightFootIK = '右足ＩＫ',
  RightToes = '右つま先',
  RightToeIK = '右つま先ＩＫ',
}

const enum VMDMorphNames {
  Blink = 'まばたき',
  BlinkR = 'ウィンク',
  BlinkL = 'ウィンク右',
  A = 'あ',
  I = 'い',
  U = 'う',
  E = 'え',
  O = 'お',
}

interface Keyframe {
  boneName: string;
  frameNum: number;
  position: Vector3;
  rotation: Quaternion;
}

interface LerpKeyframe extends Keyframe {
  isNew?: boolean;
}

interface IKOffsetInit {
  /** Default X */ x: number;
  /** Default Y */ y: number;
  /** Default Z */ z: number;
  /** Scale (All axis) */ s?: number;
  /** Scale X */ sx?: number;
  /** Scale Y */ sy?: number;
  /** Scale Z */ sz?: number;
  /** Offset (All axis) */ o?: number;
  /** Offset X */ ox?: number;
  /** Offset Y */ oy?: number;
  /** Offset Z */ oz?: number;
  /** Force override X value? */ dx?: boolean;
  /** Force override Y value? */ dy?: boolean;
  /** Force override Z value? */ dz?: boolean;
}

// const { HumanoidBoneName, BlendShapePresetName } = VRMSchema;

const VRM_VMD_BONE_MAP = new Map<VMDBoneNames, HumanoidBoneName>([
  [VMDBoneNames.Hips, HumanoidBoneName.Hips],
  [VMDBoneNames.Spine, HumanoidBoneName.Spine],
  [VMDBoneNames.Chest, HumanoidBoneName.Chest],
  [VMDBoneNames.Neck, HumanoidBoneName.Neck],
  [VMDBoneNames.Head, HumanoidBoneName.Head],
  [VMDBoneNames.LeftEye, HumanoidBoneName.LeftEye],
  [VMDBoneNames.LeftShoulder, HumanoidBoneName.LeftShoulder],
  [VMDBoneNames.LeftUpperArm, HumanoidBoneName.LeftUpperArm],
  [VMDBoneNames.LeftLowerArm, HumanoidBoneName.LeftLowerArm],
  [VMDBoneNames.LeftHand, HumanoidBoneName.LeftHand],
  [VMDBoneNames.LeftThumbProximal, HumanoidBoneName.LeftThumbProximal],
  [VMDBoneNames.LeftThumbIntermediate, HumanoidBoneName.LeftThumbMetacarpal],
  [VMDBoneNames.LeftThumbDistal, HumanoidBoneName.LeftThumbDistal],
  [VMDBoneNames.LeftIndexProximal, HumanoidBoneName.LeftIndexProximal],
  [VMDBoneNames.LeftIndexIntermediate, HumanoidBoneName.LeftIndexIntermediate],
  [VMDBoneNames.LeftIndexDistal, HumanoidBoneName.LeftIndexDistal],
  [VMDBoneNames.LeftMiddleProximal, HumanoidBoneName.LeftMiddleProximal],
  [VMDBoneNames.LeftMiddleIntermediate, HumanoidBoneName.LeftMiddleIntermediate],
  [VMDBoneNames.LeftMiddleDistal, HumanoidBoneName.LeftMiddleDistal],
  [VMDBoneNames.LeftRingProximal, HumanoidBoneName.LeftRingProximal],
  [VMDBoneNames.LeftRingIntermediate, HumanoidBoneName.LeftRingIntermediate],
  [VMDBoneNames.LeftRingDistal, HumanoidBoneName.LeftRingDistal],
  [VMDBoneNames.LeftLittleProximal, HumanoidBoneName.LeftLittleProximal],
  [VMDBoneNames.LeftLittleIntermediate, HumanoidBoneName.LeftLittleIntermediate],
  [VMDBoneNames.LeftLittleDistal, HumanoidBoneName.LeftLittleDistal],
  [VMDBoneNames.LeftUpperLeg, HumanoidBoneName.LeftUpperLeg],
  [VMDBoneNames.LeftLowerLeg, HumanoidBoneName.LeftLowerLeg],
  [VMDBoneNames.LeftFoot, HumanoidBoneName.LeftFoot],
  [VMDBoneNames.LeftToes, HumanoidBoneName.LeftToes],
  [VMDBoneNames.RightEye, HumanoidBoneName.RightEye],
  [VMDBoneNames.RightShoulder, HumanoidBoneName.RightShoulder],
  [VMDBoneNames.RightUpperArm, HumanoidBoneName.RightUpperArm],
  [VMDBoneNames.RightLowerArm, HumanoidBoneName.RightLowerArm],
  [VMDBoneNames.RightHand, HumanoidBoneName.RightHand],
  [VMDBoneNames.RightThumbProximal, HumanoidBoneName.RightThumbProximal],
  [VMDBoneNames.RightThumbIntermediate, HumanoidBoneName.RightThumbMetacarpal],
  [VMDBoneNames.RightThumbDistal, HumanoidBoneName.RightThumbDistal],
  [VMDBoneNames.RightIndexProximal, HumanoidBoneName.RightIndexProximal],
  [VMDBoneNames.RightIndexIntermediate, HumanoidBoneName.RightIndexIntermediate],
  [VMDBoneNames.RightIndexDistal, HumanoidBoneName.RightIndexDistal],
  [VMDBoneNames.RightMiddleProximal, HumanoidBoneName.RightMiddleProximal],
  [VMDBoneNames.RightMiddleIntermediate, HumanoidBoneName.RightMiddleIntermediate],
  [VMDBoneNames.RightMiddleDistal, HumanoidBoneName.RightMiddleDistal],
  [VMDBoneNames.RightRingProximal, HumanoidBoneName.RightRingProximal],
  [VMDBoneNames.RightRingIntermediate, HumanoidBoneName.RightRingIntermediate],
  [VMDBoneNames.RightRingDistal, HumanoidBoneName.RightRingDistal],
  [VMDBoneNames.RightLittleProximal, HumanoidBoneName.RightLittleProximal],
  [VMDBoneNames.RightLittleIntermediate, HumanoidBoneName.RightLittleIntermediate],
  [VMDBoneNames.RightLittleDistal, HumanoidBoneName.RightLittleDistal],
  [VMDBoneNames.RightUpperLeg, HumanoidBoneName.RightUpperLeg],
  [VMDBoneNames.RightLowerLeg, HumanoidBoneName.RightLowerLeg],
  [VMDBoneNames.RightFoot, HumanoidBoneName.RightFoot],
  [VMDBoneNames.RightToes, HumanoidBoneName.RightToes],
]);
const VMD_VRM_IK_MAP = new Map<VMDBoneNames, HumanoidBoneName>([
  [VMDBoneNames.LeftFootIK, HumanoidBoneName.LeftFoot],
  [VMDBoneNames.LeftToeIK, HumanoidBoneName.LeftToes],
  [VMDBoneNames.RightFootIK, HumanoidBoneName.RightFoot],
  [VMDBoneNames.RightToeIK, HumanoidBoneName.RightToes],
]);
const VMD_BONE_NAMES = new Set<VMDBoneNames>(VRM_VMD_BONE_MAP.keys());
Array.from(VMD_VRM_IK_MAP.keys()).forEach(VMD_BONE_NAMES.add, VMD_BONE_NAMES);
VMD_BONE_NAMES.add(VMDBoneNames.Root);
VMD_BONE_NAMES.add(VMDBoneNames.Center);
const VMD_VRM_MORTH_MAP = new Map<VMDMorphNames, BlendShapePresetName>([
  [VMDMorphNames.Blink, BlendShapePresetName.Blink],
  [VMDMorphNames.BlinkL, BlendShapePresetName.BlinkLeft],
  [VMDMorphNames.BlinkR, BlendShapePresetName.BlinkRight],
  [VMDMorphNames.A, BlendShapePresetName.Aa],
  [VMDMorphNames.I, BlendShapePresetName.Ih],
  [VMDMorphNames.U, BlendShapePresetName.Ou],
  [VMDMorphNames.E, BlendShapePresetName.Ee],
  [VMDMorphNames.O, BlendShapePresetName.Oh],
]);
const IK_OFFSET_INIT = new Map<VMDBoneNames, IKOffsetInit>([
  [VMDBoneNames.Center, { x: 0, y: 1, z: 0, s: 10 }],
  [VMDBoneNames.LeftFootIK, { x: 1, y: 1, z: 0, s: 10, dx: true }],
  [VMDBoneNames.RightFootIK, { x: -1, y: 1, z: 0, s: 10, dx: true }],
  [VMDBoneNames.LeftToeIK, { x: 0, y: -1, z: -1, s: 10, oy: 2.5, dx: true, dz: true }],
  [VMDBoneNames.RightToeIK, { x: 0, y: -1, z: -1, s: 10, oy: 2.5, dx: true, dz: true }],
]);
const V3_ZERO = new Vector3();
const Q_IDENTITY = new Quaternion();
const Z_30_DEG_CW = new Quaternion().setFromAxisAngle(tempV3.set(0, 0, 1), 30 * MathUtils.DEG2RAD);
const Z_30_DEG_CCW = Z_30_DEG_CW.clone().invert();

export function convert(buffer: ArrayBufferLike, vrmOffset?: VRMOffsets): AnimationData {
  const vmd = new Parser().parseVmd(buffer);
  const morphs = convertMorphs(vmd);
  const motions = convertMotions(vmd, vrmOffset);
  return {
    duration: Math.max(morphs.duration, motions.duration),
    timelines: Array.prototype.concat(morphs.timelines, motions.timelines),
  };
}

function convertMorphs({ morphs }: VmdFile): AnimationData {
  sortFrames(morphs);
  const timelines = new Map<string, Timeline>();
  for (const { morphName, weight, frameNum } of morphs) {
    const name = VMD_VRM_MORTH_MAP.get(morphName as VMDMorphNames);
    if (!name) continue;
    let timeline = timelines.get(name);
    if (!timeline)
      timelines.set(
        name,
        (timeline = {
          name,
          type: 'morph',
          times: [],
          values: [],
        }),
      );
    const { times, values } = timeline;
    const time = frameNum / 30;
    const timeIndex = times.findIndex((t) => t === time);
    if (timeIndex < 0) {
      times.push(time);
      values.push(weight);
    } else {
      values[timeIndex] = Math.max(values[timeIndex], weight);
    }
  }
  return {
    timelines: Array.from(timelines.values()),
    duration: getLastFrameNum(morphs) / 30,
  };
}

function convertMotions({ motions }: VmdFile, vrmOffset?: VRMOffsets): AnimationData {
  sortFrames(motions);
  const timelines: Timeline[] = [];
  const boneTlMap = new Map<VMDBoneNames, Keyframe[]>();
  for (const name of VMD_BONE_NAMES) boneTlMap.set(name, []);
  for (const { boneName, frameNum, position, rotation } of motions)
    boneTlMap.get(boneName as VMDBoneNames)?.push({
      boneName,
      frameNum,
      position: new Vector3().fromArray(position),
      rotation: new Quaternion().fromArray(rotation),
    });
  fixPositions(boneTlMap, vrmOffset);
  for (const [boneName, timeline] of boneTlMap) {
    let name = VRM_VMD_BONE_MAP.get(boneName);
    let isIK = false;
    if (!name) {
      isIK = VMD_VRM_IK_MAP.has(boneName);
      name = VMD_VRM_IK_MAP.get(boneName);
    }
    if (name) {
      const times: number[] = [];
      const positions: number[] = [];
      const rotations: number[] = [];
      for (const f of timeline) {
        const i = times.push(f.frameNum / 30) - 1;
        f.position.toArray(positions, i * 3);
        f.rotation.toArray(rotations, i * 4);
      }
      if (times.length) {
        timelines.push({
          name,
          type: 'rotation',
          isIK,
          times,
          values: rotations,
        });
        if (isIK || name === HumanoidBoneName.Hips)
          timelines.push({
            name,
            type: 'position',
            isIK,
            times,
            values: positions,
          });
      }
    }
  }
  return { timelines, duration: getLastFrameNum(motions) / 30 };
}

function fixPositions(tls: Map<string, Keyframe[]>, vrmOffset: VRMOffsets = {}) {
  const centerOffset = mergeTimelines(
    tls,
    VMDBoneNames.Center,
    offsetToTimeline(VMDBoneNames.Center, vrmOffset.hipsOffset),
  );
  const hipsTl = mergeTimelines(tls, VMDBoneNames.Root, centerOffset, VMDBoneNames.Hips);
  tls.set(
    VMDBoneNames.Spine,
    localizeTimeline(
      hipsTl,
      mergeTimelines(tls, VMDBoneNames.Root, centerOffset, VMDBoneNames.Hips),
    ),
  );
  tls.set(VMDBoneNames.Hips, hipsTl);
  const leftFootOffset = offsetToTimeline(VMDBoneNames.LeftFootIK, vrmOffset.leftFootOffset);
  const rightFootOffset = offsetToTimeline(VMDBoneNames.RightFootIK, vrmOffset.rightFootOffset);
  if (tls.has(VMDBoneNames.LeftToeIK))
    tls.set(
      VMDBoneNames.LeftToeIK,
      mergeTimelines(
        tls,
        VMDBoneNames.Root,
        leftFootOffset,
        VMDBoneNames.LeftFootIK,
        offsetToTimeline(VMDBoneNames.RightToeIK, vrmOffset.leftToeOffset),
        VMDBoneNames.LeftToeIK,
      ),
    );
  if (tls.has(VMDBoneNames.RightToeIK))
    tls.set(
      VMDBoneNames.RightToeIK,
      mergeTimelines(
        tls,
        VMDBoneNames.Root,
        rightFootOffset,
        VMDBoneNames.RightFootIK,
        offsetToTimeline(VMDBoneNames.RightToeIK, vrmOffset.rightToeOffset),
        VMDBoneNames.RightToeIK,
      ),
    );
  if (tls.has(VMDBoneNames.LeftFootIK))
    tls.set(
      VMDBoneNames.LeftFootIK,
      mergeTimelines(tls, VMDBoneNames.Root, leftFootOffset, VMDBoneNames.LeftFootIK),
    );
  if (tls.has(VMDBoneNames.RightFootIK))
    tls.set(
      VMDBoneNames.RightFootIK,
      mergeTimelines(tls, VMDBoneNames.Root, rightFootOffset, VMDBoneNames.RightFootIK),
    );
  tls.delete(VMDBoneNames.Center);
  tls.delete(VMDBoneNames.Root);
  for (const tl of tls.values())
    for (const f of tl) {
      f.position.x *= -1;
      f.rotation.x *= -1;
      f.rotation.w *= -1;
      switch (f.boneName) {
        case VMDBoneNames.LeftUpperArm:
          f.rotation.multiply(Z_30_DEG_CW);
          break;
        case VMDBoneNames.RightUpperArm:
          f.rotation.multiply(Z_30_DEG_CCW);
          break;
        case VMDBoneNames.LeftLowerArm:
        case VMDBoneNames.LeftHand:
        case VMDBoneNames.LeftThumbProximal:
        case VMDBoneNames.LeftThumbIntermediate:
        case VMDBoneNames.LeftThumbDistal:
        case VMDBoneNames.LeftIndexProximal:
        case VMDBoneNames.LeftIndexIntermediate:
        case VMDBoneNames.LeftIndexDistal:
        case VMDBoneNames.LeftMiddleProximal:
        case VMDBoneNames.LeftMiddleIntermediate:
        case VMDBoneNames.LeftMiddleDistal:
        case VMDBoneNames.LeftRingProximal:
        case VMDBoneNames.LeftRingIntermediate:
        case VMDBoneNames.LeftRingDistal:
        case VMDBoneNames.LeftLittleProximal:
        case VMDBoneNames.LeftLittleIntermediate:
        case VMDBoneNames.LeftLittleDistal:
          f.rotation.premultiply(Z_30_DEG_CCW).multiply(Z_30_DEG_CW);
          break;
        case VMDBoneNames.RightLowerArm:
        case VMDBoneNames.RightHand:
        case VMDBoneNames.RightThumbProximal:
        case VMDBoneNames.RightThumbIntermediate:
        case VMDBoneNames.RightThumbDistal:
        case VMDBoneNames.RightIndexProximal:
        case VMDBoneNames.RightIndexIntermediate:
        case VMDBoneNames.RightIndexDistal:
        case VMDBoneNames.RightMiddleProximal:
        case VMDBoneNames.RightMiddleIntermediate:
        case VMDBoneNames.RightMiddleDistal:
        case VMDBoneNames.RightRingProximal:
        case VMDBoneNames.RightRingIntermediate:
        case VMDBoneNames.RightRingDistal:
        case VMDBoneNames.RightLittleProximal:
        case VMDBoneNames.RightLittleIntermediate:
        case VMDBoneNames.RightLittleDistal:
          f.rotation.premultiply(Z_30_DEG_CW).multiply(Z_30_DEG_CCW);
          break;
      }
      f.position.multiplyScalar(0.1);
    }
}

function offsetToTimeline(boneName: VMDBoneNames, rawPos: number[] | undefined): Keyframe[] {
  const init = IK_OFFSET_INIT.get(boneName)!;
  return [
    {
      boneName: `${boneName}Offset`,
      frameNum: 0,
      position: rawPos
        ? new Vector3(
            init.dx || isNaN(rawPos[0])
              ? init.x
              : rawPos[0] * (init.sx ?? 1) * (init.s ?? 1) + (init.ox ?? 0) + (init.o ?? 0),
            init.dy || isNaN(rawPos[1])
              ? init.y
              : rawPos[1] * (init.sy ?? 1) * (init.s ?? 1) + (init.oy ?? 0) + (init.o ?? 0),
            init.dz || isNaN(rawPos[2])
              ? init.z
              : rawPos[2] * (init.sz ?? 1) * (init.s ?? 1) + (init.oz ?? 0) + (init.o ?? 0),
          )
        : new Vector3(init.x, init.y, init.z),
      rotation: Q_IDENTITY,
    },
  ];
}

function mergeTimelines(tlsMap: Map<string, Keyframe[]>, ...tlsKey: (Keyframe[] | string)[]) {
  const tls = tlsKey.map(resolveTimeline, tlsMap).filter(isTruely);
  let boneName: string;
  const last = tlsKey[tlsKey.length - 1];
  if (typeof last === 'string') boneName = last;
  else boneName = tls[tls.length - 1][0]?.boneName ?? '';
  const results: Keyframe[] = [];
  for (const tl of tls)
    for (const f of tl) {
      const { frameNum } = f;
      if (frameNum < results.length && results[frameNum] != null) continue;
      const position = new Vector3();
      const rotation = new Quaternion();
      for (const otl of tls) {
        if (!otl.length) continue;
        const f2 = otl[0].boneName === f.boneName ? f : lerpKeyframe(otl, frameNum);
        position.add(tempV3.copy(f2.position).applyQuaternion(rotation));
        rotation.multiply(f2.rotation);
      }
      results[frameNum] = { boneName, frameNum, position, rotation };
    }
  return results.filter(isTruely);
}

function localizeTimeline(parent: Keyframe[], child: Keyframe[]): Keyframe[];
function localizeTimeline(...tls: [Keyframe[], Keyframe[]]) {
  const { boneName } = tls[1][0];
  const results: Keyframe[] = [];
  let isChild = false;
  for (const tl of tls) {
    for (const f of tl) {
      const { frameNum } = f;
      if (frameNum < results.length && results[frameNum] != null) continue;
      const fp: LerpKeyframe = isChild ? lerpKeyframe(tls[0], frameNum) : f;
      const fc: LerpKeyframe = isChild ? f : lerpKeyframe(tls[1], frameNum);
      results[frameNum] = {
        boneName,
        frameNum,
        position: (fc.isNew ? fc.position : fc.position.clone()).sub(fp.position),
        rotation: (fc.isNew ? fc.rotation : fc.rotation.clone()).multiply(
          tempQ.copy(fp.rotation).invert(),
        ),
      };
    }
    isChild = true;
  }
  return results.filter(isTruely);
}

function lerpKeyframe(tl: Keyframe[], frameNum: number): LerpKeyframe {
  if (!tl)
    return {
      boneName: '',
      frameNum,
      position: V3_ZERO,
      rotation: Q_IDENTITY,
    };
  const nextIndex = tl.findIndex((keyframe) => frameNum < keyframe.frameNum);
  switch (nextIndex) {
    case 0:
      return tl[0];
    case -1:
      return tl[tl.length - 1];
    case frameNum:
      return tl[frameNum];
  }
  const prevFrame = tl[nextIndex - 1];
  const nextFrame = tl[nextIndex];
  const prevFrameNum = prevFrame.frameNum;
  const nextFrameNum = nextFrame.frameNum;
  const v = (frameNum - prevFrameNum) / (nextFrameNum - prevFrameNum);
  return {
    boneName: tl[0].boneName,
    frameNum,
    position: prevFrame.position.clone().lerp(nextFrame.position, v),
    rotation: prevFrame.rotation.clone().slerp(nextFrame.rotation, v),
    isNew: true,
  };
}

function resolveTimeline(this: Map<string, Keyframe[]>, key: Keyframe[] | string) {
  return Array.isArray(key) ? key : this.get(key);
}

function sortFrames<T extends { frameNum: number }>(f: ArrayLike<T> | Iterable<T>) {
  return (Array.isArray(f) ? (f as T[]) : Array.from(f)).sort((a, b) => a.frameNum - b.frameNum);
}

function getLastFrameNum(f: { frameNum: number }[]) {
  return f.length ? f[f.length - 1].frameNum : 0;
}
