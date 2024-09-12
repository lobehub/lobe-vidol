import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import motionsList from '@/animations/Motion/index.json';
import postureList from '@/animations/Posture/index.json';
import { MotionPresetName } from '@/libs/emoteController/MotionPresetName';
import {
  MotionAnimation,
  MotionCategoryEnum,
  TouchActionConfig,
  TouchAreaEnum,
} from '@/types/touch';

export const DEFAULT_TOUCH_ACTION_CONFIG_FEMALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyA',
      motion: MotionPresetName.Happy,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyB',
      motion: MotionPresetName.Happy,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyC',
      motion: MotionPresetName.Happy,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyD',
      motion: MotionPresetName.Happy,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryA',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryB',
      motion: MotionPresetName.Angry,
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyA',
      motion: MotionPresetName.Happy,
    },
    {
      expression: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.armAction.relaxedA',
      motion: MotionPresetName.HappyHandGesture,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyB',
      motion: MotionPresetName.Happy,
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.legAction.surprisedA',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryA',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryB',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryC',
      motion: MotionPresetName.Angry,
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryA',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryB',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryC',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.chestAction.surprisedA',
      motion: MotionPresetName.Angry,
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.bellyAction.surprisedA',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.bellyAction.angryA',
      motion: MotionPresetName.Angry,
    },
    {
      expression: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.bellyAction.relaxedA',
      motion: MotionPresetName.HappyHandGesture,
    },
    {
      expression: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.bellyAction.relaxedB',
      motion: MotionPresetName.HappyHandGesture,
    },
  ],
};

export const DEFAULT_TOUCH_ACTION_CONFIG_MALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralA',
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralB',
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralC',
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralA',
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralB',
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralC',
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.legAction.neutralA',
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.legAction.neutralB',
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.maleAction.legAction.angryA',
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.chestAction.neutralA',
    },
    {
      expression: VRMExpressionPresetName.BlinkLeft,
      text: 'touch.maleAction.chestAction.blinkLeftA',
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.bellyAction.neutralA',
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.maleAction.bellyAction.happyA',
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.bellyAction.neutralB',
    },
  ],
};

export const EMPTY_TOUCH_CONFIG: TouchActionConfig = {
  [TouchAreaEnum.Head]: [],
  [TouchAreaEnum.Arm]: [],
  [TouchAreaEnum.Leg]: [],
  [TouchAreaEnum.Chest]: [],
  [TouchAreaEnum.Belly]: [],
};

export const MAX_TOUCH_ACTION_TEXT_LENGTH = 100;

export const DEFAULT_MOTION_ANIMATION: MotionAnimation[] = motionsList as MotionAnimation[];

export const DEFAULT_POSTURE_ANIMATION: MotionAnimation[] = postureList as MotionAnimation[];

export const TOUCH_MOTION_ANIMATION: MotionAnimation[] = motionsList.filter(
  (item) => item.category === MotionCategoryEnum.NORMAL,
) as MotionAnimation[];
