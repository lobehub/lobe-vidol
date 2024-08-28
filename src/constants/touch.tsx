import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import motionsList from '@/animations/Motion/index.json';
import postureList from '@/animations/Posture/index.json';
import {
  MotionAnimation,
  MotionCategoryEnum,
  TouchActionConfig,
  TouchAreaEnum,
} from '@/types/touch';

export const HAPPY_MOTION_ID = 'c9c98a38-b96c-11e4-a802-0aaa78deedf9';
export const ANGRY_MOTION_ID = 'c9c98b02-b96c-11e4-a802-0aaa78deedf9';
export const RELAX_MOTION_ID = 'c9c98361-b96c-11e4-a802-0aaa78deedf9';
export const GREETING_MOTION_ID = 'c9c7996a-b96c-11e4-a802-0aaa78deedf9';

export const DEFAULT_TOUCH_ACTION_CONFIG_FEMALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyA',
      motion: HAPPY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyB',
      motion: HAPPY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyC',
      motion: HAPPY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyD',
      motion: HAPPY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryA',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryB',
      motion: ANGRY_MOTION_ID,
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyA',
      motion: HAPPY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.armAction.relaxedA',
      motion: RELAX_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyB',
      motion: HAPPY_MOTION_ID,
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.legAction.surprisedA',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryA',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryB',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryC',
      motion: ANGRY_MOTION_ID,
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryA',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryB',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryC',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.chestAction.surprisedA',
      motion: ANGRY_MOTION_ID,
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.bellyAction.surprisedA',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.bellyAction.angryA',
      motion: ANGRY_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.bellyAction.relaxedA',
      motion: RELAX_MOTION_ID,
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.bellyAction.relaxedB',
      motion: RELAX_MOTION_ID,
    },
  ],
};

export const DEFAULT_TOUCH_ACTION_CONFIG_MALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralA',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralB',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.headAction.neutralC',
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralA',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralB',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.armAction.neutralC',
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.legAction.neutralA',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.legAction.neutralB',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.maleAction.legAction.angryA',
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.chestAction.neutralA',
    },
    {
      emotion: VRMExpressionPresetName.BlinkLeft,
      text: 'touch.maleAction.chestAction.blinkLeftA',
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: 'touch.maleAction.bellyAction.neutralA',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.maleAction.bellyAction.happyA',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
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
