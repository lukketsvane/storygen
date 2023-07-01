const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n,
  swcMinify: false,
  swcLoader: false,
}

module.exports = nextConfig;