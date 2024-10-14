import { PropsWithChildren } from 'react';

import Analytics from '@/components/Analytics';
import NProgress from '@/components/NProgress';
import Layout from '@/layout';

import StyleRegistry from './StyleRegistry';

const RootLayout = ({ children }: PropsWithChildren) => {
  // get default theme config to use with ssr

  return (
    <html lang="cn" suppressHydrationWarning>
      <body>
        <StyleRegistry>
          <Layout>
            <NProgress />
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
