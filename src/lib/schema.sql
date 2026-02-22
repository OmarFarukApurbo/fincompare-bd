-- schema.sql
-- Financial Database Schema for FinCompare BD

-- Credit Cards Table
CREATE TABLE public.credit_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    bank TEXT NOT NULL,
    annual_fee TEXT NOT NULL,
    hidden_charges TEXT DEFAULT 'None Found',
    best_feature TEXT NOT NULL,
    rating NUMERIC(2,1) NOT NULL DEFAULT 0.0,
    apply_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Articles Table
CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    tag TEXT NOT NULL,
    read_time TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Loans Table
CREATE TABLE public.loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    bank TEXT NOT NULL,
    interest_rate_min NUMERIC(4,2),
    interest_rate_max NUMERIC(4,2),
    max_amount TEXT,
    apply_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
