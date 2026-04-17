import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Attempt to get the access token from cookies
    const token = request.cookies.get('accessToken')?.value;

    // A token is considered valid if it's present and not explicitly set to empty/invalid values
    const isAuthenticated = !!(token && token !== 'none' && token !== '');

    // 1. PROTECT ADMIN ROUTES: If trying to access /admin pages without a valid token
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!isAuthenticated) {
            // Redirect to the login page while preserving the intended destination
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 2. PREVENT LOGIN PAGE ACCESS IF ALREADY AUTHENTICATED
    if (pathname === '/admin/login') {
        if (isAuthenticated) {
            const dashboardUrl = new URL('/admin/dashboard', request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next();
}

// Configuration for matcher to only run proxy on admin routes
export const config = {
    matcher: ['/admin/:path*'],
};
