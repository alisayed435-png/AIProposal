import Link from "next/link";
import type { Metadata } from "next";
import { Dumbbell, Users, Calendar, Trophy, Star, CheckCircle, Phone, Clock, Zap } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { LeadForm } from "@/components/marketing/lead-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "FitZone Gym - Transform Your Body",
    description: "Join the best gym in town. State-of-the-art equipment, expert trainers, and a supportive community to help you reach your fitness goals.",
    openGraph: {
        title: "FitZone Gym - Transform Your Body | SmallBiz Growth Platform",
        description: "Join the best gym in town. State-of-the-art equipment, expert trainers, and a supportive community.",
    },
};

const features = [
    { icon: Dumbbell, name: "Modern Equipment", description: "State-of-the-art machines and free weights" },
    { icon: Users, name: "Expert Trainers", description: "Certified personal trainers to guide you" },
    { icon: Calendar, name: "Flexible Classes", description: "50+ weekly classes for all fitness levels" },
    { icon: Trophy, name: "Results Guaranteed", description: "Our programs deliver real results" },
];

const testimonials = [
    { name: "Jake T.", result: "Lost 35 lbs", quote: "The trainers here actually care about your progress. Best decision I ever made!", rating: 5 },
    { name: "Amanda R.", result: "Gained muscle", quote: "Amazing community and top-notch equipment. I've never felt stronger!", rating: 5 },
    { name: "Chris M.", result: "Marathon ready", quote: "FitZone got me ready for my first marathon. Incredible coaching!", rating: 5 },
];

const plans = [
    { name: "Basic", price: "29", period: "month", features: ["Gym access", "Locker room", "Free WiFi"] },
    { name: "Pro", price: "59", period: "month", features: ["Everything in Basic", "Unlimited classes", "1 PT session/month"], popular: true },
    { name: "Elite", price: "99", period: "month", features: ["Everything in Pro", "4 PT sessions/month", "Nutrition plan"] },
];

export default function GymLandingPage() {
    return (
        <>
            <MarketingHeader />

            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    <div className="relative container-wide py-20 lg:py-28">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge className="bg-white/20 text-white border-white/30 mb-6">
                                    <Zap className="mr-1 h-3 w-3" />
                                    Limited Time: First Month Free
                                </Badge>

                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                    Transform Your Body,<br />
                                    <span className="text-orange-200">Transform Your Life</span>
                                </h1>

                                <p className="mt-6 text-lg text-orange-100">
                                    Join Austin&lsquo;s premier fitness community. World-class equipment,
                                    expert trainers, and a supportive environment to crush your goals.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-orange-200" />
                                        <span>No Contracts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-orange-200" />
                                        <span>24/7 Access</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-orange-200" />
                                        <span>Free Classes</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <a href="#join">
                                        <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold w-full sm:w-auto">
                                            Start Free Trial
                                        </Button>
                                    </a>
                                    <a href="tel:555-FIT-ZONE">
                                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold w-full sm:w-auto">
                                            <Phone className="mr-2 h-5 w-5" />
                                            Call Now
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Lead Form */}
                            <div className="bg-white rounded-2xl p-8 shadow-2xl">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                                    Claim Your Free Week
                                </h2>
                                <p className="text-neutral-600 mb-6">
                                    Start your fitness journey today. No commitment required.
                                </p>
                                <LeadForm source="gym-landing" buttonText="Get Free Week" showMessage={false} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="section-padding bg-white">
                    <div className="container-wide">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-neutral-900">Why Choose FitZone?</h2>
                            <p className="mt-4 text-neutral-600">
                                Everything you need to achieve your fitness goals under one roof.
                            </p>
                        </div>

                        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group rounded-xl border border-neutral-200 bg-white p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="mt-4 font-semibold text-neutral-900">{feature.name}</h3>
                                    <p className="mt-2 text-sm text-neutral-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="section-padding bg-neutral-900 text-white">
                    <div className="container-wide">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
                            <p className="mt-4 text-neutral-400">
                                Choose the plan that fits your lifestyle. All plans include gym access.
                            </p>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`rounded-2xl p-8 ${plan.popular
                                            ? "bg-gradient-to-br from-orange-500 to-red-600 ring-4 ring-orange-400/50 scale-105"
                                            : "bg-neutral-800"
                                        }`}
                                >
                                    {plan.popular && (
                                        <Badge className="bg-white/20 text-white border-0 mb-4">Most Popular</Badge>
                                    )}
                                    <h3 className="text-xl font-bold">{plan.name}</h3>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">${plan.price}</span>
                                        <span className="text-neutral-300">/{plan.period}</span>
                                    </div>
                                    <ul className="mt-6 space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-orange-400" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className={`w-full mt-6 ${plan.popular
                                                ? "bg-white text-orange-600 hover:bg-orange-50"
                                                : "bg-orange-600 hover:bg-orange-700"
                                            }`}
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="section-padding bg-neutral-50">
                    <div className="container-wide">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-neutral-900">Real Results, Real People</h2>
                            <p className="mt-4 text-neutral-600">
                                Join thousands of members who transformed their lives at FitZone.
                            </p>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                                        ))}
                                    </div>
                                    <p className="text-neutral-700 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                                            <p className="text-sm text-orange-600 font-medium">{testimonial.result}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="join" className="section-padding bg-gradient-to-br from-orange-600 to-red-600 text-white">
                    <div className="container-wide">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
                                <p className="mt-4 text-orange-100">
                                    Your transformation starts with a single step. Join FitZone today and get your first month free!
                                </p>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-orange-200">Hours</p>
                                            <p className="font-semibold">24/7 Access for Members</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-orange-200">Call Us</p>
                                            <p className="font-semibold">(555) FIT-ZONE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                                    Start Your Free Trial
                                </h3>
                                <LeadForm source="gym-cta" buttonText="Claim Free Month" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <MarketingFooter />
        </>
    );
}
