'use client';

import React from 'react';

import ChatBot from '@/panels/ChatPanel/ChatBot';
import SideBar from '@/panels/ChatPanel/SideBar';

import { useStyles } from './style';

const Chat = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.content}>
      <SideBar />
      <ChatBot />
    </div>
  );
};

export default Chat;
