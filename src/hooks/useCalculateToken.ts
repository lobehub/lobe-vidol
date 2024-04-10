import { sessionSelectors, useSessionStore } from '@/store/session';
import { getEncoding } from 'js-tiktoken';
import { useMemo } from 'react';

const enc = getEncoding('cl100k_base');

export const useCalculateToken = () => {
  const currentChatsString = useSessionStore((s) => sessionSelectors.currentChatsString(s));
  const currentSystemRole = useSessionStore((s) => sessionSelectors.currentSystemRole(s));
  const messageInput = useSessionStore((s) => s.messageInput);

  const chatLength = useMemo(() => enc.encode(currentChatsString).length, [currentChatsString]);
  const systemRoleLength = useMemo(() => enc.encode(currentSystemRole).length, [currentSystemRole]);
  const messageInputLength = useMemo(() => enc.encode(messageInput).length, [messageInput]);

  return chatLength + systemRoleLength + messageInputLength;
};
