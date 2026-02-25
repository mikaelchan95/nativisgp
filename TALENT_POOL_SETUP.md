# Talent Pool Implementation Guide

This document explains the talent pool system that has been implemented for the careers page when no positions are available.

## Overview

The careers page now dynamically displays either:
- **Job listings** when positions are available (positions array has items)
- **Talent pool form** when no positions are available (positions array is empty)

## Components Created

### 1. NoPositionsAvailable Component
**Location:** `src/components/NoPositionsAvailable.tsx`

Displays an elegant empty state with:
- Hero section with timeline information (Q2 2025)
- Three informational cards explaining the process
- Call-to-action buttons to join the talent pool
- Professional imagery and branding

### 2. TalentPoolForm Component
**Location:** `src/components/TalentPoolForm.tsx`

A comprehensive multi-step form featuring:
- **Step 1 - Details:** Collects candidate information
  - Full name, email, phone (required)
  - LinkedIn profile (optional)
  - Resume upload (optional)
  - Areas of interest (multi-select from 8 categories)
  - Cover message (minimum 50 characters)
  - Checkbox to subscribe to job notifications

- **Step 2 - Review:** Shows all submitted information for verification

- **Step 3 - Submitted:** Success confirmation message

**Validation:**
- Email format validation
- Required field checks
- Minimum character count for cover message
- Real-time error display

### 3. Supabase Client Configuration
**Location:** `src/utils/supabase.ts`

Provides:
- Configured Supabase client instance
- TypeScript types for database tables
- Environment variable validation

## Database Schema

### Tables Created

#### `talent_pool` Table
Stores candidate submissions:
- `id` (uuid, primary key)
- `candidate_name` (text)
- `email` (text)
- `phone` (text)
- `linkedin_url` (text, nullable)
- `resume_url` (text, nullable)
- `areas_of_interest` (text[])
- `cover_message` (text)
- `status` (text, default: 'pending')
- `submitted_at` (timestamptz)
- `reviewed_at` (timestamptz, nullable)

#### `job_notifications` Table
Stores email subscriptions:
- `id` (uuid, primary key)
- `email` (text, unique)
- `subscribed_at` (timestamptz)
- `is_active` (boolean, default: true)
- `notification_preferences` (jsonb)

### Storage Bucket

**Bucket:** `resumes`
- Stores uploaded resume files
- Access: Private (authenticated users only can read)
- Upload: Public (anon users can upload)

### Security (RLS Policies)

**talent_pool table:**
- Anyone can INSERT (submit to talent pool)
- Authenticated users can SELECT (view submissions)
- Authenticated users can UPDATE (change status, add review date)

**job_notifications table:**
- Anyone can INSERT (subscribe)
- Authenticated users can SELECT and UPDATE

## Edge Function

**Location:** `supabase/functions/notify-talent-submission/index.ts`

**Purpose:** Sends email notification to din@nativisgp.com when someone joins the talent pool

**Functionality:**
- Receives submission data from the frontend
- Formats a detailed email with candidate information
- Creates a mailto link for email client
- Includes all submission details and resume link

**CORS:** Properly configured for browser requests

## How to Use

### Displaying Empty State

To show the talent pool (no positions available), set the positions array to empty:

```typescript
const positions: Array<{...}> = [];
```

### Adding Job Positions

To show job listings, add positions to the array:

```typescript
const positions = [
  {
    title: "Brand Ambassador",
    department: "Marketing",
    location: "Singapore",
    type: "Full-time",
    description: "...",
    requirements: [...],
    responsibilities: [...]
  }
];
```

## Email Notifications

When a candidate submits to the talent pool:
1. Their data is saved to the `talent_pool` table in Supabase
2. Resume (if provided) is uploaded to the `resumes` storage bucket
3. Edge function is called to send notification email
4. Email is sent to: **din@nativisgp.com**

Email includes:
- Candidate name, email, phone
- LinkedIn profile (if provided)
- Selected areas of interest
- Cover message
- Link to resume (if uploaded)
- Timestamp of submission

## Database Migration

**Location:** `supabase/migrations/20251022000001_create_talent_pool_and_notifications_tables.sql`

To apply the migration to your Supabase database:
1. Log into Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the migration SQL
4. Execute the query

## Environment Variables Required

Ensure these are set in `.env`:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Testing

The build has been verified and all components compile successfully.

To test locally:
1. Run `npm run dev`
2. Navigate to `/careers`
3. You should see the talent pool empty state
4. Click "JOIN TALENT POOL" to test the form
5. Fill out and submit to verify database integration

## Future Enhancements

Consider adding:
- Admin dashboard to view talent pool submissions
- Email template service (e.g., SendGrid, Resend) for automated emails
- Filtering and search in admin view
- Automatic email reminders for positions matching candidate interests
- Analytics tracking for form submissions
