'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatMode from '@/app/chat/ChatMode';
import ViewerMode from '@/app/chat/ViewerMode';
import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';
import { useSessionStore } from '@/store/session';

import SideBar from './SideBar';
import { useStyles } from './style';

const Chat = () => {
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);

  const { styles } = useStyles();

  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox flex={1} style={{ position: 'relative' }} height={'100%'} width={'100%'}>
        <ChatHeader className={styles.header} />
        {viewerMode ? <ViewerMode /> : <ChatMode />}
      </Flexbox>
      <ChatInfo />
    </Flexbox>
  );
};

export default memo(Chat);
