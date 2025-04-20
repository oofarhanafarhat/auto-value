import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    
        
    <footer className="bg-[#0C2340] text-white px-6 md:px-20 py-10">
      <div className="grid md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold mb-3">AutoValue</h3>
          <p>
            Empowering you with smart car valuations, listings, and seamless dealership access.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/valuation" className="hover:underline">Car Valuation</Link></li>
            <li><Link href="/listings" className="hover:underline">Listings</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-md font-semibold mb-2">Account</h4>
           <ul className="space-y-1">
            <li><Link href="/sign-in" className="hover:underline">Sign In</Link></li>
            <li><Link href="/sign-up" className="hover:underline">Register</Link></li>
            <li><Link href="/forgot-password" className="hover:underline">Forgot Password</Link></li>
          </ul>
          </div>

{/* Support */}
<div>
  <h4 className="text-md font-semibold mb-2">Support</h4>
  <ul className="space-y-1">
    <li><Link href="/support" className="hover:underline">Help Center</Link></li>
    <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
    <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
  </ul>
</div>
</div>

<div className="text-center text-xs mt-10 border-t pt-6 border-gray-600">
<p>&copy; {new Date().getFullYear()} AutoValue. All rights reserved.</p>
</div>
</footer>

)
}
export default Footer

    
  

