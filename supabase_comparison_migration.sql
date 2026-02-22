-- FinCompare BD Supabase Migration Script
-- Run this in your Supabase SQL Editor to add the comparison fields to the credit_cards table.
ALTER TABLE credit_cards
ADD COLUMN IF NOT EXISTS recommendation_score NUMERIC(5, 2),
    ADD COLUMN IF NOT EXISTS great_for JSONB,
    ADD COLUMN IF NOT EXISTS fee_details TEXT,
    ADD COLUMN IF NOT EXISTS bonus_offers TEXT,
    ADD COLUMN IF NOT EXISTS rewards_program TEXT,
    ADD COLUMN IF NOT EXISTS emi_facilities TEXT,
    ADD COLUMN IF NOT EXISTS advantages JSONB,
    ADD COLUMN IF NOT EXISTS disadvantages JSONB;