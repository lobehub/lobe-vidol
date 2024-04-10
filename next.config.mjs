import nextPWA from 'next-pwa';
const isProd = process.env.NODE_ENV === 'production';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@lobehub/ui'],
};

export default isProd ? withPWA(nextConfig) : nextConfig;
