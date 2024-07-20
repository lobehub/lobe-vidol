import { ChatMessage } from './chat';
import { SessionTTS } from './tts';

export interface SessionConfig {
  /**
   * 聊天窗口样式
   */
  displayMode?: 'chat' | 'docs';
  /**
   * 开启历史记录条数
   */
  enableHistoryCount?: boolean;
  /**
   * 历史消息条数
   */
  historyCount?: number;
}

export interface Session {
  /**
   * 会话对应的 Agent ID
   */
  agentId: string;
  /**
   * 会话消息列表
   */
  messages: ChatMessage[];
  /**
   * 会话配置
   */
  sessionConfig: SessionConfig;
  /**
   * tts配置
   */
  tts: SessionTTS;
}
