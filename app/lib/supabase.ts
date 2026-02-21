import { createClient } from '@supabase/supabase-js';

// Public Supabase client (respects RLS). Safe to import in server components.
// Returns null if env vars not configured — callers should handle this.
export function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}
