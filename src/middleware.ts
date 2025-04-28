import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Only protect these routes
const isProtectedRoute = createRouteMatcher([
  "/cart(.*)",
  "/api/cart(.*)",
  "/submit-listing(.*)",
  "/checkout(.*)",         // 👈 Add checkout page
  "/api/create-payment-intent(.*)",  // 👈 Add checkout API
])


export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
    '/(api|trpc)(.*)',
  ],
}
