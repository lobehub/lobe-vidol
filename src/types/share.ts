export interface ShareGPTConversation {
  // 头像URL，可选，可能为null
  avatarUrl?: string | null;
  // 对话项数组
  items: Array<{
    // 消息发送者，可能是'human'或'gpt'
    from: 'human' | 'gpt';
    // 消息内容
    value: any;
  }>;
}
