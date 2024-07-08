'use client';

import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import TopBanner from '@/components/TopBanner';
import RoleEdit from '@/panels/RolePanel/RoleEdit';

import SideBar from './SideBar';
import { useStyles } from './style';

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
