import { NeutralColors, PrimaryColors } from '@lobehub/ui';

import { GenderEnum } from '@/types/agent';
import { LocaleMode } from '@/types/locale';
import { TouchActionConfig } from '@/types/touch';

export type BackgroundEffect = 'glow' | 'none';

export interface OpenAIConfig {
  /**
   * OpenAI API 密钥
   */
  apikey?: string;
  /**
   * OpenAI API 端点
   */
  endpoint?: string;
  /**
   * 是否客户端调用
   */
  fetchOnClient?: boolean;
}

export interface TTSConfig {
  /**
   * 是否客户端调用
   */
  clientCall: boolean;
}

export interface LanguageModelConfig {
  /**
   * OpenAI 配置
   */
  openAI: OpenAIConfig;
}

export interface TouchConfig {
  /**
   * 女性触摸配置
   */
  [GenderEnum.FEMALE]: TouchActionConfig;
  /**
   * 男性触摸配置
   */
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
  /**
   * 语音设置
   */
  tts: TTSConfig;
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
