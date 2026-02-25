import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TalentPoolSubmission = {
  id?: string;
  candidate_name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  resume_url?: string;
  areas_of_interest: string[];
  cover_message: string;
  status?: string;
  submitted_at?: string;
  reviewed_at?: string;
};

export type JobNotificationSubscription = {
  id?: string;
  email: string;
  subscribed_at?: string;
  is_active?: boolean;
  notification_preferences?: Record<string, unknown>;
};
