import { ChatStreamPayload } from './openai/chat';
import { TouchActionConfig } from './touch';
import { TTS } from './tts';

/**
 * Category Enum, 当前包括 Anime, Game, Realistic, VTuber, Book, History, Movie, Animal, Vroid
 */
export enum CategoryEnum {
  ANIMAL = 'Animal',
  ANIME = 'Anime',
  BOOK = 'Book',
  GAME = 'Game',
  HISTORY = 'History',
  MOVIE = 'Movie',
  REALISTIC = 'Realistic',
  VROID = 'Vroid',
  VTUBER = 'VTuber',
}
export enum GenderEnum {
  FEMALE = 'Female',
  MALE = 'Male',
  OTHER = 'Other',
}

export interface AgentMeta {
  /**
   * 头像图片路径
   */
  avatar: string;
  /**
   * 角色分类
   */
  category?: CategoryEnum;
  /**
   * 封面图片路径
   */
  cover?: string;
  /**
   * 角色描述
   */
  description: string;
  /**
   * 性别
   */
  gender: GenderEnum;
  /**
   * 模型文件路径
   */
  model?: string;
  /**
   * 角色名
   */
  name: string;
  /**
   * 说明文件
   */
  readme?: string;
}

export interface Agent {
  /**
   * 角色 ID
   */
  agentId: string;
  /**
   * 作者名
   */
  author?: string;
  /**
   * 角色对话模型配置
   */
  chatModel?: Partial<ChatStreamPayload>;
  /**
   * 创建时间
   */
  createAt?: string;
  /**
   * 问候语，角色在每次聊天开始时说的第一句话
   */
  greeting: string;
  /**
   * 作者主页
   */
  homepage?: string;
  /**
   * 角色元数据
   */
  meta: AgentMeta;
  /**
   * 角色设定
   */
  systemRole: string;
  /**
   * 触摸配置
   */
  touch?: TouchActionConfig;
  /**
   * 角色 tts 配置文件
   */
  tts?: TTS;
}
