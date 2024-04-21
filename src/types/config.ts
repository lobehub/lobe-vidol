import { Coordinates } from '@dnd-kit/utilities';
import { PrimaryColors } from '@lobehub/ui';

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
  role: Panel;
}

export type PanelKey = keyof PanelConfig;

export interface CommonConfig {
  /**
   * 背景类型
   */
  backgroundEffect: BackgroundEffect;
  /**
   * 主题色
   */
  primaryColor: PrimaryColors;
}

export interface OpenAIConfig {
  apikey?: string;
  endpoint?: string;
  model?: string;
}

export interface LanguageModelConfig {
  openAI: OpenAIConfig;
}

export interface Config extends CommonConfig {
  languageModel: LanguageModelConfig;
}
