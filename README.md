# SmallBiz Growth Platform

A production-ready SaaS demo showcasing modern full-stack development capabilities. Built with Next.js 14, Supabase, Stripe, and AI integration.

![Demo Mode Banner](https://img.shields.io/badge/Demo%20Mode-Fully%20Functional-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🎯 Overview

SmallBiz Growth Platform is an all-in-one solution for small businesses to:
- Launch professional websites with beautiful templates
- Capture and manage leads with UTM tracking
- Book appointments and manage customers
- Access AI-powered growth tools
- Track campaigns and analytics

## 🚀 Quick Start

```bash
# Clone and install
git clone <repo>
cd smallbiz-growth-platform
npm install

# Run in demo mode (no keys required!)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - the app works fully in demo mode with sample data.

## 🏗️ Architecture

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes (leads, analytics, AI, Stripe)
│   ├── landing/           # Template landing pages (plumber, dentist)
│   ├── portal/            # Authenticated client portal
│   └── (marketing)/       # Public marketing pages
├── components/
│   ├── ui/                # Reusable UI components
│   └── marketing/         # Marketing site components
├── lib/
│   ├── supabase/          # Supabase client & middleware
│   ├── ai/                # AI provider abstraction
│   └── *.ts               # Utilities (analytics, stripe, demo-mode)
├── supabase/              # Database schema & migrations
└── tests/                 # Playwright E2E tests
```

## ✨ Features

### Marketing Site
- **Homepage** - Hero, features, testimonials, CTA sections
- **Templates Gallery** - Business template showcase
- **Pricing** - Subscription tiers with feature comparison
- **SEO** - Metadata, Open Graph, sitemap

### Landing Pages
- **Plumber** - Blue theme, 24/7 service emphasis
- **Dentist** - Teal theme, patient care focus
- Lead capture with UTM parameter tracking
- Thank-you page with booking CTA

### Client Portal
- **Dashboard** - Stats, recent leads, bookings overview
- **Leads Inbox** - Full CRM with status management, notes
- **Bookings** - CRUD operations, filtering, status tracking
- **Campaigns** - Analytics by source and campaign
- **Website** - Template selector and customization
- **AI Assistant** - Chat interface for business insights
- **Settings** - Business, branding, billing, notifications

### Technical Features
- **Demo Mode** - Works with zero external keys
- **Multi-tenant** - Row-level security isolation
- **AI Abstraction** - Swap providers without code changes
- **Stripe Integration** - Checkout, webhooks, subscription management
- **First-party Analytics** - Privacy-focused event tracking

## 🔧 Configuration

Copy `.env.example` to `.env.local` and configure:

### Required for Full Functionality

```env
# Supabase (auth & database)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (payments)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Optional Enhancements

```env
# AI Provider (default: stub)
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
```

## 📊 Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the schema in SQL Editor:
   ```sql
   -- Run in order:
   -- 1. supabase/schema.sql
   -- 2. supabase/rls.sql
   -- 3. supabase/seed.sql (optional demo data)
   ```
3. Add environment variables to `.env.local`

## 💳 Stripe Setup

1. Create Stripe products for subscription tiers:
   - **Starter** - $29/month (price_starter)
   - **Growth** - $79/month (price_growth)
2. Configure webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Listen for events: `checkout.session.completed`, `customer.subscription.*`

## 🧪 Testing

```bash
# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run specific test file
npx playwright test tests/landing.spec.ts

# Run with UI
npx playwright test --ui
```

### Test Suites
- `landing.spec.ts` - Homepage, navigation, features
- `lead-form.spec.ts` - Form submission flow
- `portal.spec.ts` - Demo login, navigation, leads table

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Environment Variables
Set all variables from `.env.example` in your deployment platform.

### Post-Deploy
1. Update `NEXT_PUBLIC_APP_URL` to your domain
2. Configure Stripe webhook endpoint
3. Run database migrations in Supabase

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/demo-mode.ts` | In-memory data for demo mode |
| `lib/ai/providers.ts` | AI provider abstraction |
| `lib/stripe.ts` | Stripe configuration & helpers |
| `components/ui/*` | Reusable component library |
| `middleware.ts` | Auth & route protection |

## 🎨 Design System

### Colors
```css
--brand-500: #0ea5e9;    /* Primary blue */
--accent-500: #d946ef;   /* Purple accent */
--success-500: #22c55e;  /* Green */
--warning-500: #f59e0b;  /* Amber */
--error-500: #ef4444;    /* Red */
```

### Template Themes
- **Plumber** - Blue (#1e40af → #1e3a8a)
- **Dentist** - Teal (#14b8a6 → #0d9488)
- **Gym** - Orange/Red (#f97316 → #dc2626)

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

Built as a portfolio demonstration of senior full-stack engineering capabilities.
