import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import ChatHeader from './ChatHeader';
import ChatInfo from './ChatInfo';
import SideBar from './SideBar';

const ViewerMode = dynamic(() => import('./ViewerMode'), {
  ssr: false,
  loading: () => (
    <Center style={{ height: '100%', width: '100%' }}>
      <Spin />
    </Center>
  ),
});

const Chat = () => {
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox flex={1} style={{ position: 'relative' }} height={'100%'} width={'100%'}>
        <ChatHeader
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 0,
          }}
        />
        <ViewerMode />
      </Flexbox>
      <ChatInfo />
    </Flexbox>
  );
};

export default memo(Chat);
