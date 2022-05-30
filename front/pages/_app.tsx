import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';
import wrapper from '@store/configureStore';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  );
}

export default wrapper.withRedux(MyApp);
