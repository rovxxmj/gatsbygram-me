import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';
import wrapper from '@store/configureStore';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../ErrorBoundary';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default wrapper.withRedux(MyApp);
