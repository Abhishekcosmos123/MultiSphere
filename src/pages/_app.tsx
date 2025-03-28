import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/store';
import '../styles/globals.css'
import AuthInitializer from '@/components/auth/AuthInitializer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  )
}
