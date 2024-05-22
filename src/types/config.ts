import { Coordinates } from '@dnd-kit/utilities';
import { PrimaryColors } from '@lobehub/ui';
import type { ThemeMode } from 'antd-style';

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
  model?: string;
}

export interface LanguageModelConfig {
  openAI: OpenAIConfig;
}

export interface UserConfig {
  /**
   * 用户头像
   */
  avatar?: string;
  /**
   * 背景类型
   */
  backgroundEffect: BackgroundEffect;

  /**
   * 语言模型配置
   */
  languageModel: LanguageModelConfig;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 主题色
   */
  primaryColor?: PrimaryColors;
  /**
   * 主题模式
   */
  themeMode: ThemeMode;
}
