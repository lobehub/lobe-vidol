'use client';

import { ReactNode, memo } from 'react';

export interface LayoutProps {
  children?: ReactNode;
}

const LayoutDesktop = (props: LayoutProps) => {
  const { children } = props;

  return children;
};

export default memo(LayoutDesktop);
