export class MotionController {
  private _currentMotion: string;
  private _motionManager?: any; // 假设有一个动作管理器
  constructor() {
    this._currentMotion = 'idle'; // 默认动作
  }

  public playMotion(motion: string) {
    if (this._currentMotion !== 'idle') {
      this._motionManager?.stopMotion(this._currentMotion); // 停止当前动作
    }

    this._currentMotion = motion;
    this._motionManager?.playMotion(motion); // 播放新动作
  }

  public stopMotion() {
    this._motionManager?.stopMotion(this._currentMotion); // 停止当前动作
    this._currentMotion = 'idle'; // 重置为默认动作
  }

  public update(delta: number) {
    this._motionManager?.update(delta); // 更新动作管理器
  }
}
