import { PrimaryColors } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { FC, ReactNode } from 'react';

import { VIDOL_THEME_NEUTRAL_COLOR, VIDOL_THEME_PRIMARY_COLOR } from '@/constants/theme';
import AppTheme from '@/layout/AppTheme';
import StoreHydration from '@/layout/StoreHydration';
import StyleRegistry from '@/layout/StyleRegistry';

let DebugUI: FC = () => null;

if (process.env.NODE_ENV === 'development') {
  DebugUI = dynamic(() => import('@/features/DebugUI'), { ssr: false }) as FC;
}

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
  defaultPrimaryColor?: PrimaryColors;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const cookieStore = cookies();
  const primaryColor = cookieStore.get(VIDOL_THEME_PRIMARY_COLOR);
  const neutralColor = cookieStore.get(VIDOL_THEME_NEUTRAL_COLOR);

  return (
    <StyleRegistry>
      <AppTheme
        defaultNeutralColor={neutralColor?.value as any}
        defaultPrimaryColor={primaryColor?.value as any}
      >
        <DebugUI />
        <StoreHydration />
        {children}
      </AppTheme>
    </StyleRegistry>
  );
};

export default Layout;
