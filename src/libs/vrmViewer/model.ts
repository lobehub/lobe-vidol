import {
  VRM,
  VRMExpressionPresetName,
  VRMHumanBoneName,
  VRMLoaderPlugin,
  VRMUtils,
} from '@pixiv/three-vrm';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { VRMLookAtSmootherLoaderPlugin } from '@/libs/VRMLookAtSmootherLoaderPlugin/VRMLookAtSmootherLoaderPlugin';
import { EmoteController } from '@/libs/emoteController/emoteController';
import { LipSync } from '@/libs/lipSync/lipSync';
import { Screenplay, TouchAreaEnum } from '@/types/touch';

import { MotionPresetName } from '../emoteController/motionPresetMap';
import { MotionFileType } from '../emoteController/type';

/**
 * 3Dキャラクターを管理するクラス
 */
export class Model {
  public vrm?: VRM | null;
  public emoteController?: EmoteController;

  private _lookAtTargetParent: THREE.Object3D;
  private _lipSync?: LipSync;
  private _headHitbox?: THREE.Mesh;
  private _headHitboxSize: THREE.Vector3 = new THREE.Vector3(0.2, 0.25, 0.2);
  private _raycaster: THREE.Raycaster;

  constructor(lookAtTargetParent: THREE.Object3D) {
    this._lookAtTargetParent = lookAtTargetParent;
    this._lipSync = new LipSync(new AudioContext());
    this._raycaster = new THREE.Raycaster();
  }

  public async loadVRM(url: string): Promise<void> {
    const loader = new GLTFLoader();
    loader.crossOrigin = 'anonymous';

    loader.register(
      (parser) =>
        new VRMLoaderPlugin(parser, {
          lookAtPlugin: new VRMLookAtSmootherLoaderPlugin(parser),
          autoUpdateHumanBones: true,
        }),
    );
    const gltf = await loader.loadAsync(url);

    // 提升性能
    VRMUtils.removeUnnecessaryVertices(gltf.scene);
    VRMUtils.removeUnnecessaryJoints(gltf.scene);

    const vrm = (this.vrm = gltf.userData.vrm);
    vrm.scene.name = 'VRMRoot';

    VRMUtils.rotateVRM0(vrm);

    this.emoteController = new EmoteController(vrm, this._lookAtTargetParent);

    // 在这里调用 createHeadHitbox
    this.createHeadHitbox();
  }

  public unLoadVrm() {
    if (this.vrm) {
      VRMUtils.deepDispose(this.vrm.scene);
      this.vrm = null;
    }
  }

  public async playMotionUrl(fileType: MotionFileType, url: string, loop: boolean = true) {
    this.emoteController?.playMotionUrl(fileType, url, loop);
  }

  public async loadIdleAnimation() {
    this.emoteController?.playEmotion(VRMExpressionPresetName.Neutral);
    this.emoteController?.playMotion(MotionPresetName.Idle, true);
  }

  /**
   * 语音播放，配合人物表情动作
   * @param buffer
   * @param screenplay
   */
  public async speak(buffer: ArrayBuffer, screenplay: Screenplay) {
    // 播放人物表情
    this.emoteController?.playEmotion(screenplay.expression);
    // 播放人物动作
    if (screenplay.motion) this.emoteController?.playMotion(screenplay.motion, true);
    // 唇形同步
    await new Promise((resolve) => {
      this._lipSync?.playFromArrayBuffer(buffer, () => {
        resolve(true);
      });
    });
  }

  /**
   * 停止语音
   */
  public stopSpeak() {
    this._lipSync?.stopPlay();
    this.emoteController?.playEmotion('neutral');
  }

  public update(delta: number): void {
    if (this._lipSync) {
      const { volume } = this._lipSync.update();
      this.emoteController?.lipSync('aa', volume);
    }
    // 更新表情动作
    this.emoteController?.update(delta);
  }

  public async preloadMotion(motion: MotionPresetName) {
    await this.emoteController?.preloadMotion(motion);
  }
  public async preloadAllMotions(onLoad?: (loaded: number, total: number) => void) {
    const motions = Object.values(MotionPresetName);
    let loaded = 0;
    const total = motions.length;
    for (const motion of motions) {
      await this.preloadMotion(motion);
      loaded++;
      onLoad?.(loaded, total);
    }
  }

  public async preloadMotionUrl(fileType: MotionFileType, url: string) {
    await this.emoteController?.preloadMotionUrl(fileType, url);
  }

  public createHeadHitbox() {
    if (!this.vrm) return;

    const headBone = this.vrm.humanoid.getNormalizedBoneNode('head');
    if (!headBone) return;

    const geometry = new THREE.BoxGeometry(
      this._headHitboxSize.x,
      this._headHitboxSize.y,
      this._headHitboxSize.z,
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
      visible: false,
    });
    this._headHitbox = new THREE.Mesh(geometry, material);

    headBone.add(this._headHitbox);

