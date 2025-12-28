import Link from "next/link";
import type { Metadata } from "next";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SUBSCRIPTION_TIERS } from "@/lib/stripe";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Simple, transparent pricing for businesses of all sizes. Start with a 14-day free trial.",
};

const faqs = [
    {
        question: "Can I try before I buy?",
        answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required.",
    },
    {
        question: "Can I change plans later?",
        answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards through our secure Stripe payment processing.",
    },
    {
        question: "Is there a long-term contract?",
        answer: "No contracts. Pay month-to-month and cancel anytime with no penalties.",
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.",
    },
    {
        question: "Can I get help migrating from another platform?",
        answer: "Yes! Our Growth plan includes free migration support to help you move your existing website and data.",
    },
];

export default function PricingPage() {
    const tiers = Object.values(SUBSCRIPTION_TIERS);

    return (
        <>
            <MarketingHeader />

            <main className="pt-24">
                {/* Hero */}
                <section className="section-padding bg-gradient-to-b from-brand-50/50 to-white">
                    <div className="container-wide">
                        <div className="max-w-3xl mx-auto text-center">
                            <Badge variant="primary" className="mb-6">
                                14-Day Free Trial
                            </Badge>
                            <h1 className="text-display-md font-bold text-neutral-900">
                                Simple, transparent pricing
                            </h1>
                            <p className="mt-4 text-lg text-neutral-600">
                                Choose the plan that fits your business. Start free, upgrade when you're ready.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="section-padding -mt-8">
                    <div className="container-wide">
                        <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
                            {tiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className={`relative rounded-2xl border-2 bg-white p-8 ${tier.popular
                                            ? "border-brand-500 shadow-glow"
                                            : "border-neutral-200"
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <Badge variant="primary" className="shadow-md">
                                                <Sparkles className="mr-1 h-3 w-3" />
                                                Most Popular
                                            </Badge>
                                        </div>
                                    )}

                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-neutral-900">{tier.name}</h3>
                                        <p className="mt-2 text-neutral-600">{tier.description}</p>
                                        <div className="mt-6">
                                            <span className="text-5xl font-bold text-neutral-900">${tier.price}</span>
                                            <span className="text-neutral-500">/month</span>
                                        </div>
                                    </div>

                                    <ul className="mt-8 space-y-4">
                                        {tier.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 flex-shrink-0 text-success-500 mt-0.5" />
                                                <span className="text-neutral-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/login?signup=true" className="block mt-8">
                                        <Button
                                            variant={tier.popular ? "gradient" : "outline"}
                                            size="lg"
                                            className="w-full"
                                        >
                                            Start Free Trial
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Enterprise */}
                        <div className="mt-12 max-w-4xl mx-auto">
                            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center">
                                <h3 className="text-xl font-semibold text-neutral-900">Need more?</h3>
                                <p className="mt-2 text-neutral-600">
                                    For agencies and enterprises managing multiple client websites,
                                    we offer custom plans with volume pricing and dedicated support.
                                </p>
                                <Link href="#" className="inline-block mt-6">
                                    <Button variant="outline">Contact Sales</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="section-padding bg-neutral-50">
                    <div className="container-wide">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-display-sm font-bold text-neutral-900 text-center mb-12">
                                Frequently asked questions
                            </h2>

                            <div className="space-y-6">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="rounded-xl bg-white p-6">
                                        <h3 className="font-semibold text-neutral-900">{faq.question}</h3>
                                        <p className="mt-2 text-neutral-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-padding bg-gradient-to-br from-brand-600 to-accent-600">
                    <div className="container-wide text-center">
                        <h2 className="text-display-sm font-bold text-white">
                            Ready to get started?
                        </h2>
                        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                            Join thousands of small businesses already using SmallBiz Growth Platform.
                            Start your free trial today.
                        </p>
                        <Link href="/login?signup=true" className="inline-block mt-8">
                            <Button variant="default" size="xl" className="bg-white text-brand-700 hover:bg-neutral-100">
                                Start Your Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <MarketingFooter />
        </>
    );
}
