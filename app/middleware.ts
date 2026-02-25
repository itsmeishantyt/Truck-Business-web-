import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Supabase auth has been completely removed. Let all requests pass.
    return NextResponse.next();
}

export const config = {
    matcher: [],
};
