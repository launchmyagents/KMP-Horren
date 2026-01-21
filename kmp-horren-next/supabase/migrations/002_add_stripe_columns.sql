-- ============================================
-- MIGRATION: Add Stripe Payment Columns
-- ============================================
-- This migration adds the stripe_payment_id and paid_at columns to the orders table
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
-- ============================================

-- Add stripe_payment_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'stripe_payment_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN stripe_payment_id TEXT;
    RAISE NOTICE '✅ Column stripe_payment_id added to orders table';
  ELSE
    RAISE NOTICE 'ℹ️ Column stripe_payment_id already exists';
  END IF;
END $$;

-- Add paid_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'paid_at'
  ) THEN
    ALTER TABLE orders ADD COLUMN paid_at TIMESTAMPTZ;
    RAISE NOTICE '✅ Column paid_at added to orders table';
  ELSE
    RAISE NOTICE 'ℹ️ Column paid_at already exists';
  END IF;
END $$;

-- ============================================
-- VERIFY COLUMNS EXIST
-- ============================================
DO $$
DECLARE
  col_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO col_count
  FROM information_schema.columns 
  WHERE table_name = 'orders' 
    AND column_name IN ('stripe_payment_id', 'paid_at');
  
  IF col_count = 2 THEN
    RAISE NOTICE '✅ Migration completed successfully! Both columns exist.';
  ELSE
    RAISE NOTICE '⚠️ Warning: Expected 2 columns but found %', col_count;
  END IF;
END $$;
