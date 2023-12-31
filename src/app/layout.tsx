import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderServer from './components/HeaderServer'
import Favicon from '/public/favicon.ico'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HairTurn',
  description: 'HairTurnは、髪型を管理するためのアプリです。',
  icons: [{ rel: 'icon', url: Favicon.src }]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderServer />
        {children}
      </body>
    </html>
  )
}
