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
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';

import { VRM_TO_MMD_SCALE } from '@/constants/common';
import { loadVMDCamera } from '@/libs/VMDAnimation/loadVMDCamera';
import { MotionFileType } from '@/libs/emoteController/type';
import { TouchAreaEnum } from '@/types/touch';

import { loadPMXStage } from '../PMXAssets/loadPMXStage';
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
  private _mouse: THREE.Vector2;
  private _canvas?: HTMLCanvasElement;
  private _boundHandleClick: (event: MouseEvent) => void;
  private _onBodyTouch?: (area: TouchAreaEnum) => void;
  private _isDancing: boolean = false;
  private _cameraMixer?: THREE.AnimationMixer;
  private _cameraAction?: THREE.AnimationAction;
  private _currentStage?: THREE.Group;

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
    this._mouse = new THREE.Vector2();

    // 在构造函数中绑定 handleClick 方法
    this._boundHandleClick = this.handleClick.bind(this);
  }

  /**
   * 播放舞蹈，以音乐文件的播放作为结束标志。
   */
  public async dance(srcUrl: string, audioUrl: string, cameraUrl?: string) {
    if (!this._sound || !this.model) {
      console.error('音频对象或模型对象不存在');
      return null;
    }

    // 1. 关闭当前舞蹈, 设置环境
    this._sound.stop();
    this._isDancing = true;

    // 2. 加载文件

    // 加载音乐文件
    const audioLoader = new THREE.AudioLoader();
    const audioPromise = audioLoader.loadAsync(audioUrl).then((buffer) => {
      if (this._sound) {
        this._sound.setBuffer(buffer);
        this._sound.setVolume(0.5);
        // 监听音频播放结束事件
        this._sound.onEnded = () => {
          this.handleDanceEnd();
        };
      }
    });

    // 加载摄像机动画
    let cameraPromise = null;
    if (cameraUrl && this._camera) {
      const scale = this.calculateVRMScale();
      cameraPromise = loadVMDCamera(cameraUrl, this._camera, scale).then((cameraAnimation) => {
        if (this._camera && cameraAnimation) {
          this._cameraMixer = new THREE.AnimationMixer(this._camera);
          this._cameraAction = this._cameraMixer.clipAction(cameraAnimation);
        }
      });
    }

    // 并行加载
    await Promise.all([audioPromise, cameraPromise]);

    // 3. 加载舞蹈
    await this.model?.playMotionUrl(MotionFileType.VMD, srcUrl, false);

    // 开始播放
    this._sound.play();
    if (cameraUrl) this.playCameraAnimation();
    // 将 canvas 全屏加载
    this.requestFullScreen();
  }

  public resetToIdle() {
    this._sound?.stop();
    this._isDancing = false;
    this.model?.loadIdleAnimation();
    // 停止镜头动画
    this.stopCameraAnimation();
    // 重置镜头
    this.resetCamera();
  }

  public removeStage() {
    // 卸载当前舞台
    if (this._currentStage) {
      this._scene.remove(this._currentStage);
      this._currentStage.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
      this._currentStage = undefined;
    }
  }

  /**
   * 加载舞台
   */
  public async loadStage(stageUrl: string) {
    if (!stageUrl) return;
    this.removeStage();
    // 加载新舞台
    const stageGroup = await loadPMXStage(stageUrl);
    if (stageGroup) {
      this._currentStage = stageGroup;
      this._scene.add(this._currentStage);
    }
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

    // 如果没有加载舞台，那么开启网格
    if (!this._currentStage) this.enableGrid();
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
      powerPreference: 'high-performance',
      canvas: canvas,
    });
    this._renderer.setSize(width, height);
    this._renderer.setPixelRatio(window.devicePixelRatio);

    // 相机初始化
    this._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    this._camera.position.set(0, 1.5, 2.0);

    // camera 控制 - 添加一些限制
    this._cameraControls = new OrbitControls(this._camera, this._renderer.domElement);
    this._cameraControls.screenSpacePanning = true;
    this._cameraControls.target.set(0, 1.0, 0); // 将目标点稍微抬高
    // this._cameraControls.minDistance = 1.0; // 设置最小距离
    // this._cameraControls.maxDistance = 5.0; // 设置最大距离
    // this._cameraControls.maxPolarAngle = Math.PI * 0.75; // 限制相机俯仰角度
    this._cameraControls.update();

    // Audio 音频播放
    const listener = new THREE.AudioListener();
    // 将播放器挂载到摄像机上
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
      this.disableGrid();
    } else {
      this.enableGrid();
    }
  }

  public enableGrid() {
    if (!this._gridHelper) {
      this._gridHelper = new GridHelper(50, 100, 0xaa_aa_aa, 0xaa_aa_aa);
      this._scene.add(this._gridHelper);
    }
  }

  public disableGrid() {
    if (this._gridHelper) {
      this._scene.remove(this._gridHelper);
      this._gridHelper = undefined;
    }
  }

  public requestFullScreen() {
    // 将 canvas 全屏加载
    if (this._canvas) {
      // 将 canvas 背景设置为黑色
      this._canvas.style.backgroundColor = 'black';
      this._canvas.requestFullscreen();
      // 添加全屏变化事件监听器
      document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    }
  }

  public exitFullScreen() {
    if (this._canvas) {
      // 将 canvas 背景设置为透明
      this._canvas.style.backgroundColor = 'transparent';
    }
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.warn('退出全屏失败:', err);
      });
    }
    // 无论是否成功退出全屏，都移除事件监听器
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
  }

  public toggleFullScreen() {
    if (document.fullscreenElement) {
      this.exitFullScreen();
    } else {
      this.requestFullScreen();
    }
  }

  public toggleAxes() {
    if (this._axesHelper) {
      this._scene.remove(this._axesHelper);
      this._axesHelper = undefined;
    } else {
      this._axesHelper = new THREE.AxesHelper(5);
      this._scene.add(this._axesHelper);

      // 添加 xyz 标识
      const axisLabels = ['X', 'Y', 'Z'];
      const colors = [0xff0000, 0x00ff00, 0x0000ff];

      axisLabels.forEach((label, index) => {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: this.createTextTexture(label),
            color: colors[index],
          }),
        );
        sprite.position.setComponent(index, 0.5); // 将位置设置为0.5，使标记更靠近原点
        sprite.scale.set(0.2, 0.2, 0.2); // 缩小标记尺寸，使其更适合靠近原点的位置
        this._axesHelper?.add(sprite);
      });
    }
  }

  public resize() {
    if (!this._renderer || !this._camera) return;

    const parentElement = this._renderer.domElement.parentElement;
    if (!parentElement) return;

    const width = document.fullscreenElement ? window.innerWidth : parentElement.clientWidth;
    const height = document.fullscreenElement ? window.innerHeight : parentElement.clientHeight;

    this._renderer.setPixelRatio(window.devicePixelRatio);
    this.resizeRenderer(width, height);
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
    if (this._isDancing || !this.model || !this._camera || !this._renderer || this.model.speaking)
      return;

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
      this._cameraAction = undefined;
    }
    if (this._cameraMixer) {
      this._cameraMixer.stopAllAction();
    }
    // 重新启用 OrbitControls
    if (this._cameraControls) {
      this._cameraControls.enabled = true;
    }
  }

  public playCameraAnimation(): void {
    if (this._cameraAction) {
      this._cameraAction.play();
      this._cameraAction.clampWhenFinished = false;
      // 禁用 OrbitControls
      if (this._cameraControls) {
        this._cameraControls.enabled = false;
      }
    }
  }

  private createTextTexture(label: string): THREE.Texture {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = '24px Arial';
      context.fillStyle = 'white';
      context.fillText(label, 0, 24);
    }
    return new THREE.CanvasTexture(canvas);
  }

  // 在 Viewer 类中添加一个新的方法
  private handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      // 进入全屏模式
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.resizeRenderer(width, height);
    } else {
      // 退出全屏模式
      const parentElement = this._canvas?.parentElement;
      if (parentElement) {
        const width = parentElement.clientWidth;
        const height = parentElement.clientHeight;
        this.resizeRenderer(width, height);
      }
      // 手动触发结束逻辑
      this.handleDanceEnd();
    }
  };

  // 新增方法,处理舞蹈结束逻辑
  private handleDanceEnd = () => {
    if (this._isDancing) {
      this._sound?.stop();
      this.exitFullScreen();
      this._isDancing = false;
      this.resetToIdle();
      // 关闭网格
      this.disableGrid();
    }
  };

  // 添加一个新的方法来调整渲染器大小
  private resizeRenderer(width: number, height: number) {
    if (this._renderer && this._camera) {
      this._renderer.setSize(width, height);
      this._camera.aspect = width / height;
      this._camera.updateProjectionMatrix();
    }
  }

  /**
   * 计算当前加载的 VRM 模型的缩放比例
   * @returns 基于模型高度计算的缩放比例
   */
  private calculateVRMScale(): number {
    if (!this.model?.vrm) {
      return VRM_TO_MMD_SCALE;
    }

    const boundingBox = new Box3().setFromObject(this.model.vrm.scene);
    const size = new Vector3();
    boundingBox.getSize(size);
    const vrmHeight = size.y;

    // MMD 标准模型高度约为 20 单位
    const MMD_STANDARD_HEIGHT = 20;
    return vrmHeight / MMD_STANDARD_HEIGHT;
  }
}
