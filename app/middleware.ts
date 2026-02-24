import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Only protect /admin/* routes (not /admin/login or exact /admin)
    if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login') || pathname === '/admin') {
        return NextResponse.next();
    }

    // If Supabase isn't configured yet, redirect /admin to /admin/login gracefully
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Supabase is configured — check session
    const response = NextResponse.next();

    try {
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        });

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    } catch {
        // If anything goes wrong with auth check, redirect to login (safe default)
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
};
