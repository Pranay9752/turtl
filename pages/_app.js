import Navbar from '@/components/Navbar'
import { AccountProvider } from '@/context/AccountContext'
import { PostProvider } from '@/context/PostContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AccountProvider>
      <PostProvider>
        <Navbar />
        <Component {...pageProps} />
      </PostProvider>
    </AccountProvider>
  )
}
