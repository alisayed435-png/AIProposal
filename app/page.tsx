import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  LayoutTemplate,
  Users,
  BarChart3,
  CreditCard,
  Bot,
  Zap,
  Check,
  Star
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { LeadForm } from "@/components/marketing/lead-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isDemoMode } from "@/lib/demo-mode";

const features = [
  {
    icon: LayoutTemplate,
    title: "Beautiful Templates",
    description: "Choose from professionally designed templates for plumbers, dentists, gyms, and more.",
  },
  {
    icon: Users,
    title: "Lead Capture",
    description: "Built-in forms that capture leads with UTM tracking and instant notifications.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track page views, conversions, and campaign performance in real-time.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Accept payments and manage subscriptions with Stripe integration.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Get help analyzing leads, generating ad copy, and optimizing campaigns.",
  },
  {
    icon: Zap,
    title: "Fast Setup",
    description: "Launch your professional website in minutes, not weeks.",
  },
];

const testimonials = [
  {
    quote: "SmallBiz Growth Platform helped us triple our leads in just two months. The templates are beautiful and the AI assistant saves me hours every week.",
    author: "Sarah Johnson",
    title: "Owner, Bright Dental Care",
    rating: 5,
  },
  {
    quote: "Finally, a platform that understands small business needs. Easy to use, affordable, and the support team is amazing.",
    author: "Mike Wilson",
    title: "CEO, Iron Fit Gym",
    rating: 5,
  },
  {
    quote: "The lead tracking and CRM features alone are worth the subscription. Highly recommend for any local business.",
    author: "John Smith",
    title: "Owner, Smith Plumbing Co.",
    rating: 5,
  },
];

export default function HomePage() {
  const demoMode = isDemoMode();

  return (
    <>
      <MarketingHeader />

      <main>
        {/* Demo Mode Banner */}
        {demoMode && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="container-wide py-2 text-center text-sm text-amber-800">
              <Sparkles className="inline-block h-4 w-4 mr-1" />
              <strong>Demo Mode:</strong> Running with sample data. Connect Supabase for full functionality.
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/50 to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[800px] bg-gradient-to-r from-brand-200/30 to-accent-200/30 rounded-full blur-3xl" />

          <div className="container-wide">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="primary" className="mb-6">
                <Sparkles className="mr-1 h-3 w-3" />
                Now with AI-powered tools
              </Badge>

              <h1 className="text-display-md sm:text-display-lg font-bold text-neutral-900 tracking-tight">
                Launch your business website{" "}
                <span className="text-gradient">in minutes</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed">
                The all-in-one platform for small businesses. Beautiful templates,
                lead capture, bookings, and AI-powered growth tools. No coding required.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login?signup=true">
                  <Button variant="gradient" size="xl">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="xl">
                    View Templates
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm text-neutral-500">
                14-day free trial • No credit card required
              </p>
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-soft overflow-hidden">
                <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-error-400" />
                    <div className="h-3 w-3 rounded-full bg-warning-400" />
                    <div className="h-3 w-3 rounded-full bg-success-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-neutral-400">app.smallbiz-growth.com</span>
                  </div>
                </div>
                <div className="bg-neutral-100 p-8 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-neutral-500">Dashboard Preview</p>
                    <Link href="/portal" className="text-sm text-brand-600 hover:underline mt-2 inline-block">
                      Try the live demo →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-display-sm font-bold text-neutral-900">
                Everything you need to grow online
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                From beautiful websites to lead management, we've got you covered.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-accent-500 group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-neutral-50">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-display-sm font-bold text-neutral-900">
                Trusted by small businesses everywhere
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                See what our customers have to say about their experience.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning-400 text-warning-400" />
                    ))}
                  </div>
                  <p className="text-neutral-700 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                    <p className="text-sm text-neutral-500">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-neutral-900 to-neutral-950">
          <div className="container-wide">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-display-sm font-bold text-white">
                  Ready to grow your business?
                </h2>
                <p className="mt-4 text-lg text-neutral-300">
                  Join thousands of small businesses using SmallBiz Growth Platform
                  to capture leads, manage bookings, and scale their online presence.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "14-day free trial",
                    "No credit card required",
                    "Cancel anytime",
                    "Free migration support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-neutral-300">
                      <Check className="h-5 w-5 text-brand-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                  Get started today
                </h3>
                <LeadForm source="homepage-cta" buttonText="Start Free Trial" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
