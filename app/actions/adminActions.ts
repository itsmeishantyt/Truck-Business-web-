'use server';

import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { redirect } from 'next/navigation';

// Helper: guard — must be admin session
async function requireAdmin() {
    // Supabase auth is completely disabled.
    // Return a dummy user to let server actions proceed.
    return { id: 'dummy-admin', email: 'admin@truckco.com' };
}

// ─── Admin Login (Disabled — Supabase auth removed) ──────────────────────────
export async function adminLogin(
    email: string,
    password: string
): Promise<{ success: boolean; error?: string }> {
    return { success: false, error: 'Legacy login disabled. Use /admin directly.' };
}

// ─── Admin Logout (Disabled — Supabase auth removed) ─────────────────────────
export async function adminLogout() {
    redirect('/');
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
