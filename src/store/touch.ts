import { TouchAction, TouchActionConfig, TouchAreaEnum } from '@/types/touch';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';

const DEFAULT_TOUCH_ACTION_CONFIG: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      emotion: 'happy',
      enabled: true,
      text: '哇!最喜欢摸摸头!',
    },
    {
      emotion: 'happy',
      enabled: true,
      text: '感觉又充满了力量呢!',
    },
    {
      emotion: 'happy',
      enabled: true,
      text: '哇塞，这个摸摸头的感觉好神奇!',
    },
    {
      emotion: 'happy',
      enabled: true,
      text: '摸摸头让我开心一整天!',
    },
    {
      emotion: 'sad',
      enabled: true,
      text: '听说被摸头是会长不高的呢!',
    },
    {
      emotion: 'angry',
      enabled: true,
      text: '干嘛戳我呀？',
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      emotion: 'happy',
      enabled: true,
      text: '啊，好喜欢呢~',
    },
    {
      emotion: 'relaxed',
      enabled: true,
      text: '主人的手好温暖啊~',
    },
    {
      emotion: 'happy',
      enabled: true,
      text: '哈哈，牵手让我感到快乐~',
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      emotion: 'surprised',
      enabled: true,
      text: '让我们保持纯洁的友谊不好吗？',
    },
    {
      emotion: 'angry',
      enabled: true,
      text: '喂，你是要作死吗?',
    },
    {
      emotion: 'angry',
      enabled: true,
      text: '主人的手又不听指挥了吗?',
    },
    {
      emotion: 'angry',
      enabled: true,
      text: '讨厌~会痒的啦~!',
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      emotion: 'angry',
      enabled: true,
      text: '不可以这样欺负我啦！快把手拿开！',
    },
    {
      emotion: 'angry',
      enabled: true,
      text: '幺幺零吗？这里有个变态一直在摸我！',
    },
    {
      emotion: 'angry',
      enabled: true,
      text: '再摸的话我可要报警了',
    },
    {
      emotion: 'surprised',
      enabled: true,
      text: '干嘛戳我呀！还能不能愉快地聊天了!',
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      emotion: 'surprised',
      enabled: true,
      text: '是不小心碰到的吧...',
    },
    {
      emotion: 'angry',
      enabled: true,
      text: '干嘛动我呀，小心我咬你哦！',
    },
    {
      emotion: 'relaxed',
      enabled: true,
      text: '醒醒，我们之间没有结果的!',
    },
    {
      emotion: 'relaxed',
      enabled: true,
      text: '讨厌！我可要生气啦！',
    },
  ],
  enabled: true,
};

interface TouchStore {
  actionConfig: TouchActionConfig;
  createTouchAction: (area: TouchAreaEnum, action: TouchAction) => void;
  currentTouchArea: TouchAreaEnum;
  setCurrentTouchArea: (area: TouchAreaEnum) => void;
}

const createTouchStore: StateCreator<TouchStore, [['zustand/devtools', never]]> = (set, get) => ({
  actionConfig: DEFAULT_TOUCH_ACTION_CONFIG,
  createTouchAction: (area, action) => {
    const { actionConfig } = get();
    const actions = actionConfig[area];
    actions.push(action);
    set({ actionConfig: { ...actionConfig, [area]: actions } });
  },
  currentTouchArea: TouchAreaEnum.Head,
  setCurrentTouchArea(area) {
    set({ currentTouchArea: area });
  },
});

export const useTouchStore = create<TouchStore>()(
  devtools(createTouchStore, {
    name: 'TOUCH_STORE',
  }),
);
