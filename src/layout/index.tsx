import { PrimaryColors } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import dynamic from 'next/dynamic';
import { cookies, headers } from 'next/headers';
import { FC, ReactNode } from 'react';
import { resolveAcceptLanguage } from 'resolve-accept-language';

import { LOBE_LOCALE_COOKIE } from '@/constants/locale';
import { VIDOL_THEME_NEUTRAL_COLOR, VIDOL_THEME_PRIMARY_COLOR } from '@/constants/theme';
import AppTheme from '@/layout/AppTheme';
import StoreHydration from '@/layout/StoreHydration';
import StyleRegistry from '@/layout/StyleRegistry';
import { locales } from '@/locales/resources';
import { getAntdLocale } from '@/utils/locale';

import Locale from './Locale';

let DebugUI: FC = () => null;

if (process.env.NODE_ENV === 'development') {
  DebugUI = dynamic(() => import('@/features/DebugUI'), { ssr: false }) as FC;
}

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
  defaultPrimaryColor?: PrimaryColors;
}

const parserFallbackLang = () => {
  let fallbackLang: string = resolveAcceptLanguage(
    headers().get('accept-language') || '',
    locales,
    'en-US',
  );

  return fallbackLang;
};

const Layout = async (props: LayoutProps) => {
  const { children } = props;

  const cookieStore = cookies();
  const primaryColor = cookieStore.get(VIDOL_THEME_PRIMARY_COLOR);
  const neutralColor = cookieStore.get(VIDOL_THEME_NEUTRAL_COLOR);

  const defaultLang = cookieStore.get(LOBE_LOCALE_COOKIE);
  const fallbackLang = parserFallbackLang();

  const userLocale = defaultLang?.value || fallbackLang;

  const antdLocale = await getAntdLocale(userLocale);

  return (
    <StyleRegistry>
      <Locale antdLocale={antdLocale} defaultLang={userLocale}>
        <AppTheme
          defaultNeutralColor={neutralColor?.value as any}
          defaultPrimaryColor={primaryColor?.value as any}
        >
          <DebugUI />
          <StoreHydration />
          {children}
        </AppTheme>
      </Locale>
    </StyleRegistry>
  );
};

export default Layout;
