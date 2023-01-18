import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import { Provider, useSelector } from "react-redux";
import type { AppProps } from 'next/app'
import { setupStore } from '../store/store';


function MyApp({ Component, pageProps}: AppProps) {

  
  const store = setupStore();

  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;





