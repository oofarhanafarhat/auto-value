// app/layout.tsx

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import './globals.css';
import Navbar from '../components/Navbar';

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
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
