// src/app/(site)/components/Navbar.tsx

"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <Link href="/" className="text-xl font-bold">AutoValue</Link>
      <div className="flex items-center gap-4">
        <Link href="/valuation">Valuation</Link>

        <SignedIn>
          <Link href="/listing">Listing</Link>
          <Link href="/purchase">Purchase</Link>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}