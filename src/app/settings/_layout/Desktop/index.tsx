'use client';

import { useResponsive } from 'antd-style';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import AppLayout from '@/layout/AppLayout';

import { useActiveSettingsKey } from '../../hooks/useActiveSettingsKey';
import { LayoutProps } from '../type';
import Header from './Header';
import SettingContainer from './SettingContainer';
import SideBar from './SideBar';

const Layout = memo<LayoutProps>(({ children, category }) => {
  const ref = useRef<any>(null);
  const { md = true } = useResponsive();
  const { t } = useTranslation('setting');
  const activeKey = useActiveSettingsKey();

  return (
    <AppLayout>
      <Flexbox
        height={'100%'}
        horizontal={md}
        ref={ref}
        style={{ position: 'relative' }}
        width={'100%'}
      >
        {md ? (
          <SideBar>{category}</SideBar>
        ) : (
          <Header getContainer={() => ref.current} title={<>{t(`tab.${activeKey}`)}</>}>
            {category}
          </Header>
        )}
        <SettingContainer>{children}</SettingContainer>
      </Flexbox>
    </AppLayout>
  );
});

Layout.displayName = 'DesktopSettingsLayout';

export default Layout;
