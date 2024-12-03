import { PropsWithChildren } from 'react';

import Analytics from '@/components/Analytics';
import NProgress from '@/components/NProgress';
import PWAInstall from '@/features/PWAInstall';
import Layout from '@/layout';

import StyleRegistry from './StyleRegistry';

const RootLayout = ({ children }: PropsWithChildren) => {
  // get default theme config to use with ssr

  return (
    <html lang="cn" suppressHydrationWarning>
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
