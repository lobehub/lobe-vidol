import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import * as THREE from 'three';
import { AnimationAction, AnimationClip } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { LoopOnce } from 'three/src/constants';

import { AudioPlayer } from '@/features/audioPlayer/audioPlayer';
import { loadMixamoAnimation } from '@/libs/FBXAnimation/loadMixamoAnimation';
import { loadVMDAnimation } from '@/libs/VMDAnimation/loadVMDAnimation';
import { convert } from '@/libs/VMDAnimation/vmd2vrmanim';
import { bindToVRM, toOffset } from '@/libs/VMDAnimation/vmd2vrmanim.binding';
import IKHandler from '@/libs/VMDAnimation/vrm-ik-handler';
import { VRMAnimation } from '@/libs/VRMAnimation/VRMAnimation';
import { loadVRMAnimation } from '@/libs/VRMAnimation/loadVRMAnimation';
import { VRMLookAtSmootherLoaderPlugin } from '@/libs/VRMLookAtSmootherLoaderPlugin/VRMLookAtSmootherLoaderPlugin';
import { EmoteController } from '@/libs/emoteController/emoteController';
import { LipSync } from '@/libs/lipSync/lipSync';
import { Screenplay } from '@/types/touch';

/**
 * 3Dキャラクターを管理するクラス
 */
export class Model {
  public vrm?: VRM | null;
  public mixer?: THREE.AnimationMixer;
  public ikHandler?: IKHandler;
  public emoteController?: EmoteController;

  private _lookAtTargetParent: THREE.Object3D;
  private _lipSync?: LipSync;
  private _audioPlayer?: AudioPlayer;
  private _action: AnimationAction | undefined;
  private _clip: AnimationClip | undefined;
  private _audio: ArrayBuffer | undefined;

  constructor(lookAtTargetParent: THREE.Object3D) {
    this._lookAtTargetParent = lookAtTargetParent;
    this._lipSync = new LipSync(new AudioContext());
    this._audioPlayer = new AudioPlayer(new AudioContext());
    this._action = undefined;
    this._clip = undefined;
    this._audio = undefined;
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
    this.mixer = new THREE.AnimationMixer(vrm.scene);

    this.ikHandler = IKHandler.get(vrm);

    this.emoteController = new EmoteController(vrm, this._lookAtTargetParent);
  }

  public unLoadVrm() {
    if (this.vrm) {
      VRMUtils.deepDispose(this.vrm.scene);
      this.vrm = null;
    }
  }

  public disposeAll() {
    const { mixer } = this;

    if (mixer) {
      mixer.stopAllAction();
      if (this._clip) {
        mixer.uncacheAction(this._clip);
        mixer.uncacheClip(this._clip);
        this._clip = undefined;
      }
    }

    this.ikHandler?.disableAll();
    if (this._action) {
      this._action.stop();
      this._action = undefined;
    }

    if (this._audio) {
      this._audioPlayer?.stopPlay();
      this._audio = undefined;
    }
  }

  /**
   * VRMアニメーションを読み込む
   *
   * https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm_animation-1.0/README.ja.md
   */
  public async loadAnimation(vrmAnimation: VRMAnimation): Promise<void> {
    const { vrm, mixer } = this;

    if (vrm && mixer) {
      this.disposeAll();
      const clip = vrmAnimation.createAnimationClip(vrm);
      const action = mixer.clipAction(clip);
      action.play();
      this._action = action;
      this._clip = clip;
    }
  }

  public async loadIdleAnimation() {
    const vrma = await loadVRMAnimation('/idle_loop.vrma');
    if (vrma) await this.loadAnimation(vrma);
  }

  public async loadFBX(animationUrl: string) {
    const { vrm, mixer } = this;

    if (vrm && mixer) {
      this.disposeAll();
      // Load animation
      const clip = await loadMixamoAnimation(animationUrl, vrm);
      // Apply the loaded animation to mixer and play
      const action = mixer.clipAction(clip);
      action.play();
      this._action = action;
      this._clip = clip;
    }
  }

  public async loadVMD(animationUrl: string) {
    const { vrm, mixer } = this;

    if (vrm && mixer) {
      this.disposeAll();
      const clip = await loadVMDAnimation(animationUrl, vrm);
      const action = mixer.clipAction(clip);
      action.play();
      this._action = action;
      this._clip = clip;
    }
  }

  /**
   * 播放舞蹈，以音乐文件的播放作为结束标志。
   * @param audio
   * @param dance
   */
  public async dance(
    dance: ArrayBuffer,
    audio?: {
      data: ArrayBuffer;
      onEnd?: () => void;
    },
  ) {
    const { vrm, mixer } = this;
    if (vrm && mixer) {
      this.disposeAll();
      const animation = convert(dance, toOffset(vrm));
      const clip = bindToVRM(animation, vrm);
      const action = mixer.clipAction(clip);
      action.setLoop(LoopOnce, 1).play(); // play animation
      if (audio) {
        this._audioPlayer?.playFromArrayBuffer(audio.data, () => {
          this.resetToIdle();
          audio.onEnd?.();
        });
        this._audio = audio.data;
      }

      this._action = action;
      this._clip = clip;
    }
  }

  public async resetToIdle() {
    const { vrm, mixer } = this;
    if (vrm && mixer) {
      this.disposeAll();

      await this.loadIdleAnimation();
    }
  }
  /**
   * 语音播放，配合人物表情动作
   * @param buffer
   * @param screenplay
   */
  public async speak(buffer: ArrayBuffer, screenplay: Screenplay) {
    this.emoteController?.playEmotion(screenplay.emotion);
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

    this.emoteController?.update(delta);
    this.mixer?.update(delta);
    this.vrm?.update(delta);
    this.ikHandler?.update();
  }
}
