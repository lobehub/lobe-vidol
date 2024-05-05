'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentViewer from '@/features/AgentViewer';
import ChatInfo from '@/features/ChatInfo';

import SideBar from './SideBar';

const Chat = () => {
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox height={'100%'} width={'100%'}>
        <AgentViewer />
      </Flexbox>
      <ChatInfo />
    </Flexbox>
  );
};

export default memo(Chat);
