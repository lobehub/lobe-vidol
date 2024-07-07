'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import TopBanner from '@/components/TopBanner';
import RoleEdit from '@/panels/RolePanel/RoleEdit';

import SideBar from './SideBar';
import { useStyles } from './style';

const Role = () => {
  const { styles } = useStyles();
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox className={styles.preview}>
        <Flexbox className={styles.container}>
          <TopBanner title={'Role Preview and Setting'} style={{ height: 180 }} />
          <RoleEdit />
        </Flexbox>
      </Flexbox>
      {/*<RoleInfo />*/}
    </Flexbox>
  );
};

export default memo(Role);
