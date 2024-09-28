import { MotionFileType } from './type';

export enum MotionPresetName {
  FemaleHappy = 'female_happy', //开心
  FemaleAngry = 'female_angry', //生气
  FemaleGreeting = 'female_greeting', //招呼
  FemaleAppeal = 'female_appeal', // 吸引
  Idle = 'idle', //空闲
  FemaleCoverUndies = 'female_cover_undies',
  FemaleKiss = 'female_kiss',
  NumberMeter1 = 'number_meter_1',
  NumberMeter2 = 'number_meter_2',
  NumberMeter3 = 'number_meter_3',
  NumberMeter4 = 'number_meter_4',
  NumberMeter5 = 'number_meter_5',
  FemaleCoverChest = 'female_cover_chest',
  FemaleStand = 'female_stand',
  FemaleStandMix = 'female_stand_mix',
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
  female_happy: {
    url: 'https://r2.vidol.chat/animations/c9c98a38-b96c-11e4-a802-0aaa78deedf9.fbx',
    type: MotionFileType.FBX,
    name: 'Female/Happy',
  },
  female_angry: {
    url: 'https://r2.vidol.chat/animations/c9c98b02-b96c-11e4-a802-0aaa78deedf9.fbx',
    type: MotionFileType.FBX,
    name: 'Female/Angry',
  },
  female_greeting: {
    url: 'https://r2.vidol.chat/animations/c9c7996a-b96c-11e4-a802-0aaa78deedf9.fbx',
    type: MotionFileType.FBX,
    name: 'Female/Greeting',
  },
  female_appeal: {
    url: 'https://r2.vidol.chat/vmd/camera_appeal02.vmd',
    type: MotionFileType.VMD,
    name: 'Female/Appeal',
  },
  // 新增的配置
  female_cover_undies: {
    url: 'https://r2.vidol.chat/vmd/_cover_undies_blush.vmd',
    type: MotionFileType.VMD,
    name: 'Female/Cover Undies',
  },
  female_kiss: {
    url: 'https://r2.vidol.chat/vmd/_kiss2_blush_v02.vmd',
    type: MotionFileType.VMD,
    name: 'Female/Kiss',
  },
  number_meter_1: {
    url: 'https://r2.vidol.chat/vmd/_number_meter_1.vmd',
    type: MotionFileType.VMD,
    name: 'Number Meter 1',
  },
  number_meter_2: {
    url: 'https://r2.vidol.chat/vmd/_number_meter_2.vmd',
    type: MotionFileType.VMD,
    name: 'Number Meter 2',
  },
  number_meter_3: {
    url: 'https://r2.vidol.chat/vmd/_number_meter_3.vmd',
    type: MotionFileType.VMD,
    name: 'Number Meter 3',
  },
  number_meter_4: {
    url: 'https://r2.vidol.chat/vmd/_number_meter_4.vmd',
    type: MotionFileType.VMD,
    name: 'Number Meter 4',
  },
  number_meter_5: {
    url: 'https://r2.vidol.chat/vmd/_number_meter_5.vmd',
    type: MotionFileType.VMD,
    name: 'Number Meter 5',
  },
  female_cover_chest: {
    url: 'https://r2.vidol.chat/vmd/cover_chest_v02.vmd',
    type: MotionFileType.VMD,
    name: 'Female/Cover Chest',
  },
  female_stand: {
    url: 'https://r2.vidol.chat/vmd/stand.vmd',
    type: MotionFileType.VMD,
    name: 'Female/Stand',
  },
  female_stand_mix: {
    url: 'https://r2.vidol.chat/vmd/standmix2_modified.vmd',
    type: MotionFileType.VMD,
    name: 'Female/Stand Mix',
  },
};
