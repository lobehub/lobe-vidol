import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import { GenderEnum } from '@/types/agent';
import { Config } from '@/types/config';
import { TouchActionConfig, TouchAreaEnum } from '@/types/touch';

export interface SettingState {
  config: Config;
}

export const DEFAULT_TOUCH_ACTION_CONFIG_FEMALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyA',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyB',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyC',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.headAction.happyD',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryA',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.headAction.angryB',
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyA',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.armAction.relaxedA',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: 'touch.femaleAction.armAction.happyB',
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.legAction.surprisedA',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryA',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryB',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.legAction.angryC',
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryA',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryB',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.chestAction.angryC',
    },
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.chestAction.surprisedA',
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: 'touch.femaleAction.bellyAction.surprisedA',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: 'touch.femaleAction.bellyAction.angryA',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.bellyAction.relaxedA',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: 'touch.femaleAction.bellyAction.relaxedB',
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

export const DEFAULT_TOUCH_ACTION_CONFIG_OTHER: TouchActionConfig = {
  [TouchAreaEnum.Head]: [],
  [TouchAreaEnum.Arm]: [],
  [TouchAreaEnum.Leg]: [],
  [TouchAreaEnum.Chest]: [],
  [TouchAreaEnum.Belly]: [],
};

const initialState: SettingState = {
  config: {
    locale: 'auto',
    backgroundEffect: 'glow',
    languageModel: {
      openAI: {
        apikey: '',
        endpoint: '',
      },
    },
    touch: {
      [GenderEnum.FEMALE]: DEFAULT_TOUCH_ACTION_CONFIG_FEMALE,
      [GenderEnum.MALE]: DEFAULT_TOUCH_ACTION_CONFIG_MALE,
      [GenderEnum.OTHER]: DEFAULT_TOUCH_ACTION_CONFIG_OTHER,
    },
  },
};

export { initialState };
