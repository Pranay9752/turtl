import { AccountContext, AccountProvider } from './account/context/AccountContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Turtl',
  description: 'Decentralized social media platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>
          <AccountProvider>
            <main>
              {children}
            </main>
          </AccountProvider>
        </main>
      </body>
    </html>
  )
}
