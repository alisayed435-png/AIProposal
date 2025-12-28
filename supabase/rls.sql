-- SmallBiz Growth Platform - Row Level Security Policies
-- Run this AFTER schema.sql

-- ============================================
-- Enable RLS on all tables
-- ============================================
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTION: Get user's account_id
-- ============================================
CREATE OR REPLACE FUNCTION auth.get_user_account_id()
RETURNS UUID AS $$
    SELECT account_id FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================
-- ACCOUNTS POLICIES
-- ============================================

-- Users can view their own account
CREATE POLICY "Users can view own account" ON accounts
    FOR SELECT
    USING (id = auth.get_user_account_id());

-- Users can update their own account
CREATE POLICY "Users can update own account" ON accounts
    FOR UPDATE
    USING (id = auth.get_user_account_id());

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can view profiles in their account
CREATE POLICY "Users can view profiles in own account" ON profiles
    FOR SELECT
    USING (account_id = auth.get_user_account_id());

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE
    USING (id = auth.uid());

-- ============================================
-- LEADS POLICIES
-- ============================================

-- Users can view leads in their account
CREATE POLICY "Users can view leads in own account" ON leads
    FOR SELECT
    USING (account_id = auth.get_user_account_id());

-- Users can create leads in their account
CREATE POLICY "Users can create leads in own account" ON leads
    FOR INSERT
    WITH CHECK (account_id = auth.get_user_account_id());

-- Public can submit leads (for landing pages)
CREATE POLICY "Public can submit leads" ON leads
    FOR INSERT
    WITH CHECK (true);

-- Users can update leads in their account
CREATE POLICY "Users can update leads in own account" ON leads
    FOR UPDATE
    USING (account_id = auth.get_user_account_id());

-- Users can delete leads in their account
CREATE POLICY "Users can delete leads in own account" ON leads
    FOR DELETE
    USING (account_id = auth.get_user_account_id());

-- ============================================
-- BOOKINGS POLICIES
-- ============================================

-- Users can view bookings in their account
CREATE POLICY "Users can view bookings in own account" ON bookings
    FOR SELECT
    USING (account_id = auth.get_user_account_id());

-- Users can create bookings in their account
CREATE POLICY "Users can create bookings in own account" ON bookings
    FOR INSERT
    WITH CHECK (account_id = auth.get_user_account_id());

-- Users can update bookings in their account
CREATE POLICY "Users can update bookings in own account" ON bookings
    FOR UPDATE
    USING (account_id = auth.get_user_account_id());

-- Users can delete bookings in their account
CREATE POLICY "Users can delete bookings in own account" ON bookings
    FOR DELETE
    USING (account_id = auth.get_user_account_id());

-- ============================================
-- SUBSCRIPTIONS POLICIES
-- ============================================

-- Users can view their account's subscription
CREATE POLICY "Users can view own subscription" ON subscriptions
    FOR SELECT
    USING (account_id = auth.get_user_account_id());

-- Only service role can modify subscriptions (via webhooks)
-- No INSERT/UPDATE/DELETE policies for regular users

-- ============================================
-- EVENTS POLICIES
-- ============================================

-- Users can view events in their account
CREATE POLICY "Users can view events in own account" ON events
    FOR SELECT
    USING (account_id = auth.get_user_account_id() OR account_id IS NULL);

-- Anyone can insert events (for analytics)
CREATE POLICY "Anyone can insert events" ON events
    FOR INSERT
    WITH CHECK (true);

-- ============================================
-- ACCOUNT SETTINGS POLICIES
-- ============================================

-- Users can view their account settings
CREATE POLICY "Users can view own settings" ON account_settings
    FOR SELECT
    USING (account_id = auth.get_user_account_id());

-- Users can update their account settings
CREATE POLICY "Users can update own settings" ON account_settings
    FOR UPDATE
    USING (account_id = auth.get_user_account_id());

-- ============================================
-- NOTES
-- ============================================
-- 
-- Multi-tenant isolation is enforced by:
-- 1. All tables have account_id foreign key
-- 2. RLS policies check account_id matches user's account
-- 3. Helper function auth.get_user_account_id() securely retrieves user's account
--
-- For service-level operations (webhooks, cron jobs), use:
-- - Service role key (bypasses RLS)
-- - Or create specific policies with security definer functions
