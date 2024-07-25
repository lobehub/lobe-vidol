import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import { GenderEnum } from '@/types/agent';
import { MotionAnimation, TouchActionConfig, TouchAreaEnum } from '@/types/touch';

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

export const EMPTY_TOUCH_CONFIG: TouchActionConfig = {
  [TouchAreaEnum.Head]: [],
  [TouchAreaEnum.Arm]: [],
  [TouchAreaEnum.Leg]: [],
  [TouchAreaEnum.Chest]: [],
  [TouchAreaEnum.Belly]: [],
};

export const MAX_TOUCH_ACTION_TEXT_LENGTH = 100;

export const DEFAULT_MOTION_ANIMATION_FEMALE: MotionAnimation[] = [
  {
    id: 'c9c98b02-b96c-11e4-a802-0aaa78deedf9',
    name: 'Angry',
    url: 'https://r2.vidol.chat/motions/Angry.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/117940901/animated.gif',
  },
  {
    id: 'c9c98a38-b96c-11e4-a802-0aaa78deedf9',
    name: 'Happy',
    url: 'https://r2.vidol.chat/motions/Happy.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/117920901/animated.gif',
  },
  {
    id: 'c9c9941c-b96c-11e4-a802-0aaa78deedf9',
    name: 'Excited',
    url: 'https://r2.vidol.chat/motions/Excited.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/118000901/animated.gif',
  },
  {
    id: 'c9c66441-b96c-11e4-a802-0aaa78deedf9',
    name: 'Jazz Dancing',
    url: 'https://r2.vidol.chat/motions/Jazz Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101970902/animated.gif',
  },
  {
    id: 'c9c662bf-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960908/animated.gif',
  },
  {
    id: 'c9c66382-b96c-11e4-a802-0aaa78deedf9',
    name: 'Jazz Dancing',
    url: 'https://r2.vidol.chat/motions/Jazz Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101970901/animated.gif',
  },
  {
    id: 'c9c773ea-b96c-11e4-a802-0aaa78deedf9',
    name: 'Jazz Dancing',
    url: 'https://r2.vidol.chat/motions/Jazz Dancing (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/112100901/animated.gif',
  },
  {
    id: 'c9c65ff3-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960905/animated.gif',
  },
  {
    id: 'c9c65e61-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960903/animated.gif',
  },
  {
    id: 'c9c665b7-b96c-11e4-a802-0aaa78deedf9',
    name: 'Jazz Dancing',
    url: 'https://r2.vidol.chat/motions/Jazz Dancing (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101970904/animated.gif',
  },
  {
    id: 'c9c66120-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960906/animated.gif',
  },
  {
    id: 'c9c69bd5-b96c-11e4-a802-0aaa78deedf9',
    name: 'Rumba Dancing',
    url: 'https://r2.vidol.chat/motions/Rumba Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/102970901/animated.gif',
  },
  {
    id: 'c9c664fa-b96c-11e4-a802-0aaa78deedf9',
    name: 'Jazz Dancing',
    url: 'https://r2.vidol.chat/motions/Jazz Dancing (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101970903/animated.gif',
  },
  {
    id: 'c9c65f2a-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960904/animated.gif',
  },
  {
    id: 'c9c661f0-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960907/animated.gif',
  },
  {
    id: 'c9c65cae-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960901/animated.gif',
  },
  {
    id: 'c9c65d8a-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101960902/animated.gif',
  },
  {
    id: 'c9c6eb62-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing',
    url: 'https://r2.vidol.chat/motions/Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108970901/animated.gif',
  },
  {
    id: 'c9c70a8d-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109320901/animated.gif',
  },
  {
    id: 'c9c742cb-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109380901/animated.gif',
  },
  {
    id: 'c9c709c6-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109400901/animated.gif',
  },
  {
    id: 'c9c6dfed-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108640901/animated.gif',
  },
  {
    id: 'c9c6f09b-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109060901/animated.gif',
  },
  {
    id: 'c9c6e4c9-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (8).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108700901/animated.gif',
  },
  {
    id: 'c9c651ae-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing',
    url: 'https://r2.vidol.chat/motions/Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101810902/animated.gif',
  },
  {
    id: 'c9c6e9e3-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing',
    url: 'https://r2.vidol.chat/motions/Dancing (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108940901/animated.gif',
  },
  {
    id: 'c9c6f15b-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (9).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108780901/animated.gif',
  },
  {
    id: 'c9c6e0ad-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (10).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108650901/animated.gif',
  },
  {
    id: 'c9c6f217-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (11).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108780902/animated.gif',
  },
  {
    id: 'c9c6efdd-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing',
    url: 'https://r2.vidol.chat/motions/Dancing (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108980901/animated.gif',
  },
  {
    id: 'c9c6e81b-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108730901/animated.gif',
  },
  {
    id: 'c9c731b3-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109420901/animated.gif',
  },
  {
    id: 'c9c74096-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109290901/animated.gif',
  },
  {
    id: 'c9c6e3a5-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (12).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108690901/animated.gif',
  },
  {
    id: 'c9c650df-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing',
    url: 'https://r2.vidol.chat/motions/Dancing (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101810901/animated.gif',
  },
  {
    id: 'c9c6f519-b96c-11e4-a802-0aaa78deedf9',
    name: 'Samba Dancing',
    url: 'https://r2.vidol.chat/motions/Samba Dancing (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109280901/animated.gif',
  },
  {
    id: 'c9c6e910-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108740901/animated.gif',
  },
  {
    id: 'c9c6e172-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (13).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108660901/animated.gif',
  },
  {
    id: 'c9c6f6d0-b96c-11e4-a802-0aaa78deedf9',
    name: 'Swing Dancing',
    url: 'https://r2.vidol.chat/motions/Swing Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109610901/animated.gif',
  },
  {
    id: 'c9c767ad-b96c-11e4-a802-0aaa78deedf9',
    name: 'Swing Dancing',
    url: 'https://r2.vidol.chat/motions/Swing Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109600901/animated.gif',
  },
  {
    id: 'c9c76ac3-b96c-11e4-a802-0aaa78deedf9',
    name: 'Swing Dancing',
    url: 'https://r2.vidol.chat/motions/Swing Dancing (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109600902/animated.gif',
  },
  {
    id: 'c9c76dd3-b96c-11e4-a802-0aaa78deedf9',
    name: 'Swing Dancing',
    url: 'https://r2.vidol.chat/motions/Swing Dancing (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109620901/animated.gif',
  },
  {
    id: 'c9c6ee60-b96c-11e4-a802-0aaa78deedf9',
    name: 'Swing Dancing',
    url: 'https://r2.vidol.chat/motions/Swing Dancing (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109630901/animated.gif',
  },

  {
    id: 'c9cc3416-b96c-11e4-a802-0aaa78deedf9',
    name: 'Flair',
    url: 'https://r2.vidol.chat/motions/Flair.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121790901/animated.gif',
  },
  {
    id: 'c9c766de-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109460903/animated.gif',
  },
  {
    id: 'c9c76c4d-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109460905/animated.gif',
  },
  {
    id: 'c9cc3f4a-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Swipes',
    url: 'https://r2.vidol.chat/motions/Breakdance Swipes.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122050901/animated.gif',
  },
  {
    id: 'c9c65aac-b96c-11e4-a802-0aaa78deedf9',
    name: 'Silly Dancing',
    url: 'https://r2.vidol.chat/motions/Silly Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101920901/animated.gif',
  },
  {
    id: 'c9cc3970-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Freeze Var 4',
    url: 'https://r2.vidol.chat/motions/Breakdance Freeze Var 4.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121900901/animated.gif',
  },
  {
    id: 'c9cef323-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing Maraschino Step',
    url: 'https://r2.vidol.chat/motions/Dancing Maraschino Step.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/128660901/animated.gif',
  },
  {
    id: 'c9c73f13-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109490901/animated.gif',
  },
  {
    id: 'c9cc3656-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Footwork To Idle',
    url: 'https://r2.vidol.chat/motions/Breakdance Footwork To Idle.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121850901/animated.gif',
  },
  {
    id: 'c9cc3715-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Freeze Var 1',
    url: 'https://r2.vidol.chat/motions/Breakdance Freeze Var 1.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121870901/animated.gif',
  },
  {
    id: 'c9c73634-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing',
    url: 'https://r2.vidol.chat/motions/Dancing (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108820901/animated.gif',
  },
  {
    id: 'c9cc3593-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Footwork To Freeze',
    url: 'https://r2.vidol.chat/motions/Breakdance Footwork To Freeze.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121840901/animated.gif',
  },

  {
    id: 'c9c733fc-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109510901/animated.gif',
  },

  {
    id: 'c9cc21c2-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Freezes',
    url: 'https://r2.vidol.chat/motions/Breakdance Freezes.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121860901/animated.gif',
  },
  {
    id: 'c9cc4024-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Uprock',
    url: 'https://r2.vidol.chat/motions/Breakdance Uprock.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122060901/animated.gif',
  },
  {
    id: 'c9cc34d4-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Footwork 1',
    url: 'https://r2.vidol.chat/motions/Breakdance Footwork 1.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121800901/animated.gif',
  },
  {
    id: 'c9c88f17-b96c-11e4-a802-0aaa78deedf9',
    name: 'Bboy Pose To Idle',
    url: 'https://r2.vidol.chat/motions/Bboy Pose To Idle.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/116400904/animated.gif',
  },
  {
    id: 'c9cc203b-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Footwork 3',
    url: 'https://r2.vidol.chat/motions/Breakdance Footwork 3.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121820901/animated.gif',
  },
  {
    id: 'c9c73fd8-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109500901/animated.gif',
  },
  {
    id: 'c9c769f9-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109460904/animated.gif',
  },
  {
    id: 'c9c76614-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (8).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109460902/animated.gif',
  },
  {
    id: 'c9cc3298-b96c-11e4-a802-0aaa78deedf9',
    name: 'Flair',
    url: 'https://r2.vidol.chat/motions/Flair (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121770901/animated.gif',
  },
  {
    id: 'c9cc435b-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Uprock Var 1 End',
    url: 'https://r2.vidol.chat/motions/Breakdance Uprock Var 1 End.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122100901/animated.gif',
  },
  {
    id: 'c9c6e5b1-b96c-11e4-a802-0aaa78deedf9',
    name: 'House Dancing',
    url: 'https://r2.vidol.chat/motions/House Dancing.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108710901/animated.gif',
  },
  {
    id: 'c9cc40ee-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Uprock',
    url: 'https://r2.vidol.chat/motions/Breakdance Uprock (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122070901/animated.gif',
  },
  {
    id: 'c9c6e690-b96c-11e4-a802-0aaa78deedf9',
    name: 'House Dancing',
    url: 'https://r2.vidol.chat/motions/House Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108720901/animated.gif',
  },
  {
    id: 'c9c6ed9e-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (14).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108860901/animated.gif',
  },
  {
    id: 'c9c88a71-b96c-11e4-a802-0aaa78deedf9',
    name: 'Bboy Uprock',
    url: 'https://r2.vidol.chat/motions/Bboy Uprock.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/116410901/animated.gif',
  },
  {
    id: 'c9cc1f75-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Footwork 2',
    url: 'https://r2.vidol.chat/motions/Breakdance Footwork 2.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121810901/animated.gif',
  },
  {
    id: 'c9cc44e7-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Uprock Var 1 Start',
    url: 'https://r2.vidol.chat/motions/Breakdance Uprock Var 1 Start.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122120901/animated.gif',
  },
  {
    id: 'c9cef3e2-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing Running Man',
    url: 'https://r2.vidol.chat/motions/Dancing Running Man.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/128660902/animated.gif',
  },
  {
    id: 'c9c73579-b96c-11e4-a802-0aaa78deedf9',
    name: 'Salsa Dancing',
    url: 'https://r2.vidol.chat/motions/Salsa Dancing (9).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109540901/animated.gif',
  },
  {
    id: 'c9c65b7c-b96c-11e4-a802-0aaa78deedf9',
    name: 'Silly Dancing',
    url: 'https://r2.vidol.chat/motions/Silly Dancing (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/101920902/animated.gif',
  },
  {
    id: 'c9c6f609-b96c-11e4-a802-0aaa78deedf9',
    name: 'House Dancing',
    url: 'https://r2.vidol.chat/motions/House Dancing (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/109560901/animated.gif',
  },
  {
    id: 'c9cc3359-b96c-11e4-a802-0aaa78deedf9',
    name: 'Flair',
    url: 'https://r2.vidol.chat/motions/Flair (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121780901/animated.gif',
  },
  {
    id: 'c9c883bd-b96c-11e4-a802-0aaa78deedf9',
    name: 'Bboy Uprock Start',
    url: 'https://r2.vidol.chat/motions/Bboy Uprock Start.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/116410902/animated.gif',
  },
  {
    id: 'c9cc3e41-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Ready',
    url: 'https://r2.vidol.chat/motions/Breakdance Ready.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122020901/animated.gif',
  },
  {
    id: 'c9cc38a8-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Freeze Var 3',
    url: 'https://r2.vidol.chat/motions/Breakdance Freeze Var 3.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121890901/animated.gif',
  },
  {
    id: 'c9cc37d3-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Freeze Var 2',
    url: 'https://r2.vidol.chat/motions/Breakdance Freeze Var 2.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/121880901/animated.gif',
  },
  {
    id: 'c9cc45b3-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Uprock Var 2',
    url: 'https://r2.vidol.chat/motions/Breakdance Uprock Var 2.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122130901/animated.gif',
  },
  {
    id: 'c9cc4420-b96c-11e4-a802-0aaa78deedf9',
    name: 'Breakdance Uprock Var 1',
    url: 'https://r2.vidol.chat/motions/Breakdance Uprock Var 1.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/122110901/animated.gif',
  },
  {
    id: 'c9cef4a7-b96c-11e4-a802-0aaa78deedf9',
    name: 'Dancing Twerk',
    url: 'https://r2.vidol.chat/motions/Dancing Twerk.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/128660903/animated.gif',
  },
  {
    id: 'c9c6fa80-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (15).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108350901/animated.gif',
  },
  {
    id: 'c9c7438e-b96c-11e4-a802-0aaa78deedf9',
    name: 'Hip Hop Dancing',
    url: 'https://r2.vidol.chat/motions/Hip Hop Dancing (16).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/108840901/animated.gif',
  },
];

