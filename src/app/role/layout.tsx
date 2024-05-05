'use client';

import { ReactNode, memo } from 'react';

import Apps from '@/app/chat/Apps';
import AppLayout from '@/layout/AppLayout';
import { HeaderNavKey } from '@/layout/type';

export interface LayoutProps {
  children?: ReactNode;
}

const LayoutDesktop = (props: LayoutProps) => {
  const { children } = props;

  return (
    <AppLayout headerKey={HeaderNavKey.Role}>
      {children} <Apps />
    </AppLayout>
  );
};

export default memo(LayoutDesktop);
