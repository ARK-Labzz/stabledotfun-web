import { NextRequest, NextResponse } from 'next/server';

// Route configuration
const PROTECTED_ROUTES = ['/swap', '/profile', '/portfolio', '/create'];
const AUTH_ROUTES = ['/auth/login', '/auth/signup'];

// Base URL for API calls
const getApiBaseUrl = () => {
  // In production, use your actual domain
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://stabledotfun-backend-js.onrender.com';
  }
  // In development, try to use localhost first
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

// Lightweight session check
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const baseUrl = getApiBaseUrl();
    
    // Modern fetch with minimal headers
    const response = await fetch(`${baseUrl}/api/auth/session-info`, {
      method: 'GET',
      headers: {
        // Only forward the essential cookie header
        'Cookie': request.headers.get('cookie') || '',
        // Add cache control to prevent stale responses
        'Cache-Control': 'no-cache',
      },
      // Disable cache for fresh session check
      cache: 'no-store',
    });

    return response.ok;
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Auth check failed:', error);
    }
    return false;
  }
}

// Route matching helpers
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => pathname.startsWith(route));
}

function shouldSkipMiddleware(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||     // Next.js internals
    pathname.startsWith('/api') ||       // API routes
    pathname.includes('.') ||            // Static files
    pathname === '/favicon.ico'          // Favicon
  );
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip middleware for static assets and API routes
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next();
  }

  // Check authentication status
  const userIsAuthenticated = await isAuthenticated(request);

  // Handle protected routes
  if (isProtectedRoute(pathname)) {
    if (!userIsAuthenticated) {
      const signupUrl = new URL('/auth/signup', request.url);
      signupUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(signupUrl);
    }
  }

  // Handle auth routes (redirect if already authenticated)
  if (isAuthRoute(pathname)) {
    if (userIsAuthenticated) {
      const redirectTo = searchParams.get('from') || '/';
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  return NextResponse.next();
}

// Modern matcher configuration
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. Static files (e.g. /favicon.ico, /sitemap.xml, etc.)
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};