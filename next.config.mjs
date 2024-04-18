import nextPWA from '@ducanh2912/next-pwa';
import analyzer from '@next/bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  workboxOptions: {
    skipWaiting: true,
  },
});

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: isProd,
  pageExtensions: ['tsx', 'ts'],
  experimental: {
    optimizePackageImports: ['@lobehub/ui', '@lobehub/icons', 'chroma-js', 'shiki'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  redirects: async () => {
    return [
      {
        source: '/market',
        destination: '/market/agent',
        permanent: true,
      },
      {
        source: '/my',
        destination: '/my/agent',
        permanent: true,
      }
    ]
  },
  reactStrictMode: true,
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // to fix shikiji compile error
    // refs: https://github.com/antfu/shikiji/issues/23
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

export default isProd ? withBundleAnalyzer(withPWA(nextConfig)) : nextConfig;
