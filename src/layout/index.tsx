'use client';

import { ThemeProvider } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import { ReactNode } from 'react';

import { VIDOL_THEME_APPEARANCE } from '@/constants/common';
import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import { GlobalStyle } from '@/styles';
import { setCookie } from '@/utils/cookie';

import StoreHydration from './StoreHydration';

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
}

const Layout = (props: LayoutProps) => {
  const { children, defaultAppearance } = props;
  const themeMode = useThemeStore((s) => s.themeMode);
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);

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
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
