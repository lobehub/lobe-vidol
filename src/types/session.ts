import { ChatMessage } from './chat';

export type ChatMode = 'camera' | 'chat' | 'call';

export interface SessionChatConfig {
  /**
   * 是否启用历史消息数量限制
   */
  enableHistoryCount: boolean;
  /**
   * 历史消息数量限制
   */
  historyCount: number;
}

export interface SessionConfig {
  /**
   * 会话配置
   */
  chatConfig: SessionChatConfig;
}

export interface Session {
  /**
   * 会话对应的 Agent ID
   */
  agentId: string;
  /**
   * 会话配置
   */
  config: SessionConfig;
  /**
   * 会话消息列表
   */
  messages: ChatMessage[];
}
