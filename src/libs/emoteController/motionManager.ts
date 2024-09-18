import { VRM } from '@pixiv/three-vrm';
import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce } from 'three';

import { loadMixamoAnimation } from '@/libs/FBXAnimation/loadMixamoAnimation';
import { loadVMDAnimation } from '@/libs/VMDAnimation/loadVMDAnimation';
import IKHandler from '@/libs/VMDAnimation/vrm-ik-handler';
import VRMIKHandler from '@/libs/VMDAnimation/vrm-ik-handler';
import { loadVRMAnimation } from '@/libs/VRMAnimation/loadVRMAnimation';

import { MotionFileType } from './type';

export class MotionManager {
  private vrm: VRM;
  private mixer: AnimationMixer;
  private currentAction?: AnimationAction;
  private currentClip?: AnimationClip;
  private ikHandler: VRMIKHandler;

  constructor(vrm: VRM) {
    this.vrm = vrm;
    this.mixer = new AnimationMixer(vrm.scene);
    this.ikHandler = IKHandler.get(vrm);
  }

  public async loadMotionUrl(
    fileType: MotionFileType,
    url: string,
    loop: boolean = true,
  ): Promise<void> {
    this.disposeCurrentMotion();

    let clip: AnimationClip | undefined;

    switch (fileType) {
      case 'vmd':
        clip = await this.loadVMD(url);
        break;
      case 'fbx':
        clip = await this.loadFBX(url);
        break;
      case 'vrma':
        clip = await this.loadVRMA(url);
        break;
      default:
        throw new Error('不支持的文件格式');
    }

    if (!clip) {
      return;
    }

    const action = this.mixer.clipAction(clip);
    if (!loop) action.setLoop(LoopOnce, 1);
    action.play();

    this.currentAction = action;
    this.currentClip = clip;
  }

  private async loadVMD(url: string): Promise<AnimationClip | undefined> {
    return await loadVMDAnimation(url, this.vrm);
  }

  private async loadFBX(url: string): Promise<AnimationClip | undefined> {
    return await loadMixamoAnimation(url, this.vrm);
  }

  private async loadVRMA(url: string): Promise<AnimationClip | undefined> {
    return await loadVRMAnimation(url, this.vrm);
  }

  public disposeCurrentMotion(): void {
    if (this.currentClip && this.mixer) {
      this.mixer.uncacheAction(this.currentClip);
      this.mixer.uncacheClip(this.currentClip);
    }

    if (this.currentAction) {
      this.currentAction.stop();
    }
    this.ikHandler.disableAll();

    this.currentAction = undefined;
    this.currentClip = undefined;
  }

  public update(delta: number): void {
    this.mixer.update(delta);
    this.ikHandler.update();
  }
}
