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
  private _headHitbox?: THREE.Mesh;
  private _headHitboxSize: Vector3 = new Vector3(0.2, 0.25, 0.2);

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
  public async dance(danceUrl: string, audioUrl: string, onEnd?: () => void) {
    if (!this._sound || !this.model) {
      console.error('Audio Object or Model Object Not Existed');
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
    };
    const buffer = await audioLoader.loadAsync(audioUrl);
    this._sound.setBuffer(buffer);
    this._sound.setVolume(0.5);
    this._sound.play();

    this.model?.playMotionUrl(MotionFileType.VMD, danceUrl, false);
  }

  public resetToIdle() {
    this._sound?.stop();
    this.model?.loadIdleAnimation();
    this._isDancing = false;
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

    if (this.model?.vrm) {
      this.createHeadHitbox();
    }

    // 重新设置事件监听器
    if (this._canvas) {
      this._canvas.addEventListener('click', this._boundHandleClick, false);
    }
  }

  public unloadVRM(): void {
    if (this.model?.vrm) {
      if (this._headHitbox) {
        this._headHitbox.parent?.remove(this._headHitbox);
        this._headHitbox.geometry.dispose();
        (this._headHitbox.material as MeshBasicMaterial).dispose();
        this._headHitbox = undefined;
      }
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
    if (this._cameraHelper) {
      this._cameraHelper.update();
    }

    if (this.model?.vrm && this._headHitbox) {
      this.updateHeadHitbox();
    }

    if (this._renderer && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  };

  private handleRaycasterIntersection(event: MouseEvent): THREE.Intersection[] | null {
    if (!this.model?.vrm || !this._camera || !this._renderer) {
      return null;
    }

    const rect = this._renderer.domElement.getBoundingClientRect();
    this._mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this._mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this._raycaster.setFromCamera(this._mouse, this._camera);

    return this._raycaster.intersectObjects(this._scene.children, true);
  }

  private handleClick = (event: MouseEvent) => {
    if (this._isDancing) return;

    const intersects = this.handleRaycasterIntersection(event);
    if (!intersects || intersects.length === 0) return;

    // 检查是否点击了头部 hitbox
    const headHitboxIntersect = intersects.find(
      (intersect) => intersect.object === this._headHitbox,
    );
    if (headHitboxIntersect) {
      this.handleBodyPartClick(VRMHumanBoneName.Head);
      return;
    }

    const intersectedPoint = intersects[0].point;
    const closestBone = this.findClosestBone(intersectedPoint);

    console.log('closestBone', closestBone, intersects);

    if (closestBone) {
      this.handleBodyPartClick(closestBone);
    }
  };

  private getHeadBones(): VRMHumanBoneName[] {
    return [
      VRMHumanBoneName.Head,
      VRMHumanBoneName.Neck,
      VRMHumanBoneName.LeftEye,
      VRMHumanBoneName.RightEye,
      VRMHumanBoneName.Jaw,
    ];
  }

  private findClosestBone(point: THREE.Vector3): VRMHumanBoneName | null {
    if (!this.model?.vrm) return null;

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
      const boneData = this.model!.vrm!.humanoid.getNormalizedBoneNode(boneName);
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

  private handleBodyPartClick(boneName: VRMHumanBoneName) {
    const touchArea = this.mapBoneNameToTouchArea(boneName);

    // 调用回调函数
    if (this._onBodyTouch && touchArea) {
      this._onBodyTouch(touchArea);
    }
  }

  private mapBoneNameToTouchArea(boneName: VRMHumanBoneName): TouchAreaEnum | null {
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

  private createHeadHitbox() {
    if (!this.model?.vrm) return;

    const headBone = this.model.vrm.humanoid.getNormalizedBoneNode('head');
    if (!headBone) return;

    const geometry = new BoxGeometry(
      this._headHitboxSize.x,
      this._headHitboxSize.y,
      this._headHitboxSize.z,
    );
    const material = new MeshBasicMaterial({
      color: 0x00ff00, // 绿色
      transparent: true,
      opacity: 0.5,
      visible: false,
    });
    this._headHitbox = new Mesh(geometry, material);

    headBone.add(this._headHitbox);

    // 调整 hitbox 的位置，使其位于头部中心偏下的位置
    this._headHitbox.position.set(0, this._headHitboxSize.y * 0.3, 0);
  }

  private updateHeadHitbox() {
    if (!this.model?.vrm || !this._headHitbox) return;

    const headBone = this.model.vrm.humanoid.getNormalizedBoneNode('head');
    if (!headBone) return;

    // 更新 hitbox 的缩放以匹配模型的缩放
    const scale = new Vector3();
    headBone.getWorldScale(scale);
    this._headHitbox.scale.copy(scale);
  }
}
