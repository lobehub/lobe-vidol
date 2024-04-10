declare module 'mmd-parser' {
  export const CharsetEncoder: any;
  export class Parser {
    parsePmd(buffer: ArrayBufferLike, leftToRight?: boolean): any;
    parsePmx(buffer: ArrayBufferLike, leftToRight?: boolean): any;
    parseVmd(buffer: ArrayBufferLike, leftToRight?: boolean): VmdFile;
    parseVpd(buffer: ArrayBufferLike, leftToRight?: boolean): any;
    mergeVmds(vmds: VmdFile[]): VmdFile;
    leftToRightModel(model: any): any;
    leftToRightVmd(vmd: any): any;
    leftToRightVpd(vpd: any): any;
  }

  export interface VmdFile {
    cameras: {
      distance: number;
      fov: number;
      frameNum: number;
      interpolation: number[];
      perspective: number;
      position: number[];
      rotation: number[];
    }[];
    metadata: {
      cameraCount: number;
      coordinateSystem: string;
      magic: string;
      morphCount: number;
      motionCount: number;
      name: string;
    };
    morphs: {
      frameNum: number;
      morphName: string;
      weight: number;
    }[];
    motions: {
      boneName: string;
      frameNum: number;
      interpolation: number[];
      position: number[];
      rotation: number[];
    }[];
  }
}
