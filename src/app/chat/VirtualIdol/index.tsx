'use client';

import React from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentViewer from '@/features/AgentViewer';
import ChatDialog from '@/features/ChatDialog';
import MessageInput from '@/features/ChatInput/MessageInput';
import ImageViewer from '@/features/ImageViewer';
import { useSessionStore } from '@/store/session';

import { useStyles } from './style';

const VirtualIdol = () => {
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);
  const { styles } = useStyles();

  return (
    <Flexbox height={'100%'} width={'100%'}>
      <Flexbox flex={1} style={{ overflow: 'hidden', position: 'relative' }}>
        {viewerMode === true ? <AgentViewer /> : <ImageViewer />}
        <div
          className={styles.docker}
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        >
          <MessageInput />
          <div className={styles.alert}>请谨记：智能体所说的一切都是由 AI 生成的</div>
        </div>
      </Flexbox>
      <ChatDialog />
    </Flexbox>
  );
};

export default VirtualIdol;
