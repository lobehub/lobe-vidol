'use client';

import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import TopBanner from '@/components/TopBanner';

import SideBar from './SideBar';
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
  const { t } = useTranslation('role');
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />
      <Flexbox className={styles.preview}>
        <Flexbox className={styles.container}>
          <TopBanner title={t('topBannerTitle')} style={{ height: 180 }} />
          <RoleEdit />
        </Flexbox>
      </Flexbox>
      {/*<RoleInfo />*/}
    </Flexbox>
  );
};

export default memo(Role);
