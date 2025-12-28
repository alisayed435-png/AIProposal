import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isDemoMode, addDemoLead, DEMO_ACCOUNT } from "@/lib/demo-mode";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            businessType,
            message,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
        } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Demo mode - use in-memory storage
        if (isDemoMode()) {
            const lead = addDemoLead({
                account_id: DEMO_ACCOUNT.id,
                name,
                email,
                business_type: businessType || null,
                message: message || null,
                utm_source: utm_source || null,
                utm_medium: utm_medium || null,
                utm_campaign: utm_campaign || null,
                utm_term: utm_term || null,
                utm_content: utm_content || null,
                status: "new",
                notes: null,
            });

            // Track event
            await trackEvent({
                eventName: ANALYTICS_EVENTS.LEAD_FORM_SUBMITTED,
                path: request.headers.get("referer") || undefined,
                metadata: { lead_id: lead.id, utm_source, utm_campaign },
                accountId: DEMO_ACCOUNT.id,
            });

            return NextResponse.json({ success: true, lead, demo: true });
        }

        // Real mode - use Supabase
        const supabase = await createClient();
        if (!supabase) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        // For now, use a demo account ID since we don't have multi-tenant setup in this request
        // In a real app, you'd determine the account from the domain or other context
        const { data: lead, error } = await supabase
            .from("leads")
            .insert({
                account_id: DEMO_ACCOUNT.id, // Would be dynamically determined
                name,
                email,
                business_type: businessType || null,
                message: message || null,
                utm_source: utm_source || null,
                utm_medium: utm_medium || null,
                utm_campaign: utm_campaign || null,
                utm_term: utm_term || null,
                utm_content: utm_content || null,
                status: "new",
            })
            .select()
            .single();

        if (error) {
            console.error("[Lead API Error]", error);
            return NextResponse.json(
                { error: "Failed to save lead" },
                { status: 500 }
            );
        }

        // Track event
        await trackEvent({
            eventName: ANALYTICS_EVENTS.LEAD_FORM_SUBMITTED,
            path: request.headers.get("referer") || undefined,
            metadata: { lead_id: lead.id, utm_source, utm_campaign },
            accountId: lead.account_id,
        });

        return NextResponse.json({ success: true, lead });
    } catch (err) {
        console.error("[Lead API Error]", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
