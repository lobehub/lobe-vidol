import { PrimaryColors } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import { cookies, headers } from 'next/headers';
import { ReactNode } from 'react';
import { resolveAcceptLanguage } from 'resolve-accept-language';

import { LOBE_LOCALE_COOKIE } from '@/constants/locale';
import {
  VIDOL_THEME_APPEARANCE,
  VIDOL_THEME_NEUTRAL_COLOR,
  VIDOL_THEME_PRIMARY_COLOR,
} from '@/constants/theme';
import AppTheme from '@/layout/AppTheme';
import StoreHydration from '@/layout/StoreHydration';
import StyleRegistry from '@/layout/StyleRegistry';
import { locales } from '@/locales/resources';
import { getAntdLocale } from '@/utils/locale';

import Locale from './Locale';

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
  const appearance = cookieStore.get(VIDOL_THEME_APPEARANCE);

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
          defaultAppearance={appearance?.value}
          defaultNeutralColor={neutralColor?.value as any}
          defaultPrimaryColor={primaryColor?.value as any}
        >
          <StoreHydration />
          {children}
        </AppTheme>
      </Locale>
    </StyleRegistry>
  );
};

export default Layout;
