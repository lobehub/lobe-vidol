import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import { TouchActionConfig, TouchAreaEnum } from '@/types/touch';

export const TOUCH_AREA_OPTIONS = [
  {
    label: '头部',
    value: TouchAreaEnum.Head,
  },
  {
    label: '手臂',
    value: TouchAreaEnum.Arm,
  },
  {
    label: '腿部',
    value: TouchAreaEnum.Leg,
  },
  {
    label: '胸部',
    value: TouchAreaEnum.Chest,
  },
  {
    label: '腹部',
    value: TouchAreaEnum.Belly,
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

export const DEFAULT_TOUCH_ACTION_CONFIG_FEMALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: '哇!最喜欢摸摸头!',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: '感觉又充满了力量呢!',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: '哇塞，这个摸摸头的感觉好神奇!',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: '摸摸头让我开心一整天!',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '听说被摸头是会长不高的呢!',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '干嘛戳我呀？',
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Happy,
      text: '啊，好喜欢呢~',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: '主人的手好温暖啊~',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: '哈哈，牵手让我感到快乐~',
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: '让我们保持纯洁的友谊不好吗？',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '喂，你是要作死吗?',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '主人的手又不听指挥了吗?',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '讨厌~会痒的啦~!',
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '不可以这样欺负我啦！快把手拿开！',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '幺幺零吗？这里有个变态一直在摸我！',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '再摸的话我可要报警了',
    },
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: '干嘛戳我呀！还能不能愉快地聊天了!',
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Surprised,
      text: '是不小心碰到的吧...',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '干嘛动我呀，小心我咬你哦！',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: '醒醒，我们之间没有结果的!',
    },
    {
      emotion: VRMExpressionPresetName.Relaxed,
      text: '讨厌！我可要生气啦！',
    },
  ],
};

export const DEFAULT_TOUCH_ACTION_CONFIG_MALE: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '当然了，只有你有资格摸我的头',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '我可不是什么普通人允许触碰的哦',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '别担心，摸过我的头后，你的运气会大幅提升的',
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '别问我今天吃没吃鸡，先看看我的肱二头肌',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '我的手臂可不是随便让人触碰的，你是个例外而已',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '你很勇敢，敢触碰到传说中的麒麟臂',
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '别害怕，我的大力金刚腿不踢傻瓜',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '让你碰到我的腿，是不是觉得你的生活完整了许多？',
    },
    {
      emotion: VRMExpressionPresetName.Angry,
      text: '别靠近我，你这个腿控',
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '这不过时我日常修炼成就的胸肌，没什么好惊讶的。',
    },
    {
      emotion: VRMExpressionPresetName.BlinkLeft,
      text: '来，哥的胸肌给你靠!',
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '我的腹肌只是再修炼深藏不露的内力',
    },
    {
      emotion: VRMExpressionPresetName.Happy,
      text: '别挠痒痒，小心我笑出腹肌',
    },
    {
      emotion: VRMExpressionPresetName.Neutral,
      text: '看到我这团腹肌了吗？它们只是藏得比较深罢了',
    },
  ],
};
