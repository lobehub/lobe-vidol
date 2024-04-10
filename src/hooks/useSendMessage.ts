import { useSessionStore } from '@/store/session';
import { useCallback } from 'react';

const useSendMessage = () => {
  const [sendMessage, setMessageInput] = useSessionStore((s) => [s.sendMessage, s.setMessageInput]);
  return useCallback(() => {
    const store = useSessionStore.getState();
    sendMessage(store.messageInput);
    setMessageInput('');
  }, []);
};

export default useSendMessage;
