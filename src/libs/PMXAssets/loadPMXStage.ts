import { Group, Mesh } from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';

import { VRM_TO_MMD_SCALE } from '@/constants/common';

export async function loadPMXStage(url: string, scale = VRM_TO_MMD_SCALE) {
  const loader = new MMDLoader();
  const mesh = await loader.loadAsync(url, () => {});

  if (mesh) {
    // 创建一个新的Group来包含缩放后的舞台
    const stageGroup = new Group();

    // 设置舞台的缩放比例，这里使用0.1作为示例，您可能需要根据实际情况调整
    stageGroup.scale.set(scale, scale, scale);

    // 将加载的mesh添加到group中
    stageGroup.add(mesh);

    // 设置阴影属性
    mesh.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return stageGroup;
  }

  return null;
}
