import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { t } from 'i18next';

import { TouchActionConfig, TouchAreaEnum } from '@/types/touch';

export const TOUCH_AREA_OPTIONS = [
  {
    label: t('touch.area.head', { ns: 'constants' }),
    value: TouchAreaEnum.Head,
  },
  {
    label: t('touch.area.arm', { ns: 'constants' }),
    value: TouchAreaEnum.Arm,
  },
  {
    label: t('touch.area.leg', { ns: 'constants' }),
    value: TouchAreaEnum.Leg,
  },
  {
    label: t('touch.area.chest', { ns: 'constants' }),
    value: TouchAreaEnum.Chest,
  },
  {
    label: t('touch.area.belly', { ns: 'constants' }),
    value: TouchAreaEnum.Belly,
  },
];

export const TOUCH_EMOTION_OPTIONS = [
  {
    label: t('touch.emotion.natural', { ns: 'constants' }),
    value: VRMExpressionPresetName.Neutral,
  },
  { label: t('touch.emotion.happy', { ns: 'constants' }), value: VRMExpressionPresetName.Happy },
  { label: t('touch.emotion.angry', { ns: 'constants' }), value: VRMExpressionPresetName.Angry },
  { label: t('touch.emotion.sad', { ns: 'constants' }), value: VRMExpressionPresetName.Sad },
  {
    label: t('touch.emotion.relaxed', { ns: 'constants' }),
    value: VRMExpressionPresetName.Relaxed,
  },
  {
    label: t('touch.emotion.surprised', { ns: 'constants' }),
    value: VRMExpressionPresetName.Surprised,
  },
  { label: t('touch.emotion.blink', { ns: 'constants' }), value: VRMExpressionPresetName.Blink },
  {
    label: t('touch.emotion.blinkLeft', { ns: 'constants' }),
    value: VRMExpressionPresetName.BlinkLeft,
  },
  {
    label: t('touch.emotion.blinkRight', { ns: 'constants' }),
    value: VRMExpressionPresetName.BlinkRight,
  },
];

export const EMPTY_TTS_CONFIG: TouchActionConfig = {
  [TouchAreaEnum.Head]: [],
  [TouchAreaEnum.Arm]: [],
  [TouchAreaEnum.Leg]: [],
  [TouchAreaEnum.Chest]: [],
  [TouchAreaEnum.Belly]: [],
};

export const MAX_TOUCH_ACTION_TEXT_LENGTH = 100;

export const DEFAULT_TOUCH_ACTION_CONFIG_FEMALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: t('touch.femaleAction.headAction.happyA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: t('touch.femaleAction.headAction.happyB', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: t('touch.femaleAction.headAction.happyC', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: t('touch.femaleAction.headAction.happyD', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.headAction.angryA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.headAction.angryB', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: t('touch.femaleAction.armAction.happyA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: t('touch.femaleAction.armAction.relaxedA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: t('touch.femaleAction.armAction.happyB', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: t('touch.femaleAction.legAction.surprisedA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.legAction.angryA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.legAction.angryB', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.legAction.angryC', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.chestAction.angryA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.chestAction.angryB', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.chestAction.angryC', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: t('touch.femaleAction.chestAction.surprisedA', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: t('touch.femaleAction.bellyAction.surprisedA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.femaleAction.bellyAction.angryA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: t('touch.femaleAction.bellyAction.relaxedA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: t('touch.femaleAction.bellyAction.relaxedB', { ns: 'constants' }),
    },
  ],
};

export const DEFAULT_TOUCH_ACTION_CONFIG_MALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.headAction.neutralA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.headAction.neutralB', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.headAction.neutralC', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.armAction.neutralA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.armAction.neutralB', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.armAction.neutralC', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.legAction.neutralA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.legAction.neutralB', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: t('touch.maleAction.legAction.angryA', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.chestAction.neutralA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.BlinkLeft,
      text: t('touch.maleAction.chestAction.blinkLeftA', { ns: 'constants' }),
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.bellyAction.neutralA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: t('touch.maleAction.bellyAction.happyA', { ns: 'constants' }),
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: t('touch.maleAction.bellyAction.neutralB', { ns: 'constants' }),
    },
  ],
};
