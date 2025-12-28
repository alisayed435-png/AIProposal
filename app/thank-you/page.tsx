import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle, Calendar, ArrowRight, Home } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Thank You",
    description: "Thanks for reaching out! We'll be in touch within 24 hours.",
};

export default function ThankYouPage() {
    return (
        <>
            <MarketingHeader />

            <main className="pt-24 min-h-screen flex items-center">
                <section className="section-padding w-full">
                    <div className="container-wide">
                        <div className="max-w-lg mx-auto text-center">
                            {/* Success Icon */}
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success-100 mb-8">
                                <CheckCircle className="h-10 w-10 text-success-600" />
                            </div>

                            <h1 className="text-display-sm font-bold text-neutral-900">
                                Thank you!
                            </h1>
                            <p className="mt-4 text-lg text-neutral-600">
                                We've received your information and will be in touch within 24 hours.
                                In the meantime, why not schedule a demo call?
                            </p>

                            {/* Next Steps */}
                            <div className="mt-12 space-y-4">
                                <div className="rounded-xl border border-neutral-200 bg-white p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
                                            <Calendar className="h-5 w-5 text-brand-600" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-neutral-900">Book a Demo</h3>
                                            <p className="mt-1 text-sm text-neutral-600">
                                                See the platform in action with a personalized walkthrough.
                                            </p>
                                            <Button variant="link" className="mt-2 p-0 h-auto">
                                                Schedule now <ArrowRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-neutral-200 bg-white p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
                                            <Home className="h-5 w-5 text-brand-600" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-neutral-900">Explore Templates</h3>
                                            <p className="mt-1 text-sm text-neutral-600">
                                                Browse our professional templates while you wait.
                                            </p>
                                            <Link href="/templates">
                                                <Button variant="link" className="mt-2 p-0 h-auto">
                                                    View templates <ArrowRight className="ml-1 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Back to Home */}
                            <Link href="/" className="inline-block mt-12">
                                <Button variant="outline">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <MarketingFooter />
        </>
    );
}
