import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import { TTS } from './tts';

export type EmotionType = VRMExpressionPresetName;

export enum TouchAreaEnum {
  Arm = 'arm',
  Belly = 'belly',
  Chest = 'chest',
  Head = 'head',
  Leg = 'leg',
}

export interface TouchAction {
  emotion: EmotionType;
  motion?: string;
  text: string;
}

export interface TouchActionConfig {
  [TouchAreaEnum.Head]: TouchAction[];
  [TouchAreaEnum.Arm]: TouchAction[];
  [TouchAreaEnum.Leg]: TouchAction[];
  [TouchAreaEnum.Chest]: TouchAction[];
  [TouchAreaEnum.Belly]: TouchAction[];
}

export type Screenplay = {
  emotion: EmotionType;
  tts: TTS;
};
