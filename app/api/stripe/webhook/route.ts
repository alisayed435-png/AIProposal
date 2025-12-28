import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    // If Stripe is not configured, return early
    if (!stripe) {
        return NextResponse.json({ received: true, demo: true });
    }

    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        return NextResponse.json(
            { error: "Missing signature or webhook secret" },
            { status: 400 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error("[Stripe Webhook Error]", err);
        return NextResponse.json(
            { error: "Webhook signature verification failed" },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            const accountId = session.metadata?.accountId;
            const tier = session.metadata?.tier;

            console.log(`[Stripe] Checkout completed for account ${accountId}, tier: ${tier}`);

            // Here you would update the subscription in your database
            // await updateSubscription(accountId, {
            //   tier,
            //   stripe_customer_id: session.customer,
            //   stripe_subscription_id: session.subscription,
            //   status: 'active',
            // });

            break;
        }

        case "customer.subscription.updated": {
            const subscription = event.data.object;
            console.log(`[Stripe] Subscription updated: ${subscription.id}`);

            // Update subscription status in database
            break;
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object;
            console.log(`[Stripe] Subscription cancelled: ${subscription.id}`);

            // Mark subscription as cancelled in database
            break;
        }

        case "invoice.payment_failed": {
            const invoice = event.data.object;
            console.log(`[Stripe] Payment failed for invoice: ${invoice.id}`);

            // Handle failed payment (notify user, update status, etc.)
            break;
        }

        default:
            console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
