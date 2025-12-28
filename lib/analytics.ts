import { createClient } from "@/lib/supabase/server";
import { isDemoMode, DEMO_ACCOUNT } from "@/lib/demo-mode";

interface TrackEventParams {
    eventName: string;
    path?: string;
    metadata?: Record<string, unknown>;
    accountId?: string;
}

// Server-side event tracking
export async function trackEvent({
    eventName,
    path,
    metadata,
    accountId,
}: TrackEventParams) {
    // If in demo mode, just log to console
    if (isDemoMode()) {
        console.log("[Analytics - Demo Mode]", { eventName, path, metadata, accountId });
        return { success: true, demo: true };
    }

    try {
        const supabase = await createClient();
        if (!supabase) {
            return { success: false, error: "Supabase not configured" };
        }

        const { error } = await supabase.from("events").insert({
            event_name: eventName,
            path,
            metadata: metadata || null,
            account_id: accountId || null,
        });

        if (error) {
            console.error("[Analytics Error]", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error("[Analytics Error]", err);
        return { success: false, error: String(err) };
    }
}

// Client-side analytics tracker class
export class AnalyticsTracker {
    private accountId?: string;
    private posthogEnabled: boolean;

    constructor(accountId?: string) {
        this.accountId = accountId;
        this.posthogEnabled = process.env.NEXT_PUBLIC_ENABLE_POSTHOG === "true";
    }

    async track(eventName: string, properties?: Record<string, unknown>) {
        // Send to our first-party analytics
        try {
            await fetch("/api/analytics/event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventName,
                    path: typeof window !== "undefined" ? window.location.pathname : undefined,
                    metadata: properties,
                    accountId: this.accountId,
                }),
            });
        } catch (err) {
            console.error("[Analytics Track Error]", err);
        }

        // Send to PostHog if enabled
        if (this.posthogEnabled && typeof window !== "undefined") {
            try {
                // PostHog integration would go here
                // posthog.capture(eventName, properties);
            } catch {
                // Ignore PostHog errors
            }
        }
    }

    pageView() {
        if (typeof window === "undefined") return;

        this.track("page_view", {
            url: window.location.href,
            referrer: document.referrer,
            title: document.title,
        });
    }

    identify(userId: string, traits?: Record<string, unknown>) {
        this.accountId = userId;
        this.track("identify", { userId, ...traits });
    }
}

// Pre-defined event types for consistency
export const ANALYTICS_EVENTS = {
    // Page events
    PAGE_VIEW: "page_view",

    // Lead events
    LEAD_FORM_STARTED: "lead_form_started",
    LEAD_FORM_SUBMITTED: "lead_form_submitted",
    LEAD_STATUS_CHANGED: "lead_status_changed",

    // Booking events
    BOOKING_STARTED: "booking_started",
    BOOKING_COMPLETED: "booking_completed",
    BOOKING_CANCELLED: "booking_cancelled",

    // Auth events
    SIGN_UP_STARTED: "sign_up_started",
    SIGN_UP_COMPLETED: "sign_up_completed",
    LOGIN_COMPLETED: "login_completed",
    LOGOUT: "logout",

    // Subscription events
    SUBSCRIPTION_STARTED: "subscription_started",
    SUBSCRIPTION_COMPLETED: "subscription_completed",
    SUBSCRIPTION_CANCELLED: "subscription_cancelled",

    // AI events
    AI_CHAT_STARTED: "ai_chat_started",
    AI_CHAT_MESSAGE_SENT: "ai_chat_message_sent",

    // Template events
    TEMPLATE_VIEWED: "template_viewed",
    TEMPLATE_SELECTED: "template_selected",
} as const;

// Get analytics data for dashboard
export async function getAnalyticsSummary(accountId: string, days = 30) {
    if (isDemoMode()) {
        // Return demo analytics data
        return {
            totalPageViews: 1234,
            totalLeads: 45,
            conversionRate: 3.6,
            topSources: [
                { source: "Google", count: 523 },
                { source: "Facebook", count: 312 },
                { source: "Direct", count: 289 },
                { source: "Instagram", count: 110 },
            ],
            topPages: [
                { path: "/landing/plumber", views: 456 },
                { path: "/", views: 389 },
                { path: "/landing/dentist", views: 234 },
                { path: "/pricing", views: 155 },
            ],
            dailyViews: Array.from({ length: days }, (_, i) => ({
                date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                views: Math.floor(Math.random() * 50) + 20,
            })),
        };
    }

    const supabase = await createClient();
    if (!supabase) {
        return null;
    }

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // Get page views
    const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("account_id", accountId)
        .gte("created_at", startDate);

    if (error) {
        console.error("[Analytics Summary Error]", error);
        return null;
    }

    // Process events
    const pageViews = events?.filter((e) => e.event_name === "page_view") || [];
    const leads = events?.filter((e) => e.event_name === "lead_form_submitted") || [];

    return {
        totalPageViews: pageViews.length,
        totalLeads: leads.length,
        conversionRate: pageViews.length > 0 ? (leads.length / pageViews.length) * 100 : 0,
        topSources: [], // Would need to aggregate metadata
        topPages: [], // Would need to aggregate paths
        dailyViews: [], // Would need to group by date
    };
}
