import { ChatMessage } from './chat';

export interface Session {
  /**
   * 会话对应的 Agent ID
   */
  agentId: string;
  /**
   * 会话消息列表
   */
  messages: ChatMessage[];
}
