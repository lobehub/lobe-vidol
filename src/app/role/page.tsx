'use client';

import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import SideBar from './SideBar';
import ViewerWithUpload from './ViewerWithUpload';
import { useStyles } from './style';

const RoleEdit = dynamic(() => import('./RoleEdit'), {
  ssr: false,
  loading: () => (
    <Center style={{ height: '100%', width: '100%' }}>
      <Spin />
    </Center>
  ),
});

const Role = () => {
  const { styles } = useStyles();
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox className={styles.preview} horizontal>
        <Flexbox className={styles.container}>
          <RoleEdit />
        </Flexbox>
        <Flexbox className={styles.model}>
          <ViewerWithUpload />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Role);
