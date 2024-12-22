'use client';

import { ReactNode, memo } from 'react';

import AppLayout from '@/layout/AppLayout';

import Effect from './Effect';

export interface LayoutProps {
  children?: ReactNode;
}

const LayoutDesktop = (props: LayoutProps) => {
  const { children } = props;

  return (
    <AppLayout>
      {children}
      <Effect />
    </AppLayout>
  );
};

export default memo(LayoutDesktop);
