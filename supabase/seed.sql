-- SmallBiz Growth Platform - Seed Data
-- Run this AFTER schema.sql and rls.sql
-- Note: Run this with service role key to bypass RLS

-- ============================================
-- DEMO ACCOUNT
-- ============================================
INSERT INTO accounts (id, name, created_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Demo Business', NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- DEMO SUBSCRIPTION
-- ============================================
INSERT INTO subscriptions (id, account_id, tier, status, current_period_end)
VALUES 
    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'growth', 'active', NOW() + INTERVAL '30 days')
ON CONFLICT (account_id) DO UPDATE SET
    tier = EXCLUDED.tier,
    status = EXCLUDED.status,
    current_period_end = EXCLUDED.current_period_end;

-- ============================================
-- DEMO ACCOUNT SETTINGS
-- ============================================
INSERT INTO account_settings (id, account_id, business_name, primary_color, secondary_color, selected_template)
VALUES 
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Demo Business', '#0ea5e9', '#d946ef', 'plumber')
ON CONFLICT (account_id) DO NOTHING;

-- ============================================
-- SAMPLE LEADS
-- ============================================
INSERT INTO leads (account_id, name, email, business_type, message, utm_source, utm_medium, utm_campaign, status, notes, created_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'John Smith', 'john.smith@email.com', 'plumber', 'I need a new website for my plumbing business. Looking for something professional that shows my services and allows online booking.', 'google', 'cpc', 'plumber-landing', 'new', NULL, NOW() - INTERVAL '30 minutes'),
    ('11111111-1111-1111-1111-111111111111', 'Sarah Johnson', 'sarah.j@dentalcare.com', 'dentist', 'Our dental practice needs a modern website with patient booking functionality.', 'facebook', 'social', 'dental-spring', 'contacted', 'Called on 12/28, interested in Growth plan', NOW() - INTERVAL '2 hours'),
    ('11111111-1111-1111-1111-111111111111', 'Mike Wilson', 'mike@ironfit.gym', 'gym', 'Looking for a website that can help us manage memberships and class schedules.', 'instagram', 'social', 'fitness-january', 'qualified', 'Very interested, scheduled demo for next week', NOW() - INTERVAL '1 day'),
    ('11111111-1111-1111-1111-111111111111', 'Emily Chen', 'emily.chen@email.com', 'plumber', 'Need a quick website setup for my new plumbing company.', 'google', 'organic', NULL, 'converted', 'Signed up for Starter plan', NOW() - INTERVAL '2 days'),
    ('11111111-1111-1111-1111-111111111111', 'David Brown', 'david.b@gmail.com', 'other', 'I run a small landscaping business and need online presence.', NULL, NULL, NULL, 'new', NULL, NOW() - INTERVAL '15 minutes');

-- ============================================
-- SAMPLE BOOKINGS
-- ============================================
INSERT INTO bookings (account_id, name, email, phone, datetime, service, status, notes, created_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Alex Thompson', 'alex.t@email.com', '(555) 123-4567', NOW() + INTERVAL '2 days', 'Consultation Call', 'confirmed', 'Interested in Growth plan features', NOW() - INTERVAL '5 hours'),
    ('11111111-1111-1111-1111-111111111111', 'Lisa Garcia', 'lisa.g@dentalsmile.com', '(555) 987-6543', NOW() + INTERVAL '3 days', 'Demo Walkthrough', 'pending', NULL, NOW() - INTERVAL '3 hours'),
    ('11111111-1111-1111-1111-111111111111', 'Robert Kim', 'robert.kim@email.com', '(555) 456-7890', NOW() - INTERVAL '1 day', 'Onboarding Session', 'completed', 'New customer, started with Starter plan', NOW() - INTERVAL '3 days');

-- ============================================
-- SAMPLE EVENTS (Analytics)
-- ============================================
INSERT INTO events (account_id, event_name, path, metadata, created_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'page_view', '/landing/plumber', '{"utm_source": "google", "utm_campaign": "plumber-landing"}', NOW() - INTERVAL '30 minutes'),
    ('11111111-1111-1111-1111-111111111111', 'lead_form_submitted', '/landing/plumber', '{"lead_id": "sample-lead-1"}', NOW() - INTERVAL '28 minutes'),
    (NULL, 'page_view', '/', NULL, NOW() - INTERVAL '45 minutes'),
    ('11111111-1111-1111-1111-111111111111', 'page_view', '/landing/dentist', '{"utm_source": "facebook"}', NOW() - INTERVAL '2 hours'),
    ('11111111-1111-1111-1111-111111111111', 'page_view', '/pricing', NULL, NOW() - INTERVAL '1 hour');

-- ============================================
-- OUTPUT
-- ============================================
SELECT 'Seed data inserted successfully!' AS message;
SELECT 'Demo account ID: 11111111-1111-1111-1111-111111111111' AS info;
