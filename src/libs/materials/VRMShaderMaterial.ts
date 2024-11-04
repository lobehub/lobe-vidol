import * as THREE from 'three';

import { VRMMaterial } from '../data/VRMMaterial';
import common_mtoon from '../shaders/common_mtoon.glsl';
import lights_mtoon_pars_fragment from '../shaders/lights_mtoon_pars_fragment.glsl';
import mtoon_frag from '../shaders/mtoon_frag.glsl';
import mtoon_vert from '../shaders/mtoon_vert.glsl';

Object.assign(THREE.ShaderChunk, {
  common_mtoon,
  lights_mtoon_pars_fragment,
});

const defaultParameters = new Map<string, THREE.ShaderMaterialParameters>([
  [
    'VRM/UnlitTexture',
    {
      defines: {},
      uniforms: {
        ...THREE.ShaderLib.basic.uniforms,
        f_Cutoff: { value: 0.0 },
        v_Color: { value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0) },
      },
      vertexShader: THREE.ShaderLib.basic.vertexShader,
      fragmentShader: THREE.ShaderLib.basic.fragmentShader,
      lights: false,
    },
  ],
  [
    'VRM/UnlitCutout',
    {
      defines: {},
      uniforms: {
        ...THREE.ShaderLib.basic.uniforms,
        f_Cutoff: { value: 0.0 },
        v_Color: { value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0) },
      },
      vertexShader: THREE.ShaderLib.basic.vertexShader,
      fragmentShader: THREE.ShaderLib.basic.fragmentShader,
      lights: false,
    },
  ],
  [
    'VRM/UnlitTransparent',
    {
      defines: {},
      uniforms: {
        ...THREE.ShaderLib.basic.uniforms,
        f_Cutoff: { value: 0.0 },
        v_Color: { value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0) },
      },
      vertexShader: THREE.ShaderLib.basic.vertexShader,
      fragmentShader: THREE.ShaderLib.basic.fragmentShader,
      lights: false,
    },
  ],
  [
    'VRM/UnlitTransparentZWrite',
    {
      defines: {},
      uniforms: {
        ...THREE.ShaderLib.basic.uniforms,
        f_Cutoff: { value: 0.0 },
        v_Color: { value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0) },
      },
      vertexShader: THREE.ShaderLib.basic.vertexShader,
      fragmentShader: THREE.ShaderLib.basic.fragmentShader,
      lights: false,
    },
  ],
  [
    'VRM/MToon',
    {
      defines: {},
      uniforms: {
        ...THREE.ShaderLib.phong.uniforms,
        f_Cutoff: { value: 0.0 },
        v_Color: { value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0) },
      },
      vertexShader: mtoon_vert,
      fragmentShader: mtoon_frag,
      lights: true,
    },
  ],
]);

