import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { TTS } from './tts';

export const emotions = ['neutral', 'happy', 'angry', 'sad', 'relaxed'] as const;
export type EmotionType = (typeof emotions)[number] | VRMExpressionPresetName;

export enum TouchAreaEnum {
  Arm = 'arm',
  Belly = 'belly',
  Chest = 'chest',
  Head = 'head',
  Leg = 'leg'
}

export interface TouchAction {
  emotion: EmotionType;
  enabled: boolean;
  motion?: string;
  text: string;
}

export interface TouchActionConfig {
  [TouchAreaEnum.Head]: TouchAction[];
  [TouchAreaEnum.Arm]: TouchAction[];
  [TouchAreaEnum.Leg]: TouchAction[];
  [TouchAreaEnum.Chest]: TouchAction[];
  [TouchAreaEnum.Belly]: TouchAction[];
  enabled: boolean;
}

export type Screenplay = {
  emotion: EmotionType;
  tts: TTS;
};
