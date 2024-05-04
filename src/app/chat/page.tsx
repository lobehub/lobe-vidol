'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentViewer from '@/features/AgentViewer';
import Alert from '@/features/Alert';
import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';
import MessageInput from '@/features/ChatInput/MessageInput';
import ChatList from '@/features/ChatList';
import { useSessionStore } from '@/store/session';

import SideBar from './SideBar';
import { useStyles } from './style';

const Chat = () => {
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);
  const { styles } = useStyles();

  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox height={'100%'} width={'100%'}>
        <ChatHeader />
        <Flexbox flex={1} style={{ overflow: 'hidden', position: 'relative' }} align={'center'}>
          {viewerMode === true ? (
            <AgentViewer />
          ) : (
            <Flexbox className={styles.content} height={'100%'}>
              <ChatList />
            </Flexbox>
          )}
        </Flexbox>
        <Flexbox align={'center'} width={'100%'} className={styles.docker} justify={'center'}>
          <div className={styles.content}>
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
