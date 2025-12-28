import Stripe from "stripe";

// Initialize Stripe only if keys are available
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
    ? new Stripe(stripeSecretKey, {
        apiVersion: "2024-12-18.acacia",
        typescript: true,
    })
    : null;

export function isStripeConfigured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

export const SUBSCRIPTION_TIERS = {
    starter: {
        id: "starter",
        name: "Starter",
        description: "Perfect for small businesses just getting started",
        price: 49,
        priceId: process.env.STRIPE_STARTER_PRICE_ID || "price_starter",
        features: [
            "Professional website template",
            "Lead capture forms",
            "Basic SEO optimization",
            "Mobile responsive design",
            "Email support",
            "Up to 100 leads/month",
        ],
        limits: {
            leads: 100,
            aiAssistant: false,
            customBranding: false,
            analytics: "basic",
        },
    },
    growth: {
        id: "growth",
        name: "Growth",
        description: "For businesses ready to scale",
        price: 99,
        priceId: process.env.STRIPE_GROWTH_PRICE_ID || "price_growth",
        features: [
            "Everything in Starter",
            "AI-powered assistant",
            "Advanced analytics dashboard",
            "Custom branding options",
            "Priority support",
            "Unlimited leads",
            "Multiple landing pages",
            "UTM campaign tracking",
        ],
        limits: {
            leads: -1, // unlimited
            aiAssistant: true,
            customBranding: true,
            analytics: "advanced",
        },
        popular: true,
    },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export async function createCheckoutSession({
    tier,
    accountId,
    customerEmail,
    successUrl,
    cancelUrl,
}: {
    tier: SubscriptionTier;
    accountId: string;
    customerEmail: string;
    successUrl: string;
    cancelUrl: string;
}) {
    if (!stripe) {
        // Return mock checkout URL for demo mode
        return {
            url: `${successUrl}?demo=true&tier=${tier}`,
            sessionId: `demo_session_${Date.now()}`,
        };
    }

    const tierConfig = SUBSCRIPTION_TIERS[tier];

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: customerEmail,
        line_items: [
            {
                price: tierConfig.priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
            accountId,
            tier,
        },
    });

    return {
        url: session.url,
        sessionId: session.id,
    };
}

export async function getSubscription(stripeSubscriptionId: string) {
    if (!stripe) {
        return null;
    }

    try {
        return await stripe.subscriptions.retrieve(stripeSubscriptionId);
    } catch {
        return null;
    }
}

export async function cancelSubscription(stripeSubscriptionId: string) {
    if (!stripe) {
        return { success: true, demo: true };
    }

    try {
        await stripe.subscriptions.cancel(stripeSubscriptionId);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}
