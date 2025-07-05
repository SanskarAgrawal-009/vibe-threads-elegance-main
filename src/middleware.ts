import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow access during development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Get the pathname
  const path = request.nextUrl.pathname;

  // Specifically handle /admin path
  if (path.startsWith('/admin')) {
    // During development, you might want to use a simple authentication check
    // For production, you should implement proper authentication
    const isAuthenticated = request.cookies.get('admin-token');
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Update matcher to include root admin path
export const config = {
  matcher: ['/admin', '/admin/:path*']
};
