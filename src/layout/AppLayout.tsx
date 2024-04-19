'use client';

import { createStyles } from 'antd-style';
import { ReactNode, memo } from 'react';

import Apps from '@/layout/Apps';

import Header from './Header';
import { HeaderNavKey } from './type';

interface AppLayoutDesktopProps {
  children: ReactNode;
  headerKey?: HeaderNavKey;
}

const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 64px);
  `,
}));

const AppLayoutDesktop = memo<AppLayoutDesktopProps>(({ children, headerKey }) => {
  const { styles } = useStyles();
  return (
    <>
      <Header headerKey={headerKey} />
      <div className={styles.content}>{children}</div>
      <Apps />
    </>
  );
});

export default AppLayoutDesktop;
