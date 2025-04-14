// src/app/layout.tsx

import './globals.css'

import { Inter } from 'next/font/google'

import Navbar from './(site)/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutoValue',
  description: 'Find your cars true worth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        
        </body>
      </html>
  
  )
}