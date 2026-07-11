-- Run this against your Neon database (SQL Editor in the Neon console,
-- or `psql $DATABASE_URL -f this_file.sql`) before deploying this build.
-- Adds the table that backs the Premium "Coming Soon" waiting list form.

CREATE TABLE IF NOT EXISTS premium_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  age integer NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
