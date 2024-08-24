import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';
import { Agent } from '@/types/agent';

interface ChatButtonProps {
  agent: Agent;
}

const ChatButton = memo<ChatButtonProps>(({ agent }) => {
  const router = useRouter();
  const { t } = useTranslation('chat');
  const createSession = useSessionStore((s) => s.createSession);

  const [closePanel] = useGlobalStore((s) => [s.closePanel]);
  return (
    <Button
      key="chat"
      onClick={() => {
        createSession(agent);
        router.push('/chat');
        closePanel('market');
      }}
      type={'primary'}
    >
      {t('chat')}
    </Button>
  );
});

export default ChatButton;
