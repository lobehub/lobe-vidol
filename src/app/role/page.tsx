'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import RoleDisplay from '@/features/AgentViewer/RoleDisplay';
import RoleInfo from '@/features/RoleInfo';

import SideBar from './SideBar';

const Chat = () => {
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox height={'100%'} width={'100%'}>
        <RoleDisplay />
      </Flexbox>
      <RoleInfo />
    </Flexbox>
  );
};

export default memo(Chat);
