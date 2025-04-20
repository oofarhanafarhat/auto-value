import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Only these routes will require sign-in
const isProtectedRoute = createRouteMatcher([
  '/listing/(.*)',      // e.g., /listing/abc123
  '/purchase(.*)',      // e.g., /purchase/xyz456
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
    '/(api|trpc)(.*)',
  ],
}