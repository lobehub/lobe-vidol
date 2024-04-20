'use client';

import React, { memo } from 'react';

import ChatInput from '@/features/ChatInput';
import ChatList from '@/features/ChatList';

import { useStyles } from './style';

const Index = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.chatBot}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <ChatList />
      </div>
      <ChatInput />
    </div>
  );
};

export default memo(Index);
