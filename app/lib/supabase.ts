import { createClient } from '@supabase/supabase-js';

// Public client — uses Anon key. Safe for browser-side usage.
// This client respects RLS policies.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
