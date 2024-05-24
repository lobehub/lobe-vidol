'use client';

import { NeutralColors, PrimaryColors, ThemeProvider } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ReactNode, memo, useEffect } from 'react';

import { VIDOL_THEME_NEUTRAL_COLOR, VIDOL_THEME_PRIMARY_COLOR } from '@/constants/theme';
import { useGlobalStore } from '@/store/global';
import { useSettingStore } from '@/store/setting';
import { GlobalStyle } from '@/styles';
import { setCookie } from '@/utils/cookie';

export interface AppThemeProps {
  children?: ReactNode;
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
  const { children, defaultNeutralColor, defaultPrimaryColor } = props;
  const [primaryColor, neutralColor] = useSettingStore((s) => [
    s.config.primaryColor,
    s.config.neutralColor,
  ]);

  const themeMode = useGlobalStore((s) => s.themeMode);

  const { styles } = useStyles();

  useEffect(() => {
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
      themeMode={themeMode}
    >
      <GlobalStyle />
      <div className={styles.content}>{children}</div>
    </ThemeProvider>
  );
});

export default AppTheme;
