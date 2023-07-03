module.exports = nextConfig;


Finally got it working!!

next-i18next.config.js = 'const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'no'],
  },
}
'

i18next.js = ''

next.config.js = ''

./utils/LanguageComponent.tsx = ''

./components/LanguageButton = ''