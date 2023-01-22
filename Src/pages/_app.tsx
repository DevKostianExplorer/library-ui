import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import { Provider, useSelector } from "react-redux";
import type { AppProps } from 'next/app'
import { setupStore } from '../store/store';
import { Navbar } from '../Components/NavBar/Navbar';
import { IRole } from '../store/models/IRole';
import Home from '.';
import { useEffect, useState } from 'react';


function App({ Component, pageProps}: AppProps) {

  const store = setupStore();
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  

  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null :       <Provider store={store}><Component {...pageProps} /></Provider>}
    </div>
    
  )
}

export default App;