    this._headHitbox.position.set(0, this._headHitboxSize.y * 0.3, 0);
  }

  public updateHeadHitbox() {
    if (!this.vrm || !this._headHitbox) return;

    const headBone = this.vrm.humanoid.getNormalizedBoneNode('head');
    if (!headBone) return;

    const scale = new THREE.Vector3();
    headBone.getWorldScale(scale);
    this._headHitbox.scale.copy(scale);
  }

  public getHeadHitbox(): THREE.Mesh | undefined {
    return this._headHitbox;
  }

  public getClosestBone(point: THREE.Vector3): VRMHumanBoneName | null {
    if (!this.vrm) return null;

    let closestBone: VRMHumanBoneName | null = null;
    let closestWeightedDistance = Infinity;

    const mainBones: VRMHumanBoneName[] = [
      ...this.getHeadBones(),
      VRMHumanBoneName.Chest,
      VRMHumanBoneName.Spine,
      VRMHumanBoneName.Hips,
      VRMHumanBoneName.LeftUpperArm,
      VRMHumanBoneName.LeftLowerArm,
      VRMHumanBoneName.LeftHand,
      VRMHumanBoneName.RightUpperArm,
      VRMHumanBoneName.RightLowerArm,
      VRMHumanBoneName.RightHand,
      VRMHumanBoneName.LeftUpperLeg,
      VRMHumanBoneName.LeftLowerLeg,
      VRMHumanBoneName.LeftFoot,
      VRMHumanBoneName.RightUpperLeg,
      VRMHumanBoneName.RightLowerLeg,
      VRMHumanBoneName.RightFoot,
    ];

    const getBoneWeight = (boneName: VRMHumanBoneName): number => {
      switch (boneName) {
        case VRMHumanBoneName.Head:
        case VRMHumanBoneName.LeftEye:
        case VRMHumanBoneName.RightEye:
        case VRMHumanBoneName.Jaw:
          return 2; // 增加头部相关骨骼的权重
        case VRMHumanBoneName.Chest:
        case VRMHumanBoneName.Spine:
        case VRMHumanBoneName.Hips:
          return 1.5;
        case VRMHumanBoneName.LeftUpperLeg:
        case VRMHumanBoneName.RightUpperLeg:
        case VRMHumanBoneName.LeftUpperArm:
        case VRMHumanBoneName.RightUpperArm:
          return 1.2;
        default:
          return 1;
      }
    };

    mainBones.forEach((boneName) => {
      const boneData = this.vrm!.humanoid.getNormalizedBoneNode(boneName);
      if (boneData) {
        const boneWorldPosition = new THREE.Vector3();
        boneData.getWorldPosition(boneWorldPosition);
        const distance = point.distanceTo(boneWorldPosition);
        const weightedDistance = distance / getBoneWeight(boneName);

        if (weightedDistance < closestWeightedDistance) {
          closestWeightedDistance = weightedDistance;
          closestBone = boneName;
        }
      }
    });

    return closestBone;
  }

  public mapBoneNameToTouchArea(boneName: VRMHumanBoneName): TouchAreaEnum | null {
    const headBones = this.getHeadBones();
    if (headBones.includes(boneName)) {
      return TouchAreaEnum.Head;
    }

    switch (boneName) {
      case VRMHumanBoneName.LeftUpperArm:
      case VRMHumanBoneName.LeftLowerArm:
      case VRMHumanBoneName.LeftHand:
      case VRMHumanBoneName.RightUpperArm:
      case VRMHumanBoneName.RightLowerArm:
      case VRMHumanBoneName.RightHand:
        return TouchAreaEnum.Arm;

      case VRMHumanBoneName.LeftUpperLeg:
      case VRMHumanBoneName.RightUpperLeg:
      case VRMHumanBoneName.LeftLowerLeg:
      case VRMHumanBoneName.RightLowerLeg:
      case VRMHumanBoneName.LeftFoot:
      case VRMHumanBoneName.RightFoot:
        return TouchAreaEnum.Leg;

      case VRMHumanBoneName.Chest:
        return TouchAreaEnum.Chest;

      case VRMHumanBoneName.Spine:
        return TouchAreaEnum.Belly;

      case VRMHumanBoneName.Hips:
        return TouchAreaEnum.Buttocks;

      default:
        return null;
    }
  }

  private getHeadBones(): VRMHumanBoneName[] {
    return [
      VRMHumanBoneName.Head,
      VRMHumanBoneName.Neck,
      VRMHumanBoneName.LeftEye,
      VRMHumanBoneName.RightEye,
      VRMHumanBoneName.Jaw,
    ];
  }

  public handleRaycasterIntersection(
    mouse: THREE.Vector2,
    camera: THREE.Camera,
  ): THREE.Intersection[] | null {
    if (!this.vrm) {
      return null;
    }

    this._raycaster.setFromCamera(mouse, camera);

    return this._raycaster.intersectObject(this.vrm.scene, true);
  }

  public handleClick(intersects: THREE.Intersection[]): TouchAreaEnum | null {
    if (!intersects || intersects.length === 0) return null;

    // 检查是否点击了头部 hitbox
    const headHitboxIntersect = intersects.find(
      (intersect) => intersect.object === this._headHitbox,
    );
    if (headHitboxIntersect) {
      return this.mapBoneNameToTouchArea(VRMHumanBoneName.Head);
    }

    const intersectedPoint = intersects[0].point;
    const closestBone = this.getClosestBone(intersectedPoint);

    if (closestBone) {
      return this.mapBoneNameToTouchArea(closestBone);
    }

    return null;
  }

  // ... 其他现有的方法 ...
}
