'use client';

import { ReactNode } from 'react';

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default Layout;
