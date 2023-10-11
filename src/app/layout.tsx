// import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderServer from './components/HeaderServer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'zubohair',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <HeaderServer />
        {children}
      </body>
    </html>
  )
}
