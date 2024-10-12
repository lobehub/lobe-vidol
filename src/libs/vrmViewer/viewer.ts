import { VRMHumanBoneName } from '@pixiv/three-vrm';
import { Parser } from 'mmd-parser';
import * as THREE from 'three';
import {
  Audio,
  Box3,
  BoxGeometry,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PlaneGeometry,
  Vector3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { loadVMDCamera } from '@/libs/VMDAnimation/loadVMDCamera';
import { MotionFileType } from '@/libs/emoteController/type';
import { TouchAreaEnum } from '@/types/touch';

import { Model } from './model';

export class Viewer {
  public isReady: boolean;
  public model?: Model;

  private _renderer?: THREE.WebGLRenderer;
  private _clock: THREE.Clock;
  private _scene: THREE.Scene;
  private _sound?: Audio;
  private _cameraHelper?: THREE.CameraHelper;
  private _camera?: THREE.PerspectiveCamera;
  private _cameraControls?: OrbitControls;
  private _gridHelper?: THREE.GridHelper;
  private _axesHelper?: THREE.AxesHelper;
  private _floor?: THREE.Mesh;
  private _raycaster: THREE.Raycaster;
  private _mouse: THREE.Vector2;
  private _canvas?: HTMLCanvasElement;
  private _boundHandleClick: (event: MouseEvent) => void;
  private _onBodyTouch?: (area: TouchAreaEnum) => void;
  private _isDancing: boolean = false;
  private _cameraMixer?: THREE.AnimationMixer;
  private _cameraAction?: THREE.AnimationAction;

  constructor() {
    this.isReady = false;

    // scene
    const scene = new THREE.Scene();
    this._scene = scene;

    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xff_ff_ff, Math.PI);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // 环光
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    // scene.add(ambientLight);

    // 渐变光
    // const HemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // HemisphereLight.position.set(0, 20, 0);
    // scene.add(HemisphereLight);

    // animate
    this._clock = new THREE.Clock();
    this._clock.start();

    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    // 在构造函数中绑定 handleClick 方法
    this._boundHandleClick = this.handleClick.bind(this);
  }

  /**
   * 播放舞蹈，以音乐文件的播放作为结束标志。
   */
  public async dance(srcUrl: string, audioUrl: string, cameraUrl?: string, onEnd?: () => void) {
    if (!this._sound || !this.model) {
      console.error('音频对象或模型对象不存在');
      return null;
    }
    this._isDancing = true;
    this._sound.stop();
    const audioLoader = new THREE.AudioLoader();
    // 监听音频播放结束事件
    this._sound.onEnded = () => {
      onEnd?.();
      this.model?.loadIdleAnimation();
      this._isDancing = false;
      // 重置相机位置
      this.resetCamera();
    };
    const buffer = await audioLoader.loadAsync(audioUrl);
    this._sound.setBuffer(buffer);
    this._sound.setVolume(0.5);
    this._sound.play();

    this.model?.playMotionUrl(MotionFileType.VMD, srcUrl, false);

    // 使用新的 playCameraUrl 方法
    if (cameraUrl) {
      await this.playCameraUrl(cameraUrl);
    }
  }

  public resetToIdle() {
    this._sound?.stop();
    this.model?.loadIdleAnimation();
    this._isDancing = false;
    // 停止并重置镜头动画
    this.stopCameraAnimation();
    this.resetCamera();
  }

  /**
   * 加台
   * @param buffer
   */
  public async loadStage(buffer: ArrayBuffer) {
    const pmx = new Parser().parsePmx(buffer);
    this._scene.add(pmx);
  }

  public async loadVrm(url: string) {
    // 在加载新模型之前，先卸载旧模型和事件监听器
    this.unload();

    // gltf and vrm
    this.model = new Model(this._camera || new THREE.Object3D());
    await this.model.loadVRM(url);

    if (!this.model?.vrm) {
      return;
    }

    // Disable frustum culling
    this.model.vrm.scene.traverse((obj) => {
      obj.frustumCulled = false;
    });

    this._scene.add(this.model.vrm.scene);
    await this.model.loadIdleAnimation();

    // HACK: アニメーションの原点がずれているの再生後にカメラ位置を調整する
    requestAnimationFrame(() => {
      this.resetCamera();
    });

    // 重新设置事件监听器
    if (this._canvas) {
      this._canvas.addEventListener('click', this._boundHandleClick, false);
    }
  }

  public unloadVRM(): void {
    if (this.model?.vrm) {
      this._scene.remove(this.model.vrm.scene);
      this.model?.unLoadVrm();
    }
  }

  public setup(canvas: HTMLCanvasElement, onBodyTouch?: (area: TouchAreaEnum) => void) {
    this._canvas = canvas;
    this._onBodyTouch = onBodyTouch;
    const parentElement = canvas.parentElement;
    const width = parentElement?.clientWidth || canvas.width;
    const height = parentElement?.clientHeight || canvas.height;
    // renderer
    this._renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      // for canvas three capture
      preserveDrawingBuffer: true,
      canvas: canvas,
    });
    this._renderer.setSize(width, height);
    this._renderer.setPixelRatio(window.devicePixelRatio);

    // camera 全身
    this._camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 20);
    this._camera.position.set(0.4, 1.3, 1.5);

    // camera 控制
    this._cameraControls = new OrbitControls(this._camera, this._renderer.domElement);
    this._cameraControls.screenSpacePanning = true;
    this._cameraControls?.target.set(0, 0, 0);
    this._cameraControls.update();

    // Audio 音频播放
    const listener = new THREE.AudioListener();
    this._camera.add(listener);

    // 创建一个全局 audio 源
    this._sound = new THREE.Audio(listener);

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(() => this.resize(), 0);
    });

    resizeObserver.observe(parentElement!);

    // 使用存储的绑定函数添加事件监听器
    this._canvas.addEventListener('click', this._boundHandleClick, false);

    this.isReady = true;
    this.update();
  }

  public unload() {
    // 使用存储的绑定函数移除事件监听器
    if (this._canvas) {
      this._canvas.removeEventListener('click', this._boundHandleClick, false);
    }

    // 卸载模型
    this.unloadVRM();
  }

  public toggleCameraHelper() {
    if (this._cameraHelper) {
      this._scene.remove(this._cameraHelper);
      this._cameraHelper = undefined;
    } else {
      if (!this._camera) return;
      this._cameraHelper = new THREE.CameraHelper(this._camera);
      this._scene.add(this._cameraHelper);
    }
  }

  public toggleCameraControls() {
    if (!this._cameraControls) return;
    this._cameraControls.enabled = !this._cameraControls.enabled;
  }

  public toggleGrid() {
    if (this._gridHelper) {
      this._scene.remove(this._gridHelper);
      this._gridHelper = undefined;
    } else {
      this._gridHelper = new GridHelper(50, 100, 0xaa_aa_aa, 0xaa_aa_aa);
      this._scene.add(this._gridHelper);
    }
  }

  public toggleAxes() {
    if (this._axesHelper) {
      this._scene.remove(this._axesHelper);
      this._axesHelper = undefined;
    } else {
      this._axesHelper = new THREE.AxesHelper(5);
      this._scene.add(this._axesHelper);
    }
  }

  public toggleFloor() {
    if (this._floor) {
      this._scene.remove(this._floor);
      this._floor = undefined;
    } else {
      this._floor = new Mesh(
        new PlaneGeometry(100, 100),
        new MeshLambertMaterial({
          color: 0x99_99_99,
          depthWrite: true,
        }),
      );
      this._floor.position.y = -0.5;
      this._floor.rotation.x = -Math.PI / 2;
      this._scene.add(this._floor);
    }
  }

  public resize() {
    if (!this._renderer) return;

    const parentElement = this._renderer.domElement.parentElement;
    if (!parentElement) return;

    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(parentElement.clientWidth, parentElement.clientHeight);

    if (!this._camera) return;
    this._camera.aspect = parentElement.clientWidth / parentElement.clientHeight;
    this._camera.updateProjectionMatrix();
  }

  public resetCamera() {
    const chestNode = this.model?.vrm?.humanoid.getNormalizedBoneNode('chest');

    if (chestNode) {
      const chestWPos = chestNode.getWorldPosition(new THREE.Vector3());
      this._camera?.position.set(this._camera.position.x, chestWPos.y, this._camera.position.z);
      this._cameraControls?.target.set(chestWPos.x, chestWPos.y, chestWPos.z);
      this._cameraControls?.update();
    }
  }

  public update = () => {
    requestAnimationFrame(this.update);
    const delta = this._clock.getDelta();
    // update vrm components
    if (this.model) {
      this.model.update(delta);
    }
    // 更新镜头动画
    if (this._isDancing && this._cameraMixer) {
      this._cameraMixer.update(delta);
      // 确保相机的世界矩阵被更新
      this._camera?.updateMatrixWorld(true);
    }
    if (this._cameraHelper) {
      this._cameraHelper.update();
    }

    if (this._renderer && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  };

  private handleClick = (event: MouseEvent) => {
    if (this._isDancing || !this.model || !this._camera || !this._renderer) return;

    const rect = this._renderer.domElement.getBoundingClientRect();
    this._mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this._mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const intersects = this.model.handleRaycasterIntersection(this._mouse, this._camera);
    if (!intersects) return;

    const touchArea = this.model.handleClick(intersects);

    if (touchArea && this._onBodyTouch) {
      this._onBodyTouch(touchArea);
    }
  };

  public stopCameraAnimation(): void {
    if (this._cameraAction) {
      this._cameraAction.stop();
    }
    if (this._cameraMixer) {
      this._cameraMixer.stopAllAction();
    }
    // 重新启用 OrbitControls
    if (this._cameraControls) {
      this._cameraControls.enabled = true;
    }
  }

  public async playCameraUrl(cameraUrl: string): Promise<void> {
    if (!cameraUrl || !this._camera) return;

    const cameraAnimation = await loadVMDCamera(cameraUrl, this._camera);
    if (cameraAnimation) {
      this._cameraMixer = new THREE.AnimationMixer(this._camera);
      this._cameraAction = this._cameraMixer.clipAction(cameraAnimation);
      this._cameraAction.play();
      this._cameraAction.clampWhenFinished = false;
      // 禁用 OrbitControls
      if (this._cameraControls) {
        this._cameraControls.enabled = false;
      }
    }
  }
}
