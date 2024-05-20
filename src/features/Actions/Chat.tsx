'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';

export default () => {
  const router = useRouter();

  const currentAgent = useAgentStore((s) => agentSelectors.currentAgentItem(s));
  const createSession = useSessionStore((s) => s.createSession);

  return (
    <Button
      key="chat"
      onClick={() => {
        if (!currentAgent) return;
        createSession(currentAgent);
        router.push('/chat');
      }}
      type={'primary'}
    >
      聊天
    </Button>
  );
};
