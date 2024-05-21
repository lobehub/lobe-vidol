'use client';

import { ThemeProvider } from '@lobehub/ui';
import { ThemeAppearance, createStyles } from 'antd-style';
import { ReactNode } from 'react';

import { VIDOL_THEME_APPEARANCE } from '@/constants/theme';
import StyleRegistry from '@/layout/StyleRegistry';
import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import { GlobalStyle } from '@/styles';
import { setCookie } from '@/utils/cookie';

import StoreHydration from './StoreHydration';

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
}

const useStyles = createStyles(({ css }) => ({
  content: css`
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
  `,
}));

const Layout = (props: LayoutProps) => {
  const { children, defaultAppearance } = props;
  const { styles } = useStyles();
  const themeMode = useThemeStore((s) => s.themeMode);
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);

  return (
    <StyleRegistry>
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
        <div className={styles.content}>{children}</div>
      </ThemeProvider>
    </StyleRegistry>
  );
};

export default Layout;
