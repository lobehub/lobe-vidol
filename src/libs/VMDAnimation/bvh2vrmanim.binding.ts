import { VRMHumanBoneName as HumanoidBoneName, VRM } from '@pixiv/three-vrm';
import { KeyframeTrack, Object3D, Quaternion, Skeleton, Vector3 } from 'three';
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader.js';

import { centerOfDescendant, transverse } from '@/utils/three-helpers';

const matcher = /^\.bones\[(.+)\]\.(position|quaternion)$/;

const tempQ = new Quaternion();
const tempV3 = new Vector3();

function getRoot(bones: Object3D[]) {
  const hips = bones.filter((x) => x.parent == null);
  if (hips.length !== 1) throw new TypeError('Requires unique root.');
  return hips[0];
}

function selectBone(selector: (l: Object3D, r: Object3D) => Object3D, bones: Object3D[]) {
  if (!bones || !bones.length) throw new TypeError('No bones.');
  let current = bones[0];
  for (let i = 1; i < bones.length; i++) current = selector(current, bones[i]);
  return current;
}

function getSpineAndHips(hips: Object3D, map: Map<HumanoidBoneName, Object3D>) {
  if (hips.children.length !== 3) throw new TypeError('Hips require 3 children.');
  map.set(
    HumanoidBoneName.Spine,
    selectBone(
      (l, r) => (centerOfDescendant(l).y > centerOfDescendant(r).y ? l : r),
      hips.children,
    ),
  );
  map.set(
    HumanoidBoneName.LeftUpperLeg,
    selectBone(
      (l, r) => (centerOfDescendant(l).x < centerOfDescendant(r).x ? l : r),
      hips.children,
    ),
  );
  map.set(
    HumanoidBoneName.RightUpperLeg,
    selectBone(
      (l, r) => (centerOfDescendant(l).x > centerOfDescendant(r).x ? l : r),
      hips.children,
    ),
  );
}

function getNeckAndArms(chest: Object3D, map: Map<HumanoidBoneName, Object3D>) {
  if (chest.children.length !== 3) throw new TypeError('Chest require 3 children.');
  map.set(
    HumanoidBoneName.Neck,
    selectBone(
      (l, r) => (centerOfDescendant(l).y > centerOfDescendant(r).y ? l : r),
      chest.children,
    ),
  );
  map.set(
    HumanoidBoneName.LeftShoulder,
    selectBone(
      (l, r) => (centerOfDescendant(l).x < centerOfDescendant(r).x ? l : r),
      chest.children,
    ),
  );
  map.set(
    HumanoidBoneName.RightShoulder,
    selectBone(
      (l, r) => (centerOfDescendant(l).x > centerOfDescendant(r).x ? l : r),
      chest.children,
    ),
  );
}

function getArm(map: Map<HumanoidBoneName, Object3D>, isRight?: boolean) {
  const bones = Array.from(
    transverse(map.get(isRight ? HumanoidBoneName.RightShoulder : HumanoidBoneName.LeftShoulder)),
  );
  switch (bones.length) {
    case 0:
    case 1:
    case 2:
    case 3:
      throw new TypeError(`Not supported (${bones.length})`);
    default:
      map.set(isRight ? HumanoidBoneName.RightShoulder : HumanoidBoneName.LeftShoulder, bones[0]);
      map.set(isRight ? HumanoidBoneName.RightUpperArm : HumanoidBoneName.LeftUpperArm, bones[1]);
      map.set(isRight ? HumanoidBoneName.RightLowerArm : HumanoidBoneName.LeftLowerArm, bones[2]);
      map.set(isRight ? HumanoidBoneName.RightHand : HumanoidBoneName.LeftHand, bones[3]);
      break;
  }
}

function getLeg(map: Map<HumanoidBoneName, Object3D>, isRight?: boolean) {
  const bones = Array.from(
    transverse(map.get(isRight ? HumanoidBoneName.RightUpperLeg : HumanoidBoneName.LeftUpperLeg)),
  );
  switch (bones.length) {
    case 0:
    case 1:
    case 2:
      throw new TypeError(`Not supported (${bones.length})`);
    case 3:
      map.set(isRight ? HumanoidBoneName.RightUpperLeg : HumanoidBoneName.LeftUpperLeg, bones[0]);
      map.set(isRight ? HumanoidBoneName.RightLowerLeg : HumanoidBoneName.LeftLowerLeg, bones[1]);
      map.set(isRight ? HumanoidBoneName.RightFoot : HumanoidBoneName.LeftFoot, bones[2]);
      break;
    default:
      map.set(
        isRight ? HumanoidBoneName.RightUpperLeg : HumanoidBoneName.LeftUpperLeg,
        bones[bones.length - 4],
      );
      map.set(
        isRight ? HumanoidBoneName.RightLowerLeg : HumanoidBoneName.LeftLowerLeg,
        bones[bones.length - 3],
      );
      map.set(
        isRight ? HumanoidBoneName.RightFoot : HumanoidBoneName.LeftFoot,
        bones[bones.length - 2],
      );
      map.set(
        isRight ? HumanoidBoneName.RightToes : HumanoidBoneName.LeftToes,
        bones[bones.length - 1],
      );
      break;
  }
}

