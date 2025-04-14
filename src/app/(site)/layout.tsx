// src/app/(site)/layout.tsx

import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Navbar from "./components/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}