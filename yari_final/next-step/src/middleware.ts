import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECRET_KEY = '48a910934e938215b5ed5e0b17efcf0813a2859aaef3b31619f66512da5f919d';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const isLoginPage = request.nextUrl.pathname === '/login';

    const isAuthenticated = token === SECRET_KEY;

    let response: NextResponse;

    if (request.nextUrl.pathname.startsWith('/flag')) {
        if (!isAuthenticated) {
            response = NextResponse.redirect(new URL('/login', request.url));
        } else {
            response = NextResponse.next();
        }
    }
    else if (isLoginPage && isAuthenticated) {
        response = NextResponse.redirect(new URL('/flag', request.url));
    }
    else {
        response = NextResponse.next();
    }

    response.headers.set('X-Next-Version', '14.1.0');

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}; 