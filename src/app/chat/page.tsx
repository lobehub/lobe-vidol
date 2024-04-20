'use client';

import React, { memo } from 'react';

import ChatBot from '@/app/chat/ChatBot';
import VirtualIdol from '@/app/chat/VirtualIdol';
import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';
import SessionList from '@/features/SessionList';
import { useSessionStore } from '@/store/session';

import { useStyles } from './style';

const Chat = () => {
  const { styles } = useStyles();
  const viewerMode = useSessionStore((s) => s.viewerMode);

  return (
    <div className={styles.chat}>
      <SessionList />
      <div className={styles.content}>
        <ChatHeader />
        {viewerMode ? <VirtualIdol /> : <ChatBot />}
      </div>
      <ChatInfo />
    </div>
  );
};

export default memo(Chat);
