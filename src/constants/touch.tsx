import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import motionsList from '@/animations/Motion/index.json';
import postureList from '@/animations/Posture/index.json';
import { MotionPresetName } from '@/libs/emoteController/motionPresetMap';
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
      motion: MotionPresetName.FemaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyB',
      motion: MotionPresetName.FemaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyC',
      motion: MotionPresetName.FemaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyD',
      motion: MotionPresetName.FemaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryA',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryB',
      motion: MotionPresetName.FemaleAngry,
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyA',
      motion: MotionPresetName.FemaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.armAction.relaxedA',
      motion: MotionPresetName.FemaleGreeting,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyB',
      motion: MotionPresetName.FemaleHappy,
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.legAction.surprisedA',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryA',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryB',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryC',
      motion: MotionPresetName.FemaleAngry,
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryA',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryB',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryC',
      motion: MotionPresetName.FemaleCoverChest,
    },
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.chestAction.surprisedA',
      motion: MotionPresetName.FemaleCoverChest,
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.bellyAction.surprisedA',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.bellyAction.angryA',
      motion: MotionPresetName.FemaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.bellyAction.relaxedA',
      motion: MotionPresetName.FemaleGreeting,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.bellyAction.angryB',
      motion: MotionPresetName.FemaleAngry,
    },
  ],
  [TouchAreaEnum.Buttocks]: [
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.buttocksAction.surprisedA',
      motion: MotionPresetName.FemaleCoverUndies,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.buttocksAction.angryA',
      motion: MotionPresetName.FemaleCoverUndies,
    },
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.buttocksAction.embarrassedA',
      motion: MotionPresetName.FemaleCoverUndies,
    },
  ],
};

export const DEFAULT_TOUCH_ACTION_CONFIG_MALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralA',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralB',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralC',
      motion: MotionPresetName.MaleHappy,
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralA',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralB',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralC',
      motion: MotionPresetName.MaleHappy,
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.legAction.neutralA',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.legAction.neutralB',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.maleAction.legAction.angryA',
      motion: MotionPresetName.MaleAngry,
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.chestAction.neutralA',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.BlinkLeft,
      text: 'touch.maleAction.chestAction.blinkLeftA',
      motion: MotionPresetName.MaleHappy,
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.bellyAction.neutralA',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Happy,
      text: 'touch.maleAction.bellyAction.happyA',
      motion: MotionPresetName.MaleHappy,
    },
    {
      expression: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.bellyAction.neutralB',
      motion: MotionPresetName.MaleHappy,
    },
  ],
  [TouchAreaEnum.Buttocks]: [
    {
      expression: VRMExpressionPresetName.Surprised,
      text: 'touch.maleAction.buttocksAction.surprisedA',
      motion: MotionPresetName.MaleAngry,
    },
    {
      expression: VRMExpressionPresetName.Angry,
      text: 'touch.maleAction.buttocksAction.angryA',
      motion: MotionPresetName.MaleAngry,
    },
  ],
};

export const EMPTY_TOUCH_CONFIG: TouchActionConfig = {
  [TouchAreaEnum.Head]: [],
  [TouchAreaEnum.Arm]: [],
  [TouchAreaEnum.Leg]: [],
  [TouchAreaEnum.Chest]: [],
  [TouchAreaEnum.Belly]: [],
  [TouchAreaEnum.Buttocks]: [],
};

export const MAX_TOUCH_ACTION_TEXT_LENGTH = 100;

export const DEFAULT_MOTION_ANIMATION: MotionAnimation[] = motionsList as MotionAnimation[];

export const DEFAULT_POSTURE_ANIMATION: MotionAnimation[] = postureList as MotionAnimation[];

export const TOUCH_MOTION_ANIMATION: MotionAnimation[] = motionsList.filter(
  (item) => item.category === MotionCategoryEnum.NORMAL,
) as MotionAnimation[];
