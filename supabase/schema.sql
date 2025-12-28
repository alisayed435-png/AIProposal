-- SmallBiz Growth Platform Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ACCOUNTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_account_id ON profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    business_type TEXT,
    message TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_account_id ON leads(account_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads(utm_campaign);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    service TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_account_id ON bookings(account_id);
CREATE INDEX IF NOT EXISTS idx_bookings_datetime ON bookings(datetime);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE UNIQUE,
    tier TEXT NOT NULL DEFAULT 'starter',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL DEFAULT 'inactive',
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_account_id ON subscriptions(account_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- ============================================
-- EVENTS TABLE (Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    event_name TEXT NOT NULL,
    path TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_events_account_id ON events(account_id);
CREATE INDEX IF NOT EXISTS idx_events_event_name ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_path ON events(path);

-- ============================================
-- ACCOUNT SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS account_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE UNIQUE,
    business_name TEXT,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#0ea5e9',
    secondary_color TEXT DEFAULT '#d946ef',
    selected_template TEXT DEFAULT 'plumber',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_account_settings_account_id ON account_settings(account_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to automatically create profile and account on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_account_id UUID;
BEGIN
    -- Create a new account
    INSERT INTO public.accounts (name)
    VALUES (COALESCE(NEW.raw_user_meta_data->>'full_name', 'My Business'))
    RETURNING id INTO new_account_id;

    -- Create a profile for the user
    INSERT INTO public.profiles (id, account_id, email, role, full_name)
    VALUES (
        NEW.id,
        new_account_id,
        NEW.email,
        'admin',
        NEW.raw_user_meta_data->>'full_name'
    );

    -- Create default subscription
    INSERT INTO public.subscriptions (account_id, tier, status)
    VALUES (new_account_id, 'starter', 'trialing');

    -- Create default settings
    INSERT INTO public.account_settings (account_id)
    VALUES (new_account_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for account_settings updated_at
DROP TRIGGER IF EXISTS update_account_settings_updated_at ON account_settings;
CREATE TRIGGER update_account_settings_updated_at
    BEFORE UPDATE ON account_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
