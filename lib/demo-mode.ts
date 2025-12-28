import { type Database } from "./database.types";

// Demo data for when Supabase is not configured
export const DEMO_ACCOUNT = {
    id: "demo-account-001",
    name: "Demo Business",
    created_at: new Date().toISOString(),
};

export const DEMO_PROFILE = {
    id: "demo-user-001",
    account_id: DEMO_ACCOUNT.id,
    email: "demo@example.com",
    role: "admin",
    full_name: "Demo User",
    created_at: new Date().toISOString(),
};

export const DEMO_LEADS: Database["public"]["Tables"]["leads"]["Row"][] = [
    {
        id: "lead-001",
        account_id: DEMO_ACCOUNT.id,
        name: "John Smith",
        email: "john.smith@email.com",
        business_type: "plumber",
        message: "I need a new website for my plumbing business. Looking for something professional that shows my services and allows online booking.",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "plumber-landing",
        utm_term: null,
        utm_content: null,
        status: "new",
        notes: null,
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    },
    {
        id: "lead-002",
        account_id: DEMO_ACCOUNT.id,
        name: "Sarah Johnson",
        email: "sarah.j@dentalcare.com",
        business_type: "dentist",
        message: "Our dental practice needs a modern website with patient booking functionality.",
        utm_source: "facebook",
        utm_medium: "social",
        utm_campaign: "dental-spring",
        utm_term: null,
        utm_content: null,
        status: "contacted",
        notes: "Called on 12/28, interested in Growth plan",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
        id: "lead-003",
        account_id: DEMO_ACCOUNT.id,
        name: "Mike Wilson",
        email: "mike@ironfit.gym",
        business_type: "gym",
        message: "Looking for a website that can help us manage memberships and class schedules.",
        utm_source: "instagram",
        utm_medium: "social",
        utm_campaign: "fitness-january",
        utm_term: null,
        utm_content: null,
        status: "qualified",
        notes: "Very interested, scheduled demo for next week",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
        id: "lead-004",
        account_id: DEMO_ACCOUNT.id,
        name: "Emily Chen",
        email: "emily.chen@email.com",
        business_type: "plumber",
        message: "Need a quick website setup for my new plumbing company.",
        utm_source: "google",
        utm_medium: "organic",
        utm_campaign: null,
        utm_term: null,
        utm_content: null,
        status: "converted",
        notes: "Signed up for Starter plan",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
    {
        id: "lead-005",
        account_id: DEMO_ACCOUNT.id,
        name: "David Brown",
        email: "david.b@gmail.com",
        business_type: "other",
        message: "I run a small landscaping business and need online presence.",
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_term: null,
        utm_content: null,
        status: "new",
        notes: null,
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    },
];

export const DEMO_BOOKINGS: Database["public"]["Tables"]["bookings"]["Row"][] = [
    {
        id: "booking-001",
        account_id: DEMO_ACCOUNT.id,
        name: "Alex Thompson",
        email: "alex.t@email.com",
        phone: "(555) 123-4567",
        datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
        service: "Consultation Call",
        status: "confirmed",
        notes: "Interested in Growth plan features",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
        id: "booking-002",
        account_id: DEMO_ACCOUNT.id,
        name: "Lisa Garcia",
        email: "lisa.g@dentalsmile.com",
        phone: "(555) 987-6543",
        datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days from now
        service: "Demo Walkthrough",
        status: "pending",
        notes: null,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
        id: "booking-003",
        account_id: DEMO_ACCOUNT.id,
        name: "Robert Kim",
        email: "robert.kim@email.com",
        phone: "(555) 456-7890",
        datetime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
        service: "Onboarding Session",
        status: "completed",
        notes: "New customer, started with Starter plan",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    },
];

export const DEMO_SUBSCRIPTION: Database["public"]["Tables"]["subscriptions"]["Row"] = {
    id: "sub-001",
    account_id: DEMO_ACCOUNT.id,
    tier: "growth",
    stripe_customer_id: null,
    stripe_subscription_id: null,
    status: "active",
    current_period_end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days from now
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
};

export const DEMO_SETTINGS: Database["public"]["Tables"]["account_settings"]["Row"] = {
    id: "settings-001",
    account_id: DEMO_ACCOUNT.id,
    business_name: "Demo Business",
    logo_url: null,
    primary_color: "#0ea5e9",
    secondary_color: "#d946ef",
    selected_template: "plumber",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export const DEMO_EVENTS: Database["public"]["Tables"]["events"]["Row"][] = [
    {
        id: "event-001",
        account_id: DEMO_ACCOUNT.id,
        event_name: "page_view",
        path: "/landing/plumber",
        metadata: { utm_source: "google", utm_campaign: "plumber-landing" },
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
        id: "event-002",
        account_id: DEMO_ACCOUNT.id,
        event_name: "lead_submitted",
        path: "/landing/plumber",
        metadata: { lead_id: "lead-001" },
        created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    },
    {
        id: "event-003",
        account_id: null,
        event_name: "page_view",
        path: "/",
        metadata: null,
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
];

// In-memory storage for demo mode mutations
let demoLeads = [...DEMO_LEADS];
let demoBookings = [...DEMO_BOOKINGS];

export function getDemoLeads() {
    return demoLeads;
}

export function addDemoLead(lead: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at">) {
    const newLead: Database["public"]["Tables"]["leads"]["Row"] = {
        ...lead,
        id: `lead-${Date.now()}`,
        created_at: new Date().toISOString(),
    };
    demoLeads = [newLead, ...demoLeads];
    return newLead;
}

export function updateDemoLead(id: string, updates: Partial<Database["public"]["Tables"]["leads"]["Row"]>) {
    demoLeads = demoLeads.map((lead) =>
        lead.id === id ? { ...lead, ...updates } : lead
    );
    return demoLeads.find((lead) => lead.id === id);
}

export function getDemoBookings() {
    return demoBookings;
}

export function addDemoBooking(booking: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "created_at">) {
    const newBooking: Database["public"]["Tables"]["bookings"]["Row"] = {
        ...booking,
        id: `booking-${Date.now()}`,
        created_at: new Date().toISOString(),
    };
    demoBookings = [newBooking, ...demoBookings];
    return newBooking;
}

export function updateDemoBooking(id: string, updates: Partial<Database["public"]["Tables"]["bookings"]["Row"]>) {
    demoBookings = demoBookings.map((booking) =>
        booking.id === id ? { ...booking, ...updates } : booking
    );
    return demoBookings.find((booking) => booking.id === id);
}

export function deleteDemoBooking(id: string) {
    demoBookings = demoBookings.filter((booking) => booking.id !== id);
}

export function isDemoMode(): boolean {
    return (
        process.env.FORCE_DEMO_MODE === "true" ||
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}
