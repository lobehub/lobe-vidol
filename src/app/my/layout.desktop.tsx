'use client';

import { ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import SideBar from '@/app/my/SideBar';
import { MyTabs } from '@/app/my/SideBar/type';
import AppLayout from '@/layout/AppLayout';
import { HeaderNavKey } from '@/layout/type';

export interface LayoutProps {
  activeTab: MyTabs;
  children?: ReactNode;
}

const LayoutDesktop = (props: LayoutProps) => {
  const { children, activeTab } = props;
  return (
    <AppLayout headerKey={HeaderNavKey.My}>
      <Flexbox flex={1} height={'100%'} width={'100%'} style={{ position: 'relative' }} horizontal>
        <SideBar activeTab={activeTab} />
        <Flexbox align={'center'} flex={1} style={{ overflow: 'scroll' }}>
          {children}
        </Flexbox>
      </Flexbox>
    </AppLayout>
  );
};

export default memo(LayoutDesktop);
