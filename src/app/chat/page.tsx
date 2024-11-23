'use client';

import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import DebugUI from '@/features/DebugUI';

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

  const searchParams = useSearchParams();
  const showDebug = process.env.NODE_ENV === 'development' && searchParams.get('debug') === 'true';
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      {mode === 'camera' && <CameraMode />}
      {mode === 'chat' && <ChatMode />}
      {showDebug && <DebugUI />}
    </Flexbox>
  );
};

export default memo(Chat);
