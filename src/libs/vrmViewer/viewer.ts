import { VRMHumanBoneName } from '@pixiv/three-vrm';
import { Parser } from 'mmd-parser';
import * as THREE from 'three';
import { Audio, GridHelper, Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

  constructor() {
    this.isReady = false;

    // scene
    const scene = new THREE.Scene();
    this._scene = scene;

    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xff_ff_ff, Math.PI);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // 环境光
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    // scene.add(ambientLight);

    // 渐变光
    // const HemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // HemisphereLight.position.set(0, 20, 0);
    // scene.add(HemisphereLight);

    // animate
    this._clock = new THREE.Clock();
    this._clock.start();
  }

  /**
   * 播放舞蹈，以音乐文件的播放作为结束标志。
   */
  public async dance(danceUrl: string, audioUrl: string, onEnd?: () => void) {
    if (!this._sound || !this.model) {
      console.error('Audio Object or Model Object Not Existed');
      return null;
    }
    this._sound.stop();
    this.model?.disposeAll();
    const audioLoader = new THREE.AudioLoader();
    // 监听音频播放结束事件
    this._sound.onEnded = () => {
      onEnd?.();
      this.model?.loadIdleAnimation();
    };
    const buffer = await audioLoader.loadAsync(audioUrl);
    this._sound.setBuffer(buffer);
    this._sound.setVolume(0.5);
    this._sound.play();

    this.model?.loadVMD(danceUrl, false);
  }

  public resetToIdle() {
    this._sound?.stop();
    this.model?.disposeAll();
    this.model?.loadIdleAnimation();
  }

  /**
   * 加载舞台
   * @param buffer
   */
  public async loadStage(buffer: ArrayBuffer) {
    const pmx = new Parser().parsePmx(buffer);
    this._scene.add(pmx);
  }

  public async loadVrm(url: string) {
    if (this.model?.vrm) {
      this.unloadVRM();
    }

    // gltf and vrm
    this.model = new Model(this._camera || new THREE.Object3D());
    await this.model.loadVRM(url);

    if (!this.model?.vrm) return;

    // Disable frustum culling
    this.model.vrm.scene.traverse((obj) => {
      obj.frustumCulled = false;
    });

    this._scene.add(this.model.vrm.scene);
    await this.model.loadIdleAnimation();

    // HACK: アニメーションの原点がずれているので再生後にカメラ位置を調整する
    requestAnimationFrame(() => {
      this.resetCamera();
    });
  }

  public unloadVRM(): void {
    if (this.model?.vrm) {
      this._scene.remove(this.model.vrm.scene);
      this.model?.unLoadVrm();
    }
  }

  public setup(canvas: HTMLCanvasElement) {
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

    // 假设你已经有一个场景和 VRM 模型
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 添加触摸事件
    canvas.addEventListener(
      'click',
      (event) => {
        if (!this.model) {
          return;
        }
        const rect = canvas.getBoundingClientRect();
        const canvasWidth = rect.width;
        const canvasHeight = rect.height;

        // 将鼠标坐标转换到[-1, 1]范围
        mouse.x = ((event.clientX - rect.left) / canvasWidth) * 2 - 1; // 水平坐标
        mouse.y = -((event.clientY - rect.top) / canvasHeight) * 2 + 1; // 垂直坐标

        // 更新射线
        raycaster.setFromCamera(mouse, this._camera!);

        // 检测与 VRM 模型的交互
        const intersects = raycaster.intersectObjects(this._scene.children, true);
        if (intersects.length > 0) {
          // 触摸到模型，执行反馈效果
          const touchedObject = intersects[0].object;
          const vrmNodeName = this.model.vrm?.humanoid?.getNormalizedBoneNode(
            VRMHumanBoneName.Chest,
          )?.name; // 'Normalized_J_Bip_C_Chest'

          // TODO: 如何对应

          // console.log(touchedObject, vrmNodeName);
          // console.log(intersects);
          // console.log(this.model.vrm?.scene.children);
          // touchedObject.material.color.set(0xff0000); // 改变颜色为红色
          // 你可以在这里添加更多的反馈效果
        }
      },
      false,
    );

    this.isReady = true;
    this.update();
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

    if (this._renderer && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  };
}
