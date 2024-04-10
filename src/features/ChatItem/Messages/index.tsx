import { ChatMessage } from '@/types/chat';
import React from 'react';
import { DefaultMessage } from './Default';

export type RenderMessage = React.FC<ChatMessage & { editableContent: React.ReactNode }>;

export const renderMessages: Record<string, RenderMessage> = {
  assistant: DefaultMessage,
  default: DefaultMessage,
  user: DefaultMessage,
};
