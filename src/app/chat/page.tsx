'use client';

import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import ChatMode from './ChatMode';
import { useChatStore } from './store/chat';

const CameraMode = dynamic(() => import('./CameraMode'), {
  ssr: false,
  loading: () => (
    <Center style={{ height: '100%', width: '100%' }}>
      <Spin />
    </Center>
  ),
});

const Chat = () => {
  const mode = useChatStore((s) => s.mode);
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      {mode === 'camera' && <CameraMode />}
      {mode === 'chat' && <ChatMode />}
    </Flexbox>
  );
};

export default memo(Chat);
