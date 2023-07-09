import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  if (ctx.req && ctx.locale !== 'no') {
    ctx.res?.writeHead(302, { Location: '/no' });
    ctx.res?.end();
  }
  return { pageProps: {} };
};

export default appWithTranslation(MyApp);