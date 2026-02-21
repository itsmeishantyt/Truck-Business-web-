'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { redirect } from 'next/navigation';

// Helper: create a Supabase server client that reads session from cookies
async function createSessionClient() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );
}

// Helper: guard — must be admin session
async function requireAdmin() {
    const client = await createSessionClient();
    const {
        data: { user },
    } = await client.auth.getUser();
    if (!user) redirect('/admin/login');
    return user;
}

// ─── Admin Login ──────────────────────────────────────────────────────────────
export async function adminLogin(
    email: string,
    password: string
): Promise<{ success: boolean; error?: string }> {
    const client = await createSessionClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
}

// ─── Admin Logout ─────────────────────────────────────────────────────────────
export async function adminLogout() {
    const client = await createSessionClient();
    await client.auth.signOut();
    redirect('/admin/login');
}

// ─── Get All Applications ─────────────────────────────────────────────────────
export async function getApplications(status?: string) {
    await requireAdmin();
    const supabaseAdmin = getSupabaseAdmin();

    let query = supabaseAdmin
        .from('applications')
        .select('id, first_name, last_name, email, position, status, created_at')
        .order('created_at', { ascending: false });

    if (status && status !== 'all') {
        query = query.eq('status', status as string);
    }

    const { data, error } = await query;
    if (error) throw new Error('Failed to fetch applications');
    return data ?? [];
}

// ─── Get Single Application ───────────────────────────────────────────────────
export async function getApplicationById(id: string) {
    await requireAdmin();
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
        .from('applications')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error('Application not found');
    return data;
}

// ─── Update Application Status ────────────────────────────────────────────────
export async function updateApplicationStatus(
    id: string,
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected'
) {
    await requireAdmin();
    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
        .from('applications')
        .update({ status })
        .eq('id', id);

    if (error) throw new Error('Failed to update status');
    return { success: true };
}
