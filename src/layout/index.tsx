'use client';

import { VIDOL_THEME_APPEARANCE } from '@/constants/common';
import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import { GlobalStyle } from '@/styles';
import { setCookie } from '@/utils/cookie';
import { ThemeProvider } from '@lobehub/ui';
import { ThemeAppearance, createStyles } from 'antd-style';
import { ReactNode } from 'react';
import StoreHydration from './StoreHydration';

const useStyles = createStyles(({ css }) => ({
  bg: css`
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
  `,
}));

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
}

const Layout = (props: LayoutProps) => {
  const { children, defaultAppearance } = props;
  const themeMode = useThemeStore((s) => s.themeMode);
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);
  const { styles } = useStyles();

  return (
    <ThemeProvider
      customTheme={{
        primaryColor: primaryColor,
      }}
      defaultAppearance={defaultAppearance as ThemeAppearance}
      onAppearanceChange={(appearance) => {
        setCookie(VIDOL_THEME_APPEARANCE, appearance);
      }}
      themeMode={themeMode}
    >
      <StoreHydration />
      <GlobalStyle />
      <main className={styles.bg}>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
