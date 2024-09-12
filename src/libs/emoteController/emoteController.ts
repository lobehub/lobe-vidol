import { VRM, VRMExpressionPresetName } from '@pixiv/three-vrm';
import * as THREE from 'three';

import { MotionPresetName } from './MotionPresetName';
import { ExpressionController } from './expressionController';
import { MotionController } from './motionController';
import { MotionFileType } from './type';

/**
 * 作为情感表达操作 Expression 和 Motion的类
 */
export class EmoteController {
  private _expressionController: ExpressionController;
  private _motionController: MotionController;

  constructor(vrm: VRM, camera: THREE.Object3D) {
    this._expressionController = new ExpressionController(vrm, camera);
    this._motionController = new MotionController(vrm);
  }

  public playEmotion(preset: VRMExpressionPresetName) {
    this._expressionController.playEmotion(preset);
  }

  public playMotion(preset: MotionPresetName) {
    this._motionController.playMotion(preset);
  }

  public playMotionUrl(fileType: MotionFileType, url: string, loop: boolean = true) {
    this._motionController.playMotionUrl(fileType, url, loop);
  }

  public lipSync(preset: VRMExpressionPresetName, value: number) {
    this._expressionController.lipSync(preset, value);
  }

  public update(delta: number) {
    this._expressionController.update(delta);
    this._motionController.update(delta);
  }
}
