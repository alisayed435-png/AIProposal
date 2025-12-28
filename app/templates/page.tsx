import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Eye } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Website Templates",
    description: "Professional website templates for plumbers, dentists, gyms, and more. Mobile responsive, SEO optimized, and ready to launch.",
};

const templates = [
    {
        id: "plumber",
        name: "Pro Plumber",
        description: "Professional template for plumbing and home services businesses.",
        category: "Home Services",
        color: "from-blue-600 to-blue-800",
        features: ["Online booking", "Service showcase", "Emergency contact", "Testimonials"],
        preview: "/landing/plumber",
    },
    {
        id: "dentist",
        name: "Dental Care",
        description: "Clean, modern template for dental practices and healthcare providers.",
        category: "Healthcare",
        color: "from-teal-500 to-teal-700",
        features: ["Appointment booking", "Team profiles", "Service menu", "Patient portal"],
        preview: "/landing/dentist",
    },
    {
        id: "gym",
        name: "FitZone",
        description: "Energetic template for gyms, fitness studios, and personal trainers.",
        category: "Fitness",
        color: "from-orange-500 to-red-600",
        features: ["Class schedule", "Membership tiers", "Trainer profiles", "Trial signup"],
        preview: "/landing/gym",
    },
];

function TemplateCard({ template }: { template: typeof templates[0] }) {
    return (
        <div className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
            {/* Preview Image */}
            <div className={`relative h-48 bg-gradient-to-br ${template.color} p-6`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative h-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-2 w-2 rounded-full bg-white/50" />
                        <div className="h-2 w-2 rounded-full bg-white/50" />
                        <div className="h-2 w-2 rounded-full bg-white/50" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-3/4 rounded bg-white/30" />
                        <div className="h-3 w-1/2 rounded bg-white/20" />
                        <div className="h-3 w-2/3 rounded bg-white/20" />
                    </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={template.preview}>
                        <Button variant="default" size="sm" className="bg-white text-neutral-900 hover:bg-neutral-100">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview Template
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900">{template.name}</h3>
                    <Badge variant="secondary">{template.category}</Badge>
                </div>
                <p className="text-neutral-600 mb-4">{template.description}</p>

                <ul className="space-y-2 mb-6">
                    {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                            <Check className="h-4 w-4 text-success-500" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="flex gap-3">
                    <Link href={template.preview} className="flex-1">
                        <Button variant="outline" className="w-full">
                            Preview
                        </Button>
                    </Link>
                    <Link href="/login?signup=true" className="flex-1">
                        <Button variant="default" className="w-full">
                            Use This
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function TemplatesPage() {
    return (
        <>
            <MarketingHeader />

            <main className="pt-24">
                {/* Hero */}
                <section className="section-padding bg-gradient-to-b from-brand-50/50 to-white">
                    <div className="container-wide">
                        <div className="max-w-3xl mx-auto text-center">
                            <Badge variant="primary" className="mb-6">
                                {templates.length} Templates Available
                            </Badge>
                            <h1 className="text-display-md font-bold text-neutral-900">
                                Professional templates for every business
                            </h1>
                            <p className="mt-4 text-lg text-neutral-600">
                                Choose from our collection of beautiful, mobile-responsive templates
                                designed specifically for small businesses. Customize colors, content,
                                and launch in minutes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Templates Grid */}
                <section className="section-padding">
                    <div className="container-wide">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {templates.map((template) => (
                                <TemplateCard key={template.id} template={template} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-padding bg-neutral-50">
                    <div className="container-wide">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-display-sm font-bold text-neutral-900">
                                Can't find what you're looking for?
                            </h2>
                            <p className="mt-4 text-lg text-neutral-600">
                                We're constantly adding new templates. Let us know your industry
                                and we'll prioritize creating a template for you.
                            </p>
                            <Link href="/login?signup=true" className="inline-block mt-8">
                                <Button variant="gradient" size="lg">
                                    Request a Template
                                    <ArrowRight className="ml-2 h-4 w-4" />
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
