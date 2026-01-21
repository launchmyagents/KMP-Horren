-- ============================================
-- MIGRATION: Mollie to Stripe
-- ============================================
-- This migration renames the mollie_payment_id column to stripe_payment_id
-- Run this in your Supabase SQL Editor if you have existing data
-- ============================================

-- Rename the column if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'mollie_payment_id'
  ) THEN
    ALTER TABLE orders RENAME COLUMN mollie_payment_id TO stripe_payment_id;
    RAISE NOTICE 'Column mollie_payment_id renamed to stripe_payment_id';
  ELSE
    -- If the column doesn't exist yet, check if stripe_payment_id exists
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'orders' AND column_name = 'stripe_payment_id'
    ) THEN
      -- Add stripe_payment_id column if neither exists
      ALTER TABLE orders ADD COLUMN stripe_payment_id TEXT;
      RAISE NOTICE 'Column stripe_payment_id added';
    ELSE
      RAISE NOTICE 'Column stripe_payment_id already exists, no changes needed';
    END IF;
  END IF;
END $$;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Migration completed: Mollie to Stripe';
END $$;
