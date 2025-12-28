import Link from "next/link";
import type { Metadata } from "next";
import { Phone, Mail, Clock, Shield, Wrench, Droplets, ThermometerSun, Star, CheckCircle } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { LeadForm } from "@/components/marketing/lead-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Professional Plumbing Services",
    description: "Expert plumbing services for your home. 24/7 emergency service, licensed plumbers, upfront pricing. Get your free quote today!",
    openGraph: {
        title: "Professional Plumbing Services | SmallBiz Growth Platform",
        description: "Expert plumbing services for your home. 24/7 emergency service, licensed plumbers, upfront pricing.",
    },
};

const services = [
    { icon: Wrench, name: "General Repairs", description: "Fix leaks, drips, and clogs quickly" },
    { icon: Droplets, name: "Drain Cleaning", description: "Professional drain and sewer service" },
    { icon: ThermometerSun, name: "Water Heaters", description: "Installation and repair services" },
    { icon: Shield, name: "Emergency Service", description: "24/7 emergency plumbing response" },
];

const testimonials = [
    { name: "Jennifer M.", location: "Austin, TX", quote: "Fast response and fair pricing. Fixed our leak in under an hour!", rating: 5 },
    { name: "Robert K.", location: "Round Rock, TX", quote: "Professional team that really knows their stuff. Highly recommend!", rating: 5 },
    { name: "Maria S.", location: "Cedar Park, TX", quote: "Best plumber we've ever used. Will definitely call again.", rating: 5 },
];

export default function PlumberLandingPage() {
    return (
        <>
            <MarketingHeader />

            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative bg-plumber-primary text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-plumber-primary to-plumber-secondary" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                    <div className="relative container-wide py-20 lg:py-28">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge className="bg-white/20 text-white border-white/30 mb-6">
                                    <Clock className="mr-1 h-3 w-3" />
                                    24/7 Emergency Service
                                </Badge>

                                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                    Expert Plumbing Services You Can Trust
                                </h1>

                                <p className="mt-6 text-lg text-blue-100">
                                    From leaky faucets to major repairs, our licensed plumbers provide
                                    fast, reliable service with upfront pricing. No surprises, just solutions.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-blue-300" />
                                        <span>Licensed & Insured</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-blue-300" />
                                        <span>Upfront Pricing</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-blue-300" />
                                        <span>Satisfaction Guaranteed</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <a href="tel:555-123-4567">
                                        <Button size="lg" className="bg-white text-plumber-primary hover:bg-blue-50 w-full sm:w-auto">
                                            <Phone className="mr-2 h-5 w-5" />
                                            (555) 123-4567
                                        </Button>
                                    </a>
                                    <a href="#contact">
                                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                                            Get Free Quote
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Lead Form */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                                    Get Your Free Quote
                                </h2>
                                <p className="text-neutral-600 mb-6">
                                    Fill out the form and we'll get back to you within 1 hour.
                                </p>
                                <LeadForm source="plumber-landing" buttonText="Request Quote" showMessage={true} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="section-padding bg-white">
                    <div className="container-wide">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-neutral-900">Our Services</h2>
                            <p className="mt-4 text-neutral-600">
                                We handle all your plumbing needs, big or small.
                            </p>
                        </div>

                        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="group rounded-xl border border-neutral-200 bg-white p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-plumber-primary/10 text-plumber-primary group-hover:bg-plumber-primary group-hover:text-white transition-colors">
                                        <service.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="mt-4 font-semibold text-neutral-900">{service.name}</h3>
                                    <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="section-padding bg-neutral-50">
                    <div className="container-wide">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-neutral-900">What Our Customers Say</h2>
                            <p className="mt-4 text-neutral-600">
                                We're proud to have helped thousands of happy customers.
                            </p>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-neutral-700 italic mb-4">"{testimonial.quote}"</p>
                                    <div>
                                        <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                                        <p className="text-sm text-neutral-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section-padding bg-plumber-primary text-white">
                    <div className="container-wide">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                                <p className="mt-4 text-blue-100">
                                    Contact us today for a free quote. We're available 24/7 for emergency services.
                                </p>

                                <div className="mt-8 space-y-4">
                                    <a href="tel:555-123-4567" className="flex items-center gap-4 text-lg hover:text-blue-200 transition-colors">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Call us</p>
                                            <p className="font-semibold">(555) 123-4567</p>
                                        </div>
                                    </a>
                                    <a href="mailto:info@example.com" className="flex items-center gap-4 text-lg hover:text-blue-200 transition-colors">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Email us</p>
                                            <p className="font-semibold">info@proplumber.com</p>
                                        </div>
                                    </a>
                                    <div className="flex items-center gap-4 text-lg">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Hours</p>
                                            <p className="font-semibold">24/7 Emergency Service</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                                    Schedule Your Service
                                </h3>
                                <LeadForm source="plumber-contact" buttonText="Schedule Now" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <MarketingFooter />
        </>
    );
}
