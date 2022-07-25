import '../../styles/globals.scss'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.css'
import {useEffect} from 'react'

function MyApp({ Component, pageProps }: AppProps) {
/*   useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
},[]) */
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
