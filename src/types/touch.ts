import { VRMExpressionPresetName } from '@pixiv/three-vrm';

import { GenderEnum } from '@/types/agent';

import { TTS } from './tts';

/**
 * 表情类型
 */
export type ExpressionType = VRMExpressionPresetName;

/**
 * 触摸区域枚举
 */
export enum TouchAreaEnum {
  Arm = 'arm',
  Belly = 'belly',
  Chest = 'chest',
  Head = 'head',
  Leg = 'leg',
}

/**
 * 触摸动作接口
 */
export interface TouchAction {
  /**
   * 表情
   */
  expression: ExpressionType;
  /**
   * 动作（可选）
   */
  motion?: string;
  /**
   * 文本
   */
  text: string;
}

/**
 * 动作类别枚举
 */
export enum MotionCategoryEnum {
  DANCE = 'Dance',
  NORMAL = 'Normal',
}

/**
 * 姿势类别枚举
 */
export enum PostureCategoryEnum {
  ACTION = 'Action',
  CROUCH = 'Crouch',
  DANCE = 'Dance',
  LAYING = 'Laying',
  LOCOMOTION = 'Locomotion',
  SITTING = 'Sitting',
  STANDING = 'Standing',
}

/**
 * 动作动画接口
 */
export interface MotionAnimation {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 类别
   */
  category: MotionCategoryEnum | PostureCategoryEnum;
  /**
   * 描述
   */
  description: string;
  /**
   * 性别
   */
  gender: GenderEnum;
  /**
   * ID
   */
  id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 类型
   */
  type: string;
  /**
   * URL
   */
  url: string;
}

/**
 * 触摸动作配置接口
 */
export interface TouchActionConfig {
  enable?: boolean;
  [TouchAreaEnum.Head]: TouchAction[];
  [TouchAreaEnum.Arm]: TouchAction[];
  [TouchAreaEnum.Leg]: TouchAction[];
  [TouchAreaEnum.Chest]: TouchAction[];
  [TouchAreaEnum.Belly]: TouchAction[];
}

/**
 * 剧本类型
 */
export type Screenplay = {
  /**
   * 表情
   */
  expression: ExpressionType;
  /**
   * 动作（可选）
   */
  motion?: string;
  /**
   * 语音合成
   */
  tts: TTS;
};
