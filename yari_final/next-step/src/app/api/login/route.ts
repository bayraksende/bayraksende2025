import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECRET_KEY = '48a910934e938215b5ed5e0b17efcf0813a2859aaef3b31619f66512da5f919d';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (username === 'd0478b45466e436b' && password === 'da2de96cf8b2b41') {
            const response = NextResponse.json(
                { success: true },
                { status: 200 }
            );

            response.cookies.set('auth_token', SECRET_KEY, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: 'Geçersiz kimlik bilgileri' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Sunucu hatası' },
            { status: 500 }
        );
    }
} 