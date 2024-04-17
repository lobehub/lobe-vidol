'use client';

import { ReactNode } from 'react';
import { Flexbox } from 'react-layout-kit';

import SideBar from '@/app/market/SideBar';
import { MarketTabs } from '@/app/market/SideBar/type';

export interface LayoutProps {
  activeTab: MarketTabs;
  children?: ReactNode;
}

const LayoutDesktop = (props: LayoutProps) => {
  const { children, activeTab } = props;
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} style={{ position: 'relative' }} horizontal>
      <SideBar activeTab={activeTab} />
      <Flexbox align={'center'} flex={1} style={{ overflow: 'scroll' }}>
        {children}
      </Flexbox>
    </Flexbox>
  );
};

export default LayoutDesktop;
