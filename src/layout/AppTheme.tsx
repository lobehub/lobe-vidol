'use client';

import { NeutralColors, PrimaryColors, ThemeProvider } from '@lobehub/ui';
import { ThemeAppearance, createStyles } from 'antd-style';
import { ReactNode, memo, useEffect } from 'react';

import {
  VIDOL_THEME_APPEARANCE,
  VIDOL_THEME_NEUTRAL_COLOR,
  VIDOL_THEME_PRIMARY_COLOR,
} from '@/constants/theme';
import { useSettingStore } from '@/store/setting';
import { GlobalStyle } from '@/styles';
import { setCookie } from '@/utils/cookie';

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
  defaultPrimaryColor?: PrimaryColors;
}

export interface AppThemeProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
  defaultNeutralColor?: NeutralColors;
  defaultPrimaryColor?: PrimaryColors;
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

const AppTheme = memo((props: AppThemeProps) => {
  const { children, defaultAppearance, defaultNeutralColor, defaultPrimaryColor } = props;
  const [primaryColor, neutralColor, themeMode] = useSettingStore((s) => [
    s.config.primaryColor,
    s.config.neutralColor,
    s.config.themeMode,
  ]);

  const { styles } = useStyles();

  useEffect(() => {
    console.log('primaryColor', primaryColor);
    setCookie(VIDOL_THEME_PRIMARY_COLOR, primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    setCookie(VIDOL_THEME_NEUTRAL_COLOR, neutralColor);
  }, [neutralColor]);

  return (
    <ThemeProvider
      customTheme={{
        primaryColor: primaryColor ?? defaultPrimaryColor,
        neutralColor: neutralColor ?? defaultNeutralColor,
      }}
      defaultAppearance={defaultAppearance as ThemeAppearance}
      onAppearanceChange={(appearance) => {
        console.log('onAppearanceChange', appearance);
        setCookie(VIDOL_THEME_APPEARANCE, appearance);
      }}
      themeMode={themeMode}
    >
      <GlobalStyle />
      <div className={styles.content}>{children}</div>
    </ThemeProvider>
  );
});

export default AppTheme;
