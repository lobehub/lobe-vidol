'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import RoleDisplay from '@/features/AgentViewer/RoleDisplay';
import RoleHeader from '@/features/RoleHeader';
import RoleEdit from '@/panels/RolePanel/RoleEdit';

import SideBar from './SideBar';
import { useStyles } from './style';

const Role = () => {
  const { styles } = useStyles();
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox flex={1} style={{ position: 'relative' }} height={'100%'} width={'100%'}>
        <RoleHeader />
        <Flexbox height={'100%'} horizontal>
          <RoleEdit className={styles.edit} />
          <Flexbox width={'30%'}>
            <RoleDisplay />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Role);
