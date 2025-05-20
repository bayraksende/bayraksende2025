import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const response = NextResponse.json(
        { success: true },
        { status: 200 }
    );
    response.cookies.delete('auth_token');
    return response;
} 