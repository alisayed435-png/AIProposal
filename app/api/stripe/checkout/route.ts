import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { tier, accountId, customerEmail } = body;

        if (!tier || !accountId || !customerEmail) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (tier !== "starter" && tier !== "growth") {
            return NextResponse.json(
                { error: "Invalid tier" },
                { status: 400 }
            );
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const result = await createCheckoutSession({
            tier,
            accountId,
            customerEmail,
            successUrl: `${appUrl}/portal?checkout=success&tier=${tier}`,
            cancelUrl: `${appUrl}/pricing?checkout=cancelled`,
        });

        return NextResponse.json({
            success: true,
            url: result.url,
            sessionId: result.sessionId,
            demo: !isStripeConfigured(),
        });
    } catch (err) {
        console.error("[Stripe Checkout Error]", err);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
