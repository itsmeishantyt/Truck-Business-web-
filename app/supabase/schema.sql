-- ============================================================
-- N&Z Logistics LLC Job Application Website — Supabase Schema
-- Run this in your Supabase project's SQL Editor
-- ============================================================

-- 1. Applications table (full schema with all fields)
CREATE TABLE IF NOT EXISTS applications (
  id                          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal Information
  first_name                  TEXT         NOT NULL,
  last_name                   TEXT         NOT NULL,
  ssn                         TEXT         NOT NULL,       -- ⚠️ Stored as plain text — encrypt at rest in production
  date_of_birth               TEXT         NOT NULL,       -- Format: MM/DD/YYYY
  other_name                  BOOLEAN      NOT NULL,

  -- Address
  street_address_1            TEXT         NOT NULL,
  country                     TEXT         NOT NULL DEFAULT 'United States',
  city                        TEXT         NOT NULL,
  state                       TEXT         NOT NULL,
  zip_code                    TEXT         NOT NULL,
  lived_at_address_3plus_years BOOLEAN     NOT NULL,

  -- Contact
  primary_phone               TEXT         NOT NULL,
  email                       TEXT         NOT NULL,

  -- General Information
  position                    TEXT         NOT NULL,
  is_owner_operator           BOOLEAN      NOT NULL,
  location                    TEXT         NOT NULL,
  eligible_us                 BOOLEAN      NOT NULL,
  currently_employed          BOOLEAN      NOT NULL,
  english_proficiency         BOOLEAN      NOT NULL,
  worked_before               BOOLEAN      NOT NULL,
  twic_card                   BOOLEAN      NOT NULL,
  how_did_you_hear            TEXT         NOT NULL,
  referral_name               TEXT,
  other_hear                  TEXT,
  fmcsa_registered            BOOLEAN      NOT NULL,
  military_service            BOOLEAN      NOT NULL,
  attended_school             BOOLEAN      NOT NULL,
  employed_last_10_years      BOOLEAN      NOT NULL,

  -- Driving Experience
  exp_straight_truck          TEXT         NOT NULL,
  exp_tractor_semi            TEXT         NOT NULL,
  exp_tractor_two_trailers    TEXT         NOT NULL,
  exp_other                   TEXT         NOT NULL,

  -- Dynamic Lists (Stored as JSON for simplicity)
  licenses                    JSONB        NOT NULL DEFAULT '[]'::jsonb,
  employment_history          JSONB        NOT NULL DEFAULT '[]'::jsonb,

  -- File
  resume_path                 TEXT,                        -- Supabase Storage path

  -- Status (managed by admin)
  status                      TEXT         NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),

  created_at                  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies — block ALL public access
-- The server uses the Service Role key which bypasses RLS entirely.

CREATE POLICY "No public select"
  ON applications FOR SELECT
  USING (false);

CREATE POLICY "No public insert"
  ON applications FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No public update"
  ON applications FOR UPDATE
  USING (false);

CREATE POLICY "No public delete"
  ON applications FOR DELETE
  USING (false);

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
