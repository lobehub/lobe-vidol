import { ResolvingViewport } from 'next/dist/lib/metadata/types/metadata-interface';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';
import { isRtlLang } from 'rtl-detect';

import Analytics from '@/components/Analytics';
import NProgress from '@/components/NProgress';
import { DEFAULT_LANG, LOBE_LOCALE_COOKIE } from '@/constants/locale';
import PWAInstall from '@/features/PWAInstall';
import Layout from '@/layout';
import { isMobileDevice } from '@/utils/server/responsive';

import StyleRegistry from './StyleRegistry';

const RootLayout = async ({ children }: PropsWithChildren) => {
  // get default theme config to use with ssr
  const cookieStore = await cookies();

  const lang = cookieStore.get(LOBE_LOCALE_COOKIE);
  const locale = lang?.value || DEFAULT_LANG;

  const direction = isRtlLang(locale) ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js" defer />
      </head>
      <body>
        <StyleRegistry>
          <Layout>
            <NProgress />
            <PWAInstall />
            {children}
          </Layout>
        </StyleRegistry>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;

export { default as metadata } from './metadata';

export const generateViewport = async (): ResolvingViewport => {
  const isMobile = isMobileDevice();

  const dynamicScale = isMobile ? { maximumScale: 1, userScalable: false } : {};

  return {
    ...dynamicScale,
    initialScale: 1,
    minimumScale: 1,
    themeColor: [
      { color: '#f8f8f8', media: '(prefers-color-scheme: light)' },
      { color: '#000', media: '(prefers-color-scheme: dark)' },
    ],
    viewportFit: 'cover',
    width: 'device-width',
  };
};
