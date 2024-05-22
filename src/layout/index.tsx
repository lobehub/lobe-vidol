import { PrimaryColors } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

import {
  VIDOL_THEME_APPEARANCE,
  VIDOL_THEME_NEUTRAL_COLOR,
  VIDOL_THEME_PRIMARY_COLOR,
} from '@/constants/theme';
import AppTheme from '@/layout/AppTheme';
import StoreHydration from '@/layout/StoreHydration';
import StyleRegistry from '@/layout/StyleRegistry';

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
  defaultPrimaryColor?: PrimaryColors;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const cookieStore = cookies();
  const appearance = cookieStore.get(VIDOL_THEME_APPEARANCE);
  const primaryColor = cookieStore.get(VIDOL_THEME_PRIMARY_COLOR);
  const neutralColor = cookieStore.get(VIDOL_THEME_NEUTRAL_COLOR);

  return (
    <StyleRegistry>
      <AppTheme
        defaultAppearance={appearance?.value}
        defaultNeutralColor={neutralColor?.value as any}
        defaultPrimaryColor={primaryColor?.value as any}
      >
        <StoreHydration />
        {children}
      </AppTheme>
    </StyleRegistry>
  );
};

export default Layout;
