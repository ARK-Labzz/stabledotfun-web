// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/swap', '/profile', '/portfolio', '/create'];

// Define public routes that don't require authentication
const publicRoutes = ['/auth/login', '/auth/signup', '/auth/verify', '/', '/terms', '/privacy'];

// Define auth routes that should redirect if already authenticated
const authRoutes = ['/auth/login', '/auth/signup'];

async function checkSession(request: NextRequest): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session-info`, {
      method: 'GET',
      headers: {
        // Forward all cookies from the original request
        'Cookie': request.headers.get('cookie') || '',
      },
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Session verification failed:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated by verifying session with backend
  const isAuthenticated = await checkSession(request);
  
  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/auth/signup', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Handle auth routes (login, signup) - redirect if already authenticated
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Check if there's a return URL
      const from = request.nextUrl.searchParams.get('from');
      const redirectUrl = from && protectedRoutes.some(route => from.startsWith(route)) 
        ? from 
        : '/';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (manifest.json, robots.txt, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|ios|android|browserconfig.xml).*)',
  ],
};