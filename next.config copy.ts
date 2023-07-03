import { NextConfig } from 'next/dist/next-server/server/config';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'no', 'fr', 'es', 'ar'],
    defaultLocale: 'en',
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: false,
};

export default nextConfig;
