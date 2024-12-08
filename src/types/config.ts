import { NeutralColors, PrimaryColors } from '@lobehub/ui';

import { GenderEnum, SystemAgentConfig } from '@/types/agent';
import { LocaleMode } from '@/types/locale';
import { TouchActionConfig } from '@/types/touch';

import { UserKeyVaults } from './provider/keyVaults';
import { UserModelProviderConfig } from './provider/modelProvider';

export type BackgroundEffect = 'glow' | 'none';

export interface TTSConfig {
  /**
   * 是否客户端调用
   */
  clientCall: boolean;
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
   * 密钥配置
   */
  keyVaults: UserKeyVaults;
  /**
   * 语言模型配置
   */
  languageModel: UserModelProviderConfig;
  /**
   * 系统代理配置
   */
  systemAgent: SystemAgentConfig;
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
