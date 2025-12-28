"use client";

import { useState } from "react";
import { Check, Eye, Palette, Layout, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { DEMO_SETTINGS, isDemoMode } from "@/lib/demo-mode";
import { cn } from "@/lib/utils";

const templates = [
    {
        id: "plumber",
        name: "Pro Plumber",
        description: "Professional template for plumbing and home services",
        category: "Home Services",
        color: "from-blue-600 to-blue-800",
        preview: "/landing/plumber",
    },
    {
        id: "dentist",
        name: "Dental Care",
        description: "Clean, modern template for dental practices",
        category: "Healthcare",
        color: "from-teal-500 to-teal-700",
        preview: "/landing/dentist",
    },
    {
        id: "gym",
        name: "FitZone",
        description: "Energetic template for gyms and fitness studios",
        category: "Fitness",
        color: "from-orange-500 to-red-600",
        preview: "/landing/gym",
    },
];

export default function WebsitePage() {
    const { addToast } = useToast();
    const [selectedTemplate, setSelectedTemplate] = useState(DEMO_SETTINGS.selected_template || "plumber");
    const [saving, setSaving] = useState(false);

    const handleSelectTemplate = async (templateId: string) => {
        setSaving(true);

        // Simulate save
        await new Promise((resolve) => setTimeout(resolve, 500));

        setSelectedTemplate(templateId);

        addToast({
            type: "success",
            title: "Template updated",
            description: `Your website now uses the ${templates.find(t => t.id === templateId)?.name} template.`,
        });

        setSaving(false);
    };

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Website</h1>
                    <p className="mt-1 text-neutral-600">
                        Choose and customize your website template.
                    </p>
                </div>
                <a href={templates.find(t => t.id === selectedTemplate)?.preview} target="_blank">
                    <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live Site
                    </Button>
                </a>
            </div>

            {/* Current Template */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Layout className="h-5 w-5" />
                        Current Template
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "h-20 w-32 rounded-lg bg-gradient-to-br",
                            templates.find(t => t.id === selectedTemplate)?.color
                        )} />
                        <div>
                            <h3 className="font-semibold text-neutral-900">
                                {templates.find(t => t.id === selectedTemplate)?.name}
                            </h3>
                            <p className="text-sm text-neutral-600">
                                {templates.find(t => t.id === selectedTemplate)?.description}
                            </p>
                            <Badge variant="primary" className="mt-2">
                                Currently Active
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Template Gallery */}
            <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    Choose a Template
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {templates.map((template) => {
                        const isSelected = selectedTemplate === template.id;
                        return (
                            <div
                                key={template.id}
                                className={cn(
                                    "relative rounded-xl border-2 overflow-hidden transition-all",
                                    isSelected
                                        ? "border-brand-500 shadow-glow"
                                        : "border-neutral-200 hover:border-neutral-300"
                                )}
                            >
                                {/* Selected indicator */}
                                {isSelected && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <div className="h-6 w-6 rounded-full bg-brand-500 flex items-center justify-center">
                                            <Check className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                )}

                                {/* Preview */}
                                <div className={cn("h-40 bg-gradient-to-br", template.color, "p-4")}>
                                    <div className="h-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-2 w-2 rounded-full bg-white/50" />
                                            <div className="h-2 w-2 rounded-full bg-white/50" />
                                            <div className="h-2 w-2 rounded-full bg-white/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-3 w-3/4 rounded bg-white/30" />
                                            <div className="h-2 w-1/2 rounded bg-white/20" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-neutral-900">{template.name}</h3>
                                        <Badge variant="secondary">{template.category}</Badge>
                                    </div>
                                    <p className="text-sm text-neutral-600 mb-4">{template.description}</p>

                                    <div className="flex gap-2">
                                        <a
                                            href={template.preview}
                                            target="_blank"
                                            className="flex-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye className="h-4 w-4 mr-1" />
                                                Preview
                                            </Button>
                                        </a>
                                        <Button
                                            variant={isSelected ? "default" : "outline"}
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleSelectTemplate(template.id)}
                                            disabled={isSelected || saving}
                                        >
                                            {isSelected ? "Selected" : "Use This"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Customization Note */}
            <Card className="bg-brand-50 border-brand-200">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <Palette className="h-6 w-6 text-brand-600 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-neutral-900">Want to customize colors?</h3>
                            <p className="text-sm text-neutral-600 mt-1">
                                Head to <a href="/portal/settings" className="text-brand-600 hover:underline">Settings</a> to
                                update your brand colors, logo, and other customization options.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
