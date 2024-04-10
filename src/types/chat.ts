import { ErrorTypeEnum } from '@/types/api';
import { LLMRoleType } from './llm';

/**
 * 聊天消息错误对象
 */
export interface ChatMessageError {
  body?: any;
  message: string;
  type: ErrorTypeEnum;
}

/**
 * 消息元数据,包括头像,背景色,描述,名称等
 */
export interface MetaData {
  /**
   * 角色头像
   */
  avatar?: string;
  /**
   *  背景色
   */
  backgroundColor?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 名称
   */
  title?: string;
}

/**
 * 消息体定义,与 LobeUI ChatList 组件一致
 */
export interface ChatMessage {
  /**
   * 消息内容
   */
  content: string;
  /**
   * 创建时间
   */
  createdAt: number;
  /**
   * 错误
   */
  error?: ChatMessageError;
  /**
   * 额外信息
   */
  extra?: any;
  /**
   * 消息id
   */
  id: string;
  /**
   * 元数据
   */
  meta: MetaData;
  /**
   * 角色
   */
  role: LLMRoleType;
  /**
   * 更新时间
   */
  updatedAt: number;
}
