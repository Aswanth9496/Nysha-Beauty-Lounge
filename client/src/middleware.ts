import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // A token is considered invalid if it's missing or set to 'none' (from old logout logic)
    const isAuthenticated = token && token !== 'none' && token !== '';

    // 1. If trying to access protected routes without a valid token -> Redirect to login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!isAuthenticated) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 2. If trying to access login page while already authenticated -> Redirect to dashboard
    if (pathname === '/admin/login') {
        if (isAuthenticated) {
            const dashboardUrl = new URL('/admin/dashboard', request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next();
}

// Configuration for matcher to only run middleware on admin routes
export const config = {
    matcher: ['/admin/:path*'],
};
