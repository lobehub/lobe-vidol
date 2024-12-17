import { ChatMessage } from '@/types/message';
import { SessionChatConfig } from '@/types/session';

const getSlicedMessagesWithConfig = (
  messages: ChatMessage[],
  config: SessionChatConfig,
  includeNewUserMessage?: boolean,
): ChatMessage[] => {
  // if historyCount is not enabled or set to 0, return all messages
  if (!config.enableHistoryCount || !config.historyCount) return messages;

  // if user send message, history will include this message so the total length should +1
  const messagesCount = !!includeNewUserMessage ? config.historyCount + 1 : config.historyCount;

  // if historyCount is negative, return empty array
  if (messagesCount <= 0) return [];

  // if historyCount is positive, return last N messages
  return messages.slice(-messagesCount);
};

export const chatHelpers = {
  getSlicedMessagesWithConfig,
};