export const DEFAULT_MOTION_ANIMATION_MALE: MotionAnimation[] = [];
export const DEFAULT_MOTION_ANIMATION_OTHER: MotionAnimation[] = [];

export const ANIMATION_CONFIG = {
  [GenderEnum.FEMALE]: DEFAULT_MOTION_ANIMATION_FEMALE,
  [GenderEnum.MALE]: DEFAULT_MOTION_ANIMATION_MALE,
  [GenderEnum.OTHER]: DEFAULT_MOTION_ANIMATION_OTHER,
};

export const DEFAULT_POSTURE_ANIMATION_FEMALE: MotionAnimation[] = [
  {
    id: 'def6e4e1-a5b3-4ba5-b195-71f9dfaa8ab8',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700901/animated.gif',
  },
  {
    id: 'bf65f0a2-236a-475c-a56e-687d5b07998f',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700905/animated.gif',
  },
  {
    id: '26b4d230-9615-468e-a32a-8b77084ded60',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700911/animated.gif',
  },
  {
    id: '1cd09ee2-ba14-464d-9800-cbbbf16a6a2f',
    name: 'Female Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Female Locomotion Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140500904/animated.gif',
  },
  {
    id: 'd84ac7d2-650d-4655-bf20-0a6c1f918a17',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400908/animated.gif',
  },
  {
    id: '20d24be0-b948-477b-9a24-4b562d83687c',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400906/animated.gif',
  },
  {
    id: '31b59770-4380-4514-a47b-c702f8c9c593',
    name: 'Female Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Female Dynamic Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140300905/animated.gif',
  },
  {
    id: '51846e47-a6ea-494c-b394-d4d6d3b1c556',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600902/animated.gif',
  },
  {
    id: 'd4488660-8d67-4837-bded-1c774556d393',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700910/animated.gif',
  },
  {
    id: 'ba693e26-be81-4e70-a6a3-f41172dcb12f',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700908/animated.gif',
  },
  {
    id: '2278ba9c-6878-472c-b329-a340c0ec29c1',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700903/animated.gif',
  },
  {
    id: '4af0bbb1-13ef-4db3-987c-5ec2da564730',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700915/animated.gif',
  },
  {
    id: '5bd81cb6-88ab-424a-9f05-3c1d069df352',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400905/animated.gif',
  },
  {
    id: '31dca3e7-dba8-4536-a70e-34d7d5976fa9',
    name: 'Female Dance Pose',
    url: 'https://r2.vidol.chat/posture/Female Dance Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140200901/animated.gif',
  },
  {
    id: 'bef9832b-66c9-4a70-96cb-b56663a0e0c4',
    name: 'Female Action Pose',
    url: 'https://r2.vidol.chat/posture/Female Action Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140000907/animated.gif',
  },
  {
    id: '53efbb9e-5900-42ea-b40b-6e2a8198aee4',
    name: 'Female Action Pose',
    url: 'https://r2.vidol.chat/posture/Female Action Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140000903/animated.gif',
  },
  {
    id: 'abe202be-9b63-49e8-9617-9c6ab94136de',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600905/animated.gif',
  },
  {
    id: 'df9c4ee9-dd9a-44cb-bcba-446c375a4023',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600909/animated.gif',
  },
  {
    id: '42549f6f-15f4-41f1-856d-65705ff2d995',
    name: 'Female Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Female Crouch Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140100903/animated.gif',
  },
  {
    id: 'f937b8c1-9bed-4db5-b22f-9f222edde76a',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700904/animated.gif',
  },
  {
    id: '5a2b8fe8-de70-4820-8591-c3a5f77d5612',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (8).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700906/animated.gif',
  },
  {
    id: 'c96c0db9-4302-4412-98c6-9e945a02568a',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (9).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700902/animated.gif',
  },
  {
    id: '8a09b39c-7163-4efe-bb74-baa30451b7bc',
    name: 'Female Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Female Locomotion Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140500902/animated.gif',
  },
  {
    id: '401a9a92-26dc-4b13-962f-d8b509305909',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400904/animated.gif',
  },
  {
    id: 'd7386b89-a82f-4253-853d-4207b969e203',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400909/animated.gif',
  },
  {
    id: '533dc8c1-5910-47e2-913b-d075f756f9f7',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400901/animated.gif',
  },
  {
    id: '3cfc4484-fa37-47ea-af5a-c7833c782444',
    name: 'Female Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Female Dynamic Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140300903/animated.gif',
  },
  {
    id: '76269744-4ce3-4955-b398-a9c7860835e5',
    name: 'Female Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Female Dynamic Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140300902/animated.gif',
  },
  {
    id: '25c19dfb-999a-44dc-9140-b11a6c646226',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600907/animated.gif',
  },
  {
    id: 'e19de430-aebf-4500-a245-c6c35a5ba39e',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600908/animated.gif',
  },
  {
    id: 'd6f6495f-89d8-4743-9ca3-14c7500cb4ce',
    name: 'Female Dance Pose',
    url: 'https://r2.vidol.chat/posture/Female Dance Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140200906/animated.gif',
  },
  {
    id: 'be5e14b7-edd1-43cd-8bf8-31b4f8da7f70',
    name: 'Female Dance Pose',
    url: 'https://r2.vidol.chat/posture/Female Dance Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140200903/animated.gif',
  },
  {
    id: '9c6a2004-2e4e-4d6e-8cdb-aba2c1cf8624',
    name: 'Female Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Female Crouch Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140100904/animated.gif',
  },
  {
    id: '2f7089a1-b4a7-40c3-98f9-53d73cd4634e',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (10).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700907/animated.gif',
  },
  {
    id: '7bf2f079-7884-44dd-ad4f-2cd61f175803',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (11).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700914/animated.gif',
  },
  {
    id: '223e0cef-b9c0-4559-a115-6d8d7ca18c12',
    name: 'Female Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Female Crouch Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140100901/animated.gif',
  },
  {
    id: '040356e9-129b-454c-ae6b-3a27f83804f8',
    name: 'Female Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Female Locomotion Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140500901/animated.gif',
  },
  {
    id: '61c51e24-3e95-4adb-9df7-4c6efb389d78',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400903/animated.gif',
  },
  {
    id: '880e07f3-71e5-4a2b-99de-209355a0ea1d',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400902/animated.gif',
  },
  {
    id: '170e8e49-8c1e-430e-8110-bf9c44ce3cd3',
    name: 'Female Action Pose',
    url: 'https://r2.vidol.chat/posture/Female Action Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140000906/animated.gif',
  },
  {
    id: 'c831c4aa-d70f-403c-8fc3-e8df720c4cac',
    name: 'Female Dance Pose',
    url: 'https://r2.vidol.chat/posture/Female Dance Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140200905/animated.gif',
  },
  {
    id: 'da9f9f38-5e04-4a3e-b489-91d4cdd1a90f',
    name: 'Female Dance Pose',
    url: 'https://r2.vidol.chat/posture/Female Dance Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140200904/animated.gif',
  },
  {
    id: '27fe7228-487a-4951-af65-30cef1a9183d',
    name: 'Female Action Pose',
    url: 'https://r2.vidol.chat/posture/Female Action Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140000905/animated.gif',
  },
  {
    id: '72c8d4ff-33af-47a2-8751-4f56dc2d3f98',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600904/animated.gif',
  },
  {
    id: '6141db9f-01ac-4038-a0df-8f8f7f23311a',
    name: 'Female Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Female Crouch Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140100905/animated.gif',
  },
  {
    id: 'dc356979-2ddd-4ab4-a14f-e740db3102a4',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (12).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700912/animated.gif',
  },
  {
    id: 'ba625166-2370-4260-ae47-0c49e3616309',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (13).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700917/animated.gif',
  },
  {
    id: '9c41a5e0-4492-4dd9-ad73-9edf079bf509',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (14).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700918/animated.gif',
  },
  {
    id: 'a819c6b5-4aaa-4a17-8c94-a5f70db6d68f',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (15).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700913/animated.gif',
  },
  {
    id: '7c31ef17-f3f0-4a07-80e3-899100ec22c9',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (16).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700909/animated.gif',
  },
  {
    id: '0aef00f5-ea18-4e7c-a12d-6c92a08a9033',
    name: 'Female Standing Pose',
    url: 'https://r2.vidol.chat/posture/Female Standing Pose (17).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140700916/animated.gif',
  },
  {
    id: '8c95cac8-2068-410f-9564-d0a2a04ea0a5',
    name: 'Female Action Pose',
    url: 'https://r2.vidol.chat/posture/Female Action Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140000902/animated.gif',
  },
  {
    id: 'eaf51ff4-0fb7-4759-aadf-edb8fd3ae6a0',
    name: 'Female Action Pose',
    url: 'https://r2.vidol.chat/posture/Female Action Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140000904/animated.gif',
  },
  {
    id: '02854bce-1b74-4b36-bb3f-df58f4a0a345',
    name: 'Female Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Female Crouch Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140100906/animated.gif',
  },
  {
    id: '1ead39af-d8cd-489c-9f38-dd5e30819395',
    name: 'Female Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Female Locomotion Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140500903/animated.gif',
  },
  {
    id: '5b8c40fa-3e5e-4419-bb08-4e1bb49c4c6a',
    name: 'Female Laying Pose',
    url: 'https://r2.vidol.chat/posture/Female Laying Pose (8).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140400907/animated.gif',
  },
  {
    id: '42836840-1f8f-4600-864f-79d068571da9',
    name: 'Female Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Female Dynamic Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140300904/animated.gif',
  },
  {
    id: '5fb720bd-4195-4e3c-a826-32016fd936fa',
    name: 'Female Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Female Dynamic Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140300901/animated.gif',
  },
  {
    id: '8bdab85d-3a33-474e-a205-7b55baff2977',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600903/animated.gif',
  },
  {
    id: 'e84e677b-c981-4333-8242-3ff820f8cf7f',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600901/animated.gif',
  },
  {
    id: 'd6589536-da06-46f2-90b1-51157c550fc1',
    name: 'Female Action Pose',
    url: 'https://r2.vidol.chat/posture/Female Action Pose (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140000901/animated.gif',
  },
  {
    id: '9649e88e-b287-4025-a7d3-e890c67bacee',
    name: 'Female Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Female Sitting Pose (8).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140600906/animated.gif',
  },
  {
    id: 'e3543986-d43d-4ec1-bac8-5cf7f5ec003b',
    name: 'Female Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Female Crouch Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140100902/animated.gif',
  },
  {
    id: '02825b33-a9a3-418e-85e8-df665e2e52eb',
    name: 'Female Dance Pose',
    url: 'https://r2.vidol.chat/posture/Female Dance Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/140200902/animated.gif',
  },
];
export const DEFAULT_POSTURE_ANIMATION_MALE: MotionAnimation[] = [
  {
    id: '54026c13-c161-474e-a187-a4973b1f5bde',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000902/animated.gif',
  },
  {
    id: '0b2ee33c-87ea-4f85-9c9e-f517f883de7a',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700908/animated.gif',
  },
  {
    id: '1fe07cde-9aa2-478b-870e-397601e63507',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700912/animated.gif',
  },
  {
    id: 'c7d5ec2b-c398-4cbd-8440-352c51488ce6',
    name: 'Male Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Male Locomotion Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150500903/animated.gif',
  },
  {
    id: 'fbd14d0d-6ef3-48d4-933c-f4bdc4ff2e24',
    name: 'Male Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Male Locomotion Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150500902/animated.gif',
  },
  {
    id: 'cc3de474-7811-47ad-972c-152326c0b59a',
    name: 'Male Laying Pose',
    url: 'https://r2.vidol.chat/posture/Male Laying Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150400902/animated.gif',
  },
  {
    id: 'a1feb8c6-44d3-4510-a8e5-9a9a28960830',
    name: 'Male Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Male Dynamic Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150300902/animated.gif',
  },
  {
    id: 'fec5edc4-5789-4583-8ae7-605f01ffe227',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600906/animated.gif',
  },

  {
    id: 'b556be04-9f5c-4008-a419-c600e689a695',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600916/animated.gif',
  },
  {
    id: '3838bc60-16cc-4871-98c1-63a2aee41e27',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600908/animated.gif',
  },
  {
    id: '93695678-9ffe-4e41-b775-2f8ca5c7c15d',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700901/animated.gif',
  },
  {
    id: '64a05ff5-38ab-4b26-a925-808769f6b8bf',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700907/animated.gif',
  },
  {
    id: 'c6c4ddd1-3bfa-439d-aabb-bb80d03e4388',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700905/animated.gif',
  },
  {
    id: 'a02a47ae-3e9f-42d6-8826-bc55a5b89a6c',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000904/animated.gif',
  },
  {
    id: '1189d701-e683-4281-a13d-3a48fce4797f',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000903/animated.gif',
  },
  {
    id: '08b56eb4-f99a-4e1b-a3df-bb543f33dbbf',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700914/animated.gif',
  },
  {
    id: 'f501b173-92d7-40a2-b213-286e3c69173f',
    name: 'Male Laying Pose',
    url: 'https://r2.vidol.chat/posture/Male Laying Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150400901/animated.gif',
  },
  {
    id: '2f6d96c7-c5a3-4ba4-8ed3-bd9f6b4eb461',
    name: 'Male Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Male Crouch Pose.fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150100904/animated.gif',
  },
  {
    id: '64cb8917-9b8b-4ede-9972-04d728cd7085',
    name: 'Male Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Male Locomotion Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150500906/animated.gif',
  },
  {
    id: '4c9c15f3-ba77-4a08-9b49-513023030327',
    name: 'Male Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Male Dynamic Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150300901/animated.gif',
  },
  {
    id: '6630659d-ac80-4087-bc82-d393183fa7c5',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600912/animated.gif',
  },
  {
    id: '4a332831-d65a-45a3-a330-5463db336c3b',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600911/animated.gif',
  },
  {
    id: '7f89db68-fb6f-4771-9b58-9c0e56fd1c30',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600903/animated.gif',
  },
  {
    id: 'dac70582-43d1-435b-8aa6-70da1ba37b66',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600913/animated.gif',
  },
  {
    id: '9cf58708-0b86-40ae-bcfe-d211289530f7',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600901/animated.gif',
  },
  {
    id: '177cf7c1-c4b0-48fb-8ab9-b7e81e7a2331',
    name: 'Male Dance Pose',
    url: 'https://r2.vidol.chat/posture/Male Dance Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150200902/animated.gif',
  },
  {
    id: '4d1eb9fd-1c87-4782-8324-0c6cac3aa9fb',
    name: 'Male Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Male Crouch Pose (1).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150100903/animated.gif',
  },
  {
    id: '06f95726-a7d9-4df6-a41d-bd04809305f0',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (8).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600909/animated.gif',
  },
  {
    id: '98ce4e31-526b-41cd-bcd7-8bc4ece87bee',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (9).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600915/animated.gif',
  },
  {
    id: '8202fbeb-5755-4943-ba48-c7d8c8af9407',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000907/animated.gif',
  },
  {
    id: '829cc0ef-488c-422a-8b1b-2f836ed60811',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000908/animated.gif',
  },
  {
    id: 'f95846bf-6c0c-4429-81c5-d2d58d110a27',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000905/animated.gif',
  },
  {
    id: 'e6070070-bfbf-4fb2-87c9-ba85671346a1',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700903/animated.gif',
  },
  {
    id: '3bf002cc-5527-4c84-b55c-23db82a48d51',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700910/animated.gif',
  },
  {
    id: '4ce6d573-d378-4908-9552-42a8a05af500',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (8).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700913/animated.gif',
  },
  {
    id: '01da8857-474f-404d-aa34-2e09e697f02c',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (9).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700909/animated.gif',
  },
  {
    id: 'ddf86676-b6f0-4290-bbd7-bd6647f84fd4',
    name: 'Male Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Male Locomotion Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150500901/animated.gif',
  },
  {
    id: 'b414a4b5-236d-46e3-a2bd-efd45612ec42',
    name: 'Male Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Male Locomotion Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150500904/animated.gif',
  },
  {
    id: '757589a5-d1c8-45bc-a0a0-76cf6adba4e5',
    name: 'Male Laying Pose',
    url: 'https://r2.vidol.chat/posture/Male Laying Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150400906/animated.gif',
  },
  {
    id: '23d40ce5-0728-416c-9aee-7a97ea373b11',
    name: 'Male Dynamic Pose',
    url: 'https://r2.vidol.chat/posture/Male Dynamic Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150300903/animated.gif',
  },
  {
    id: '5b8e43ff-89ab-4a58-961c-67a5393b24b2',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (10).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600914/animated.gif',
  },
  {
    id: '14ee62b6-eb89-4753-9544-ea8921e18ed7',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (11).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600907/animated.gif',
  },
  {
    id: 'f2bdf1e8-4c6f-4ac7-b227-18caec2c79d3',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (12).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600902/animated.gif',
  },
  {
    id: '72153912-313f-49db-83f6-15f0d467666c',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (13).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600918/animated.gif',
  },
  {
    id: 'a9ee80a2-21bf-4878-b858-55d5613c1331',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (14).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600905/animated.gif',
  },
  {
    id: 'b81a8d54-0f09-4c56-8f4d-243bd3d9aa9c',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (15).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600917/animated.gif',
  },
  {
    id: '789c6577-08ca-416d-bbc3-4599d55b01b2',
    name: 'Male Dance Pose',
    url: 'https://r2.vidol.chat/posture/Male Dance Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150200901/animated.gif',
  },
  {
    id: 'd525734f-e335-4711-91c6-283811398fb4',
    name: 'Male Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Male Crouch Pose (2).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150100902/animated.gif',
  },
  {
    id: 'a55d8f43-5c5c-4b3c-8ad7-4e4b93e2491c',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose (6).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000901/animated.gif',
  },
  {
    id: 'e033b8e4-7c18-4491-884d-e16d4331bcf4',
    name: 'Male Action Pose',
    url: 'https://r2.vidol.chat/posture/Male Action Pose (7).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150000906/animated.gif',
  },
  {
    id: '08f3514a-0d3b-469d-9f27-57f97d9fcb9b',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (10).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700902/animated.gif',
  },
  {
    id: '670efeec-dabc-492d-a713-a8a28a959249',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (11).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700906/animated.gif',
  },
  {
    id: '5d0f41e7-12d2-4d5b-98fc-42efbdd05929',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (12).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700911/animated.gif',
  },
  {
    id: 'aaba4531-7c08-4d2c-a7a6-8eae3879611d',
    name: 'Male Standing Pose',
    url: 'https://r2.vidol.chat/posture/Male Standing Pose (13).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150700904/animated.gif',
  },
  {
    id: '03dffa68-d243-470f-b059-d10f8fcfeabb',
    name: 'Male Locomotion Pose',
    url: 'https://r2.vidol.chat/posture/Male Locomotion Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150500905/animated.gif',
  },
  {
    id: '304a666d-6d1c-4ddd-9944-8710879c309c',
    name: 'Male Laying Pose',
    url: 'https://r2.vidol.chat/posture/Male Laying Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150400905/animated.gif',
  },
  {
    id: '31027f3c-03cb-41c0-a7ca-c7cc149a6d53',
    name: 'Male Laying Pose',
    url: 'https://r2.vidol.chat/posture/Male Laying Pose (4).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150400904/animated.gif',
  },
  {
    id: '62e92e9c-623b-4754-9cb7-c234973eb982',
    name: 'Male Laying Pose',
    url: 'https://r2.vidol.chat/posture/Male Laying Pose (5).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150400903/animated.gif',
  },
  {
    id: 'ede8954e-5272-46c2-b3c5-c701e5ee887c',
    name: 'Male Crouch Pose',
    url: 'https://r2.vidol.chat/posture/Male Crouch Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150100901/animated.gif',
  },
  {
    id: 'bf38a13c-91b2-4a7f-9683-56dd57ff6c01',
    name: 'Male Dance Pose',
    url: 'https://r2.vidol.chat/posture/Male Dance Pose (3).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150200904/animated.gif',
  },
  {
    id: '4362690a-8af0-41ac-9a22-33e43a51a6ee',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (16).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600904/animated.gif',
  },
  {
    id: '7acd6eb0-c2ee-4fde-bf33-95f51372b3cb',
    name: 'Male Sitting Pose',
    url: 'https://r2.vidol.chat/posture/Male Sitting Pose (17).fbx',
    avatar: 'https://d99n9xvb9513w.cloudfront.net/thumbnails/motions/150600910/animated.gif',
  },
];

export const DEFAULT_POSTURE_ANIMATION_OTHER: MotionAnimation[] = [];

export const POSTURE_CONFIG = {
  [GenderEnum.FEMALE]: DEFAULT_POSTURE_ANIMATION_FEMALE,
  [GenderEnum.MALE]: DEFAULT_POSTURE_ANIMATION_MALE,
  [GenderEnum.OTHER]: DEFAULT_POSTURE_ANIMATION_OTHER,
};
