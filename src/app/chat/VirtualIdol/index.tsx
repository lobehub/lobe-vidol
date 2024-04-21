'use client';

import React from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentViewer from '@/features/AgentViewer';
import ImageViewer from '@/features/ImageViewer';
import { useSessionStore } from '@/store/session';

import Dialog from './Dialog';
import Docker from './Docker';

const VirtualIdol = () => {
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);

  return (
    <Flexbox height={'100%'} width={'100%'}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {viewerMode === true ? <AgentViewer /> : <ImageViewer />}
      </div>
      <Dialog />
      <Docker />
    </Flexbox>
  );
};

export default VirtualIdol;
