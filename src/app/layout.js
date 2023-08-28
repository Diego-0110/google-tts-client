import { Roboto } from 'next/font/google'
import Navbar from '@/components/navigation/Navbar'

import '@/styles/globals.css'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Google TTS Client',
  description: 'Client API for Google Text-to-Speech Service'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}