const convertParameters = new Map<string, (material: VRMShaderMaterial) => void>([
  [
    'common',
    (material) => {
      // if (material.defines._ALPHAPREMULTIPLY_ON !== undefined) {
      //   material.defines.PREMULTIPLIED_ALPHA = material.defines._ALPHAPREMULTIPLY_ON;
      // }

      if (material.uniforms.f_Cutoff) {
        material.defines.ALPHATEST = (material.uniforms.f_Cutoff.value as number).toFixed(6);
      }

      const color = material.uniforms.v_Color.value;
      material.uniforms.diffuse = { value: new THREE.Color(color.x, color.y, color.z) };
      material.uniforms.opacity = { value: color.w };

      if (material.uniforms.t_MainTex) {
        material.map = material.uniforms.t_MainTex.value;
        material.uniforms.map = material.uniforms.t_MainTex;
      }
    },
  ],
  ['VRM/UnlitTexture', (material) => null],
  ['VRM/UnlitCutout', (material) => null],
  [
    'VRM/UnlitTransparent',
    (material) => {
      material.transparent = true;
    },
  ],
  [
    'VRM/UnlitTransparentZWrite',
    (material) => {
      material.transparent = true;
    },
  ],
  [
    'VRM/MToon',
    (material) => {
      if (!material.uniforms.t_SphereAdd) {
        material.uniforms.t_SphereAdd = {
          value: new THREE.DataTexture(new Uint8Array(3), 1, 1, THREE.RGBFormat),
        };
      }

      material.uniforms.shininess = { value: 0.0 };

      switch (material.userData.RenderType.value) {
        case 'Opaque': {
          delete material.defines.ALPHATEST;
          break;
        }
        case 'Cutout': {
          break;
        }
        case 'Transparent': {
          delete material.defines.ALPHATEST;
          material.transparent = true;
          break;
        }
        case 'TransparentCutout': {
          material.transparent = true;
          break;
        }
      }

      if (material.uniforms.f_BumpScale) {
        const normalScale = new THREE.Vector2(1, 1).multiplyScalar(
          material.uniforms.f_BumpScale.value,
        );
        material.normalScale = normalScale;
        material.uniforms.normalScale = { value: normalScale };
      }
      if (material.uniforms.t_BumpMap) {
        material.normalMap = material.uniforms.t_BumpMap.value;
        material.uniforms.normalMap = material.uniforms.t_BumpMap;
      }

      if (material.uniforms.v_EmissionColor) {
        material.emissive = material.uniforms.v_EmissionColor.value;
        material.uniforms.emissive = material.uniforms.v_EmissionColor;
      }
      if (material.uniforms.t_EmissionMap) {
        material.emissiveMap = material.uniforms.t_EmissionMap.value;
        material.uniforms.emissiveMap = material.uniforms.t_EmissionMap;
      }

      if (material.uniforms.f_CullMode) {
        switch (material.uniforms.f_CullMode.value) {
          case 0: {
            material.side = THREE.DoubleSide;
            break;
          }
          case 1: {
            material.side = THREE.BackSide;
            break;
          }
          case 2: {
            material.side = THREE.FrontSide;
            break;
          }
        }
      }
    },
  ],
]);

export class VRMShaderMaterial extends THREE.ShaderMaterial {
  [key: string]: any;

  constructor(parameters?: THREE.ShaderMaterialParameters) {
    super(parameters);

    Object.assign(this.uniforms, { v_Color: { value: new THREE.Vector4(1.0, 0.0, 1.0, 1.0) } });
    this.vertexShader = THREE.ShaderLib.basic.vertexShader;
    this.fragmentShader = THREE.ShaderLib.basic.fragmentShader;

    const commonConverter = convertParameters.get('common');
    if (commonConverter) {
      commonConverter(this);
    }
  }

  public fromMaterialProperty(property: VRMMaterial, textures: THREE.Texture[]) {
    this.name = property.shader;

    if (!defaultParameters.has(property.shader) || !convertParameters.has(property.shader)) {
      return;
    }

    const parameters = defaultParameters.get(property.shader);
    if (!parameters) {
      return;
    }

    const defines: any = {};
    const uniforms: any = {};

    for (const key of Object.keys(property.floatProperties)) {
      uniforms['f' + key] = { value: property.floatProperties[key] };
    }

    for (const key of Object.keys(property.vectorProperties)) {
      const array = property.vectorProperties[key].concat();
      array.length = 4;
      uniforms['v' + key] = { value: new THREE.Vector4().fromArray(array) };
    }

    for (const key of Object.keys(property.textureProperties)) {
      if (textures[property.textureProperties[key]] !== undefined) {
        uniforms['t' + key] = { value: textures[property.textureProperties[key]] };
      }
    }

    for (const key of Object.keys(property.keywordMap)) {
      defines[key] = property.keywordMap[key];
    }

    for (const key of Object.keys(property.tagMap)) {
      this.userData[key] = { value: property.tagMap[key] };
    }

    if (parameters.defines) {
      Object.assign(this.defines, parameters.defines);
    }
    Object.assign(this.defines, defines);

    if (parameters.uniforms) {
      Object.assign(this.uniforms, parameters.uniforms);
    }
    Object.assign(this.uniforms, uniforms);

    if (parameters.vertexShader) {
      this.vertexShader = parameters.vertexShader;
    }
    if (parameters.fragmentShader) {
      this.fragmentShader = parameters.fragmentShader;
    }
    if (parameters.lights !== undefined) {
      this.lights = parameters.lights;
    }

    const commonConverter = convertParameters.get('common');
    const shaderConverter = convertParameters.get(property.shader);

    if (commonConverter) {
      commonConverter(this);
    }
    if (shaderConverter) {
      shaderConverter(this);
    }
  }
}
