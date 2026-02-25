/*
  # Create Talent Pool and Job Notifications Tables

  ## Overview
  Creates tables and storage for managing candidate talent pool submissions and job opening notifications.

  ## New Tables

  ### `talent_pool`
  Stores candidate submissions from the talent pool form
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `candidate_name` (text) - Full name of the candidate
  - `email` (text) - Email address
  - `phone` (text) - Phone number
  - `linkedin_url` (text, nullable) - LinkedIn profile URL
  - `resume_url` (text, nullable) - URL to uploaded resume in Supabase storage
  - `areas_of_interest` (text[]) - Array of role interests
  - `cover_message` (text) - Why they're interested in Nativis
  - `status` (text) - Submission status (pending, reviewed, contacted)
  - `submitted_at` (timestamptz) - Timestamp of submission
  - `reviewed_at` (timestamptz, nullable) - When HR reviewed the submission

  ### `job_notifications`
  Stores email subscriptions for job opening notifications
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - Subscriber email address
  - `subscribed_at` (timestamptz) - Timestamp of subscription
  - `is_active` (boolean) - Whether subscription is active
  - `notification_preferences` (jsonb) - JSON object for preferences

  ## Security
  - Enable RLS on both tables
  - Allow public inserts for new submissions (talent pool and notifications)
  - Restrict reads to authenticated users only (for HR/admin access)

  ## Indexes
  - Index on email fields for efficient lookups
  - Index on submitted_at for sorting and filtering
*/

-- Create talent_pool table
CREATE TABLE IF NOT EXISTS talent_pool (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  linkedin_url text,
  resume_url text,
  areas_of_interest text[] DEFAULT '{}',
  cover_message text NOT NULL,
  status text DEFAULT 'pending',
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

-- Create job_notifications table
CREATE TABLE IF NOT EXISTS job_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  notification_preferences jsonb DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE talent_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for talent_pool
CREATE POLICY "Anyone can submit to talent pool"
  ON talent_pool
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view talent pool"
  ON talent_pool
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update talent pool"
  ON talent_pool
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for job_notifications
CREATE POLICY "Anyone can subscribe to notifications"
  ON job_notifications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscriptions"
  ON job_notifications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update subscriptions"
  ON job_notifications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_talent_pool_email ON talent_pool(email);
CREATE INDEX IF NOT EXISTS idx_talent_pool_submitted_at ON talent_pool(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_talent_pool_status ON talent_pool(status);
CREATE INDEX IF NOT EXISTS idx_job_notifications_email ON job_notifications(email);
CREATE INDEX IF NOT EXISTS idx_job_notifications_active ON job_notifications(is_active) WHERE is_active = true;

-- Create storage bucket for resumes if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Allow public uploads (anon users)
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'resumes');

-- Storage policy: Allow authenticated users to read resumes
CREATE POLICY "Authenticated users can view resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes');
