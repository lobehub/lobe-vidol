'use client';

import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';

import SideBar from './SideBar';
import { useStyles } from './style';

const ViewerMode = dynamic(() => import('./ViewerMode'), { ssr: false });

const Chat = () => {
  const { styles } = useStyles();

  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox flex={1} style={{ position: 'relative' }} height={'100%'} width={'100%'}>
        <ChatHeader className={styles.header} />
        <ViewerMode />
      </Flexbox>
      <ChatInfo />
    </Flexbox>
  );
};

export default memo(Chat);
