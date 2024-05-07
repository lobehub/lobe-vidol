'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import TopBanner from '@/components/TopBanner';
import RoleDisplay from '@/features/AgentViewer/RoleDisplay/index';
import RoleEdit from '@/panels/RolePanel/RoleEdit';

import SideBar from './SideBar';
import { useStyles } from './style';

const Role = () => {
  const { styles } = useStyles();
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox flex={1} horizontal>
        <Flexbox className={styles.edit}>
          <TopBanner title={'Adust Your Virtual Idol'} />
          <RoleEdit />
        </Flexbox>
        <Flexbox width={'30%'} className={styles.model}>
          <RoleDisplay />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Role);
