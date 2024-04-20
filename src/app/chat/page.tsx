'use client';

import React, { memo } from 'react';

import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';
import ChatInput from '@/features/ChatInput';
import ChatList from '@/features/ChatList';
import SessionList from '@/features/SessionList';

import { useStyles } from './style';

const ChatBot = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.chatBot}>
      <SessionList />
      <div className={styles.content}>
        <ChatHeader />
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ChatList />
        </div>
        <ChatInput />
      </div>
      <ChatInfo />
    </div>
  );
};

export default memo(ChatBot);
