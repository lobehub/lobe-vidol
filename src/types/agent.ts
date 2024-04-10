import { TouchActionConfig } from './touch';
import { TTS } from './tts';

export interface AgentMeta {
  /**
   * 头像图片路径
   */
  avatar: string;
  /**
   * 封面图片路径
   */
  cover: string;
  /**
   * 角色描述
   */
  description: string;
  /**
   * 主页地址，一般为 Vroid Hub 的地址
   */
  homepage: string;
  /**
   * 模型文件路径
   */
  model: string;
  /**
   * 角色名
   */
  name: string;
  /**
   * 说明文件
   */
  readme: string;
}

export interface Agent {
  /**
   * 角色 ID，为本地文件目录
   */
  agentId: string;
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
  touch: TouchActionConfig;
  /**
   * 角色 tts 配置文件
   */
  tts: TTS;
}
