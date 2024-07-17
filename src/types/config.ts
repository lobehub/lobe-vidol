import { Coordinates } from '@dnd-kit/utilities';
import { NeutralColors, PrimaryColors } from '@lobehub/ui';

import { GenderEnum } from '@/types/agent';
import { LocaleMode } from '@/types/locale';
import { MotionAnimation, TouchActionConfig } from '@/types/touch';

export type BackgroundEffect = 'glow' | 'none';

export interface Panel {
  /**
   * 坐标
   */
  coordinates: Coordinates;
  /**
   * 是否打开
   */
  open: boolean;
}

export interface PanelConfig {
  agent: Panel;
  dance: Panel;
  market: Panel;
  role: Panel;
}

export type PanelKey = keyof PanelConfig;

export interface OpenAIConfig {
  apikey?: string;
  endpoint?: string;
}

export interface LanguageModelConfig {
  openAI: OpenAIConfig;
}

export interface TouchConfig {
  [GenderEnum.FEMALE]: TouchActionConfig;
  [GenderEnum.MALE]: TouchActionConfig;
  [GenderEnum.OTHER]: TouchActionConfig;
}

export interface AnimationConfig {
  [GenderEnum.FEMALE]: MotionAnimation[];
  [GenderEnum.MALE]: MotionAnimation[];
  [GenderEnum.OTHER]: MotionAnimation[];
}

export interface Config extends CommonConfig {
  /**
   * 动画库
   */
  animation: AnimationConfig;
  /**
   * 语言模型配置
   */
  languageModel: LanguageModelConfig;
  /**
   * 全局触摸配置
   */
  touch: TouchConfig;
}

export interface CommonConfig {
  /**
   * 用户头像
   */
  avatar?: string;
  /**
   * 背景类型
   */
  backgroundEffect?: BackgroundEffect;
  /**
   * 语言地区
   */
  locale: LocaleMode;
  /**
   * 中性色
   */
  neutralColor?: NeutralColors;
  /**
   * 用户昵称
   */
  nickName?: string;
  /**
   * 主题色
   */
  primaryColor?: PrimaryColors;
}
