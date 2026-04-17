import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('accessToken')?.value;

    // A token is considered invalid if it's missing or set to 'none'
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

// Configuration for matcher to only run proxy on admin routes
export const config = {
    matcher: ['/admin/:path*'],
};
