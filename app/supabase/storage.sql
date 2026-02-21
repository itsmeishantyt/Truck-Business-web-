-- ============================================================
-- TruckCo — Supabase Storage Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Create a PRIVATE storage bucket named 'resumes'
-- (Private = no public URLs; access requires signed URLs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage: block all public access to the resumes bucket
-- The server uses Service Role key which bypasses storage RLS.

CREATE POLICY "No public resume access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND false);

CREATE POLICY "No public resume upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes' AND false);

CREATE POLICY "No public resume delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'resumes' AND false);
