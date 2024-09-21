import { MotionFileType } from './type';

export enum MotionPresetName {
  FemaleHappy = 'femalehappy', //开心
  FemaleAngry = 'femaleangry', //生气
  FemaleGreeting = 'femalegreeting', //招呼
  Idle = 'idle', //空闲
}

export const motionPresetMap: Record<
  MotionPresetName,
  {
    url: string;
    type: MotionFileType;
    name: string;
  }
> = {
  idle: {
    type: MotionFileType.VRMA,
    name: 'Idle',
    url: './idle_loop.vrma',
  },
  femalehappy: {
    url: 'https://r2.vidol.chat/animations/c9c98a38-b96c-11e4-a802-0aaa78deedf9.fbx',
    type: MotionFileType.FBX,
    name: 'Female/Happy',
  },
  femaleangry: {
    url: 'https://r2.vidol.chat/animations/c9c98b02-b96c-11e4-a802-0aaa78deedf9.fbx',
    type: MotionFileType.FBX,
    name: 'Female/Angry',
  },
  femalegreeting: {
    url: 'https://r2.vidol.chat/animations/c9c7996a-b96c-11e4-a802-0aaa78deedf9.fbx',
    type: MotionFileType.FBX,
    name: 'Female/Greeting',
  },
};
