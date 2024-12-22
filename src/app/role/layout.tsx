'use client';

import { ReactNode, memo } from 'react';

import AppLayout from '@/layout/AppLayout';

export interface LayoutProps {
  children?: ReactNode;
}

const LayoutDesktop = (props: LayoutProps) => {
  const { children } = props;

  return <AppLayout>{children}</AppLayout>;
};

export default memo(LayoutDesktop);
