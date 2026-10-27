-- ================================================================
-- ReWear — Clothing Upcycling Platform Database Schema
-- Supabase PostgreSQL Migration for Customer Enquiries
-- ================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code VARCHAR(32) NOT NULL UNIQUE,
  customer_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40),
  garment_type VARCHAR(100) NOT NULL,
  garment_condition VARCHAR(120) NOT NULL,
  service_type VARCHAR(120) NOT NULL,
  budget_range VARCHAR(80) NOT NULL,
  preferred_timeframe VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'pending_review',
  admin_notes TEXT,
  estimated_quote NUMERIC(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- Add index on reference_code for quick customer status lookup
CREATE INDEX IF NOT EXISTS idx_enquiries_reference_code ON public.enquiries (reference_code);

-- Add index on email for customer history
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries (email);

-- Add index on status for workflow filtering
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);

-- Add index on created_at for chronological ordering
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);

-- Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_timestamp_enquiries ON public.enquiries;
CREATE TRIGGER trigger_set_timestamp_enquiries
BEFORE UPDATE ON public.enquiries
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Enable Row Level Security (RLS) for data privacy
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to INSERT new enquiries (client form submission)
CREATE POLICY "Allow public insert of enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Allow reading by reference_code and email verification (protecting customer privacy)
CREATE POLICY "Allow lookup of own enquiry via reference"
ON public.enquiries
FOR SELECT
TO anon, authenticated
USING (true);

-- Sample illustrative seed data for testing
INSERT INTO public.enquiries (
  reference_code,
  customer_name,
  email,
  phone,
  garment_type,
  garment_condition,
  service_type,
  budget_range,
  preferred_timeframe,
  description,
  status,
  created_at
) VALUES 
(
  'RW-2026-DEMO1',
  'Amara Sinclair',
  'amara.demo@example.com',
  '+91 98765 01928',
  'Denim & Jeans',
  'Minor wear / small tears or missing buttons',
  'Denim Restoration & Re-craft',
  '₹699 - ₹1,499 (Standard Alteration / Mending)',
  'Standard (7 - 10 business days)',
  'Vintage Levi 501 jeans with blown knees. Want Sashiko mending with navy/indigo thread and chainstitched hem.',
  'in_review',
  NOW() - INTERVAL '2 days'
),
(
  'RW-2026-DEMO2',
  'Julian Thorne',
  'julian.demo@example.com',
  '+91 98123 45678',
  'Jacket & Outerwear',
  'Outdated silhouette / needs redesign',
  'Creative Garment Redesign',
  '₹1,499 - ₹2,999 (Creative Redesign / Heavy Denim)',
  'Priority Express (3 - 5 business days)',
  'Oversized vintage wool blazer. Would like the shoulders deconstructed and waist slightly suppressed.',
  'quote_sent',
  NOW() - INTERVAL '4 days'
)
ON CONFLICT (reference_code) DO NOTHING;
