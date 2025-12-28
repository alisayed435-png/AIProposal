import Link from "next/link";
import type { Metadata } from "next";
import { Phone, Mail, Clock, Smile, Heart, Sparkles, Shield, Star, CheckCircle, Calendar } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { LeadForm } from "@/components/marketing/lead-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Family Dental Care | Gentle Dentistry for All Ages",
    description: "Comprehensive dental care for your entire family. From cleanings to cosmetic dentistry, we make every visit comfortable. Book your appointment today!",
    openGraph: {
        title: "Family Dental Care | Gentle Dentistry for All Ages",
        description: "Comprehensive dental care for your entire family. From cleanings to cosmetic dentistry, we make every visit comfortable.",
    },
};

const services = [
    { icon: Smile, name: "General Dentistry", description: "Cleanings, fillings, and preventive care" },
    { icon: Sparkles, name: "Cosmetic Dentistry", description: "Whitening, veneers, and smile makeovers" },
    { icon: Heart, name: "Family Care", description: "Gentle care for patients of all ages" },
    { icon: Shield, name: "Emergency Care", description: "Same-day appointments available" },
];

const team = [
    { name: "Dr. Sarah Chen", title: "Lead Dentist", specialty: "Cosmetic & General Dentistry" },
    { name: "Dr. Michael Lee", title: "Orthodontist", specialty: "Invisalign Certified" },
    { name: "Dr. Emily Park", title: "Pediatric Dentist", specialty: "Children's Dentistry" },
];

const testimonials = [
    { name: "Amanda T.", quote: "The entire team is so friendly and gentle. My kids actually look forward to going to the dentist now!", rating: 5 },
    { name: "David R.", quote: "Best dental experience I've ever had. Modern office, no wait times, and my teeth have never looked better.", rating: 5 },
    { name: "Lisa M.", quote: "Finally found a dentist I'm not afraid of! Dr. Chen is amazing and explains everything clearly.", rating: 5 },
];

export default function DentistLandingPage() {
    return (
        <>
            <MarketingHeader />

            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative bg-dentist-secondary overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-dentist-secondary via-white to-dentist-accent/10" />

                    <div className="relative container-wide py-20 lg:py-28">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge className="bg-dentist-primary/10 text-dentist-primary border-dentist-primary/20 mb-6">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    Now Accepting New Patients
                                </Badge>

                                <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                                    Your Smile Deserves{" "}
                                    <span className="text-dentist-primary">Expert Care</span>
                                </h1>

                                <p className="mt-6 text-lg text-neutral-600">
                                    Experience gentle, modern dentistry for your whole family. Our caring team
                                    uses the latest technology to make every visit comfortable and stress-free.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-neutral-700">
                                        <CheckCircle className="h-5 w-5 text-dentist-primary" />
                                        <span>Gentle Care</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-700">
                                        <CheckCircle className="h-5 w-5 text-dentist-primary" />
                                        <span>Modern Technology</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-700">
                                        <CheckCircle className="h-5 w-5 text-dentist-primary" />
                                        <span>Insurance Accepted</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <a href="#book">
                                        <Button size="lg" className="bg-dentist-primary hover:bg-teal-600 w-full sm:w-auto">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            Book Appointment
                                        </Button>
                                    </a>
                                    <a href="tel:555-234-5678">
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                            <Phone className="mr-2 h-5 w-5" />
                                            (555) 234-5678
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Lead Form */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-100">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                                    Schedule Your Visit
                                </h2>
                                <p className="text-neutral-600 mb-6">
                                    New patient special: Free exam and X-rays with cleaning!
                                </p>
                                <LeadForm source="dentist-landing" buttonText="Book Appointment" showMessage={true} />
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
                                Comprehensive dental care for your entire family.
                            </p>
                        </div>

                        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="group rounded-xl border border-neutral-200 bg-white p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-dentist-primary/10 text-dentist-primary group-hover:bg-dentist-primary group-hover:text-white transition-colors">
                                        <service.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="mt-4 font-semibold text-neutral-900">{service.name}</h3>
                                    <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="section-padding bg-neutral-50">
                    <div className="container-wide">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-neutral-900">Meet Our Team</h2>
                            <p className="mt-4 text-neutral-600">
                                Experienced, caring professionals dedicated to your smile.
                            </p>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-dentist-primary to-dentist-accent flex items-center justify-center text-white text-3xl font-bold mb-4">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h3 className="font-semibold text-neutral-900">{member.name}</h3>
                                    <p className="text-dentist-primary font-medium">{member.title}</p>
                                    <p className="text-sm text-neutral-500 mt-1">{member.specialty}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="section-padding bg-white">
                    <div className="container-wide">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-neutral-900">Patient Reviews</h2>
                            <div className="flex items-center justify-center gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="ml-2 text-neutral-600">4.9/5 from 300+ reviews</span>
                            </div>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="rounded-xl border border-neutral-200 bg-white p-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-neutral-700 italic mb-4">"{testimonial.quote}"</p>
                                    <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Booking Section */}
                <section id="book" className="section-padding bg-dentist-primary text-white">
                    <div className="container-wide">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold">Book Your Appointment</h2>
                                <p className="mt-4 text-teal-100">
                                    Ready for a healthier smile? Schedule your visit today and experience
                                    the difference of modern, gentle dentistry.
                                </p>

                                <div className="mt-8 space-y-4">
                                    <a href="tel:555-234-5678" className="flex items-center gap-4 text-lg hover:text-teal-200 transition-colors">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-teal-200">Call us</p>
                                            <p className="font-semibold">(555) 234-5678</p>
                                        </div>
                                    </a>
                                    <a href="mailto:info@example.com" className="flex items-center gap-4 text-lg hover:text-teal-200 transition-colors">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-teal-200">Email us</p>
                                            <p className="font-semibold">smile@brightdental.com</p>
                                        </div>
                                    </a>
                                    <div className="flex items-center gap-4 text-lg">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-teal-200">Hours</p>
                                            <p className="font-semibold">Mon-Fri: 8am-6pm | Sat: 9am-2pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                                    Request an Appointment
                                </h3>
                                <LeadForm source="dentist-booking" buttonText="Request Appointment" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <MarketingFooter />
        </>
    );
}
