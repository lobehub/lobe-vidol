'use client';

import { ReactNode, memo } from 'react';

import Effect from './Effect';

export interface LayoutProps {
  children?: ReactNode;
}

const LayoutDesktop = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      {children}
      <Effect />
    </>
  );
};

export default memo(LayoutDesktop);
