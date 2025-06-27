// app/layout.tsx

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'auto value',
  description: 'With Clerk authentication',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
       <CartProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer/>
        </body>
      </html>
      </CartProvider>
    </ClerkProvider>
  );
}
