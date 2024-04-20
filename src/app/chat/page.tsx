'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatBot from '@/app/chat/ChatBot';
import VirtualIdol from '@/app/chat/VirtualIdol';
import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';
import SessionList from '@/features/SessionList';
import { useSessionStore } from '@/store/session';

const Chat = () => {
  const viewerMode = useSessionStore((s) => s.viewerMode);

  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SessionList />
      <Flexbox flex={1} height={'100%'} width={'100%'}>
        <ChatHeader />
        {viewerMode ? <VirtualIdol /> : <ChatBot />}
      </Flexbox>
      <ChatInfo />
    </Flexbox>
  );
};

export default memo(Chat);
