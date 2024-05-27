import { FluentEmoji } from '@lobehub/ui';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import { TouchActionConfig, TouchAreaEnum } from '@/types/touch';

export const TOUCH_AREA_OPTIONS = [
  {
    label: '头部',
    value: TouchAreaEnum.Head,
    avatar: <FluentEmoji emoji="👩" type="flat" size={32} />,
  },
  {
    label: '手臂',
    value: TouchAreaEnum.Arm,
    avatar: <FluentEmoji emoji="💪" type="flat" size={32} />,
  },
  {
    label: '腿部',
    value: TouchAreaEnum.Leg,
    avatar: <FluentEmoji emoji="🦵" type="flat" size={32} />,
  },
  {
    label: '胸部',
    value: TouchAreaEnum.Chest,
    avatar: <FluentEmoji emoji="👙" type="flat" size={32} />,
  },
  {
    label: '腹部',
    value: TouchAreaEnum.Belly,
    avatar: <FluentEmoji emoji="🩹" type="flat" size={32} />,
  },
];

export const TOUCH_EMOTION_OPTIONS = [
  { label: '自然', value: VRMExpressionPresetName.Neutral },
  { label: '开心', value: VRMExpressionPresetName.Happy },
  { label: '生气', value: VRMExpressionPresetName.Angry },
  { label: '伤心', value: VRMExpressionPresetName.Sad },
  { label: '放松', value: VRMExpressionPresetName.Relaxed },
  { label: '惊讶', value: VRMExpressionPresetName.Surprised },
  { label: '眨眼', value: VRMExpressionPresetName.Blink },
  { label: '眨左眼', value: VRMExpressionPresetName.BlinkLeft },
  { label: '眨右眼', value: VRMExpressionPresetName.BlinkRight },
];

export const MAX_TOUCH_ACTION_TEXT_LENGTH = 100;

export const DEFAULT_TOUCH_ACTION_CONFIG: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      enabled: true,
      text: '哇!最喜欢摸摸头!',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      enabled: true,
      text: '感觉又充满了力量呢!',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      enabled: true,
      text: '哇塞，这个摸摸头的感觉好神奇!',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      enabled: true,
      text: '摸摸头让我开心一整天!',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '听说被摸头是会长不高的呢!',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '干嘛戳我呀？',
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      enabled: true,
      text: '啊，好喜欢呢~',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      enabled: true,
      text: '主人的手好温暖啊~',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      enabled: true,
      text: '哈哈，牵手让我感到快乐~',
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      enabled: true,
      text: '让我们保持纯洁的友谊不好吗？',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '喂，你是要作死吗?',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '主人的手又不听指挥了吗?',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '讨厌~会痒的啦~!',
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '不可以这样欺负我啦！快把手拿开！',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '幺幺零吗？这里有个变态一直在摸我！',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '再摸的话我可要报警了',
    },
    {
      emotion: VRMExpressionPresetName.Surprised,
      enabled: true,
      text: '干嘛戳我呀！还能不能愉快地聊天了!',
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      enabled: true,
      text: '是不小心碰到的吧...',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      enabled: true,
      text: '干嘛动我呀，小心我咬你哦！',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      enabled: true,
      text: '醒醒，我们之间没有结果的!',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      enabled: true,
      text: '讨厌！我可要生气啦！',
    },
  ],
  enabled: true,
};
