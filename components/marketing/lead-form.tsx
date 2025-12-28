"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

interface LeadFormProps {
    source?: string;
    className?: string;
    buttonText?: string;
    showMessage?: boolean;
}

const businessTypes = [
    { value: "", label: "Select your business type" },
    { value: "plumber", label: "Plumbing" },
    { value: "dentist", label: "Dental Practice" },
    { value: "gym", label: "Gym / Fitness" },
    { value: "restaurant", label: "Restaurant" },
    { value: "retail", label: "Retail Store" },
    { value: "salon", label: "Salon / Spa" },
    { value: "contractor", label: "General Contractor" },
    { value: "other", label: "Other" },
];

export function LeadForm({
    source = "website",
    className,
    buttonText = "Get Started",
    showMessage = true
}: LeadFormProps) {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        businessType: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get UTM parameters from URL
            const params = new URLSearchParams(window.location.search);
            const utmData = {
                utm_source: params.get("utm_source") || source,
                utm_medium: params.get("utm_medium") || null,
                utm_campaign: params.get("utm_campaign") || null,
                utm_term: params.get("utm_term") || null,
                utm_content: params.get("utm_content") || null,
            };

            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    ...utmData,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            addToast({
                type: "success",
                title: "Thank you!",
                description: "We'll be in touch within 24 hours.",
            });

            // Redirect to thank you page
            window.location.href = "/thank-you";
        } catch (error) {
            addToast({
                type: "error",
                title: "Something went wrong",
                description: "Please try again or contact us directly.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            <div className="space-y-4">
                <Input
                    label="Full Name"
                    placeholder="John Smith"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                    type="email"
                    label="Email Address"
                    placeholder="john@business.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Select
                    label="Business Type"
                    options={businessTypes}
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                />

                {showMessage && (
                    <Textarea
                        label="How can we help?"
                        placeholder="Tell us about your business and what you're looking for..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                )}

                <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    loading={loading}
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );
}
