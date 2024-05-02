'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentViewer from '@/features/AgentViewer';
import Alert from '@/features/Alert';
import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';
import MessageInput from '@/features/ChatInput/MessageInput';
import ChatList from '@/features/ChatList';
import SessionList from '@/features/SessionList';
import { useSessionStore } from '@/store/session';

import { useStyles } from './style';

const Chat = () => {
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);
  const { styles } = useStyles();

  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SessionList />
      <Flexbox height={'100%'} width={'100%'}>
        <ChatHeader />
        <Flexbox flex={1} style={{ overflow: 'hidden', position: 'relative' }}>
          {viewerMode === true ? <AgentViewer /> : <ChatList />}
        </Flexbox>
        <Flexbox align={'center'} width={'100%'} className={styles.docker} justify={'center'}>
          <div className={styles.input}>
            <MessageInput />
            <Alert className={styles.alert} />
          </div>
        </Flexbox>
      </Flexbox>
      <ChatInfo />
    </Flexbox>
  );
};

export default memo(Chat);
