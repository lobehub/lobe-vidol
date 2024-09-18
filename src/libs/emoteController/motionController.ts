import { VRM } from '@pixiv/three-vrm';

import { MotionManager } from './motionManager';
import { MotionPresetName, motionPresetMap } from './motionPresetMap';
import { MotionFileType } from './type';

export class MotionController {
  private _motionManager: MotionManager; // 假设有一个动作管理器

  constructor(vrm: VRM) {
    this._motionManager = new MotionManager(vrm);
  }

  /**
   * 目前都是 Mixamo 的 FBX 文件
   * @param motion
   */
  public playMotion(motion: MotionPresetName) {
    this._motionManager.disposeCurrentMotion(); // 停止当前动作

    // 这里将motion转换为url
    const preset = motionPresetMap[motion];

    if (preset) {
      this._motionManager.loadMotionUrl(preset.type, preset.url, true); // 播放新动作
    }
  }

  public playMotionUrl(fileType: MotionFileType, url: string, loop: boolean = true) {
    this._motionManager.disposeCurrentMotion(); // 停止当前动作

    this._motionManager.loadMotionUrl(fileType, url, loop); // 播放新动作
  }

  public stopMotion() {
    this._motionManager.disposeCurrentMotion();
  }

  public update(delta: number) {
    this._motionManager.update(delta);
  }
}