function detectSkeleton(skeleton: Skeleton) {
  const root = getRoot(skeleton.bones);
  let hips: Object3D | null | undefined;
  for (const x of transverse(root))
    if (x.children.length === 3) {
      hips = x;
      break;
    }
  if (!hips) throw new TypeError('Hips not found');
  const map = new Map<HumanoidBoneName, Object3D>();
  getSpineAndHips(hips, map);
  getLeg(map, false);
  getLeg(map, true);
  const spineToChest: Object3D[] = [];
  for (const x of transverse(map.get(HumanoidBoneName.Spine))) {
    spineToChest.push(x);
    if (x.children.length === 3) break;
  }
  getNeckAndArms(spineToChest[spineToChest.length - 1], map);
  getArm(map, false);
  getArm(map, true);
  const necktoHead = Array.from(transverse(map.get(HumanoidBoneName.Neck)));
  switch (spineToChest.length) {
    case 0:
      throw new TypeError(`Not supported (${spineToChest.length})`);
    case 1:
      map.set(HumanoidBoneName.Spine, spineToChest[0]);
      break;
    case 2:
      map.set(HumanoidBoneName.Spine, spineToChest[0]);
      map.set(HumanoidBoneName.Chest, spineToChest[1]);
      break;
    default:
      map.set(HumanoidBoneName.Spine, spineToChest[0]);
      map.set(HumanoidBoneName.Chest, spineToChest[1]);
      map.set(HumanoidBoneName.UpperChest, spineToChest[spineToChest.length - 1]);
      break;
  }
  switch (necktoHead.length) {
    case 0:
      throw new TypeError(`Not supported (${necktoHead.length})`);
    case 1:
      map.set(HumanoidBoneName.Head, spineToChest[0]);
      break;
    case 2:
      map.set(HumanoidBoneName.Neck, spineToChest[0]);
      map.set(HumanoidBoneName.Head, spineToChest[1]);
      break;
    default:
      map.set(HumanoidBoneName.Neck, spineToChest[0]);
      let head: Object3D | null | undefined;
      for (const x of necktoHead) if (x.parent!.children.length === 1) head = x;
      if (!head) throw new TypeError('Head not found');
      map.set(HumanoidBoneName.Head, head);
      break;
  }
  const finalMap = new Map<string, [HumanoidBoneName, Object3D]>();
  for (const [boneName, bone] of map) finalMap.set(bone.name, [boneName, bone]);
  return finalMap;
}

export function convert(data: AllowSharedBufferSource, vrm: VRM) {
  const textDecoder = new TextDecoder();
  const { clip, skeleton } = new BVHLoader().parse(textDecoder.decode(data));
  const keepTracks = new Set<KeyframeTrack>();
  const skeletonMap = detectSkeleton(skeleton);
  for (const track of clip.tracks) {
    const m = track.name.match(matcher);
    if (!m || !skeletonMap.has(m[1])) continue;
    const [boneName, bone] = skeletonMap.get(m[1])!;
    if (boneName !== HumanoidBoneName.Hips && m[2] !== 'quaternion') continue;
    const boneNode = vrm.humanoid?.getBoneNode(boneName);
    if (!boneNode) continue;
    switch (m[2]) {
      case 'quaternion':
        for (let i = 0; i < track.times.length; i++)
          tempQ
            .fromArray(track.values, i * 4)
            .premultiply(bone.quaternion)
            .toArray(track.values, i * 4);
        break;
      case 'position':
        for (let i = 0; i < track.times.length; i++)
          tempV3
            .fromArray(track.values, i * 3)
            .add(bone.position)
            .toArray(track.values, i * 3);
        break;
    }
    track.name = `${boneNode.name}.${m[2]}`;
    keepTracks.add(track);
  }
  if (keepTracks.size !== clip.tracks.length) clip.tracks = Array.from(keepTracks);
  return clip.resetDuration();
}
