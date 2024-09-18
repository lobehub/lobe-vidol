import { Button } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';
import { Agent } from '@/types/agent';

interface ChatButtonProps {
  agent: Agent;
  onClick?: () => void;
}

const ChatButton = memo<ChatButtonProps>(({ agent, onClick }) => {
  const { t } = useTranslation('chat');
  const createSession = useSessionStore((s) => s.createSession);

  return (
    <Button
      key="chat"
      onClick={() => {
        createSession(agent);
        onClick?.();
      }}
      type={'primary'}
    >
      {t('chat')}
    </Button>
  );
});

export default ChatButton;
