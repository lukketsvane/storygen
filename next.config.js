const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ['no', 'en', 'fr', 'es', 'ar', 'zh', 'uk', 'sw',],
    defaultLocale: 'no',
  },
  swcMinify: false,
  swcLoader: false,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
