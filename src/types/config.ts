import { NeutralColors, PrimaryColors } from '@lobehub/ui';

import { GenderEnum } from '@/types/agent';
import { LocaleMode } from '@/types/locale';
import { TouchActionConfig } from '@/types/touch';

export type BackgroundEffect = 'glow' | 'none';

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
}

export interface Config extends CommonConfig {
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
