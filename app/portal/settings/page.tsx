"use client";

import { useState } from "react";
import { Save, Building2, Palette, CreditCard, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { DEMO_SETTINGS, DEMO_SUBSCRIPTION, DEMO_ACCOUNT } from "@/lib/demo-mode";
import { SUBSCRIPTION_TIERS } from "@/lib/stripe";

export default function SettingsPage() {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState("business");
    const [saving, setSaving] = useState(false);

    const [businessSettings, setBusinessSettings] = useState({
        businessName: DEMO_SETTINGS.business_name || "",
        email: "demo@example.com",
        phone: "(555) 123-4567",
        address: "123 Main Street, Austin, TX 78701",
    });

    const [brandSettings, setBrandSettings] = useState({
        primaryColor: DEMO_SETTINGS.primary_color || "#0ea5e9",
        secondaryColor: DEMO_SETTINGS.secondary_color || "#d946ef",
    });

    const handleSave = async () => {
        setSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSaving(false);
        addToast({
            type: "success",
            title: "Settings saved",
            description: "Your changes have been saved successfully.",
        });
    };

    const subscription = DEMO_SUBSCRIPTION;
    const tier = SUBSCRIPTION_TIERS[subscription.tier as keyof typeof SUBSCRIPTION_TIERS];

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
                <p className="mt-1 text-neutral-600">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                    <TabsTrigger value="business">
                        <Building2 className="h-4 w-4 mr-2" />
                        Business
                    </TabsTrigger>
                    <TabsTrigger value="brand">
                        <Palette className="h-4 w-4 mr-2" />
                        Branding
                    </TabsTrigger>
                    <TabsTrigger value="billing">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Billing
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* Business Settings */}
                <TabsContent value="business">
                    <Card>
                        <CardHeader>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>
                                Update your business details that appear on your website and invoices.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                label="Business Name"
                                value={businessSettings.businessName}
                                onChange={(e) => setBusinessSettings({ ...businessSettings, businessName: e.target.value })}
                            />
                            <Input
                                type="email"
                                label="Contact Email"
                                value={businessSettings.email}
                                onChange={(e) => setBusinessSettings({ ...businessSettings, email: e.target.value })}
                            />
                            <Input
                                type="tel"
                                label="Phone Number"
                                value={businessSettings.phone}
                                onChange={(e) => setBusinessSettings({ ...businessSettings, phone: e.target.value })}
                            />
                            <Input
                                label="Business Address"
                                value={businessSettings.address}
                                onChange={(e) => setBusinessSettings({ ...businessSettings, address: e.target.value })}
                            />

                            <div className="pt-4">
                                <Button onClick={handleSave} loading={saving}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Brand Settings */}
                <TabsContent value="brand">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Colors</CardTitle>
                            <CardDescription>
                                Customize the colors used on your website.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Primary Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={brandSettings.primaryColor}
                                            onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                                            className="h-10 w-16 rounded border border-neutral-200 cursor-pointer"
                                        />
                                        <Input
                                            value={brandSettings.primaryColor}
                                            onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Secondary Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={brandSettings.secondaryColor}
                                            onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                                            className="h-10 w-16 rounded border border-neutral-200 cursor-pointer"
                                        />
                                        <Input
                                            value={brandSettings.secondaryColor}
                                            onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Preview
                                </label>
                                <div
                                    className="rounded-lg p-6 text-white"
                                    style={{ background: `linear-gradient(135deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})` }}
                                >
                                    <h3 className="font-bold text-lg">Your Business Name</h3>
                                    <p className="text-white/80 mt-1">This is how your brand colors will look.</p>
                                    <button className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition">
                                        Sample Button
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button onClick={handleSave} loading={saving}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logo Upload Placeholder */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Logo</CardTitle>
                            <CardDescription>
                                Upload your business logo for use on your website.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                                <div className="h-16 w-16 rounded-lg bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="h-8 w-8 text-neutral-400" />
                                </div>
                                <p className="text-sm text-neutral-600">
                                    Drag and drop your logo here, or click to browse
                                </p>
                                <p className="text-xs text-neutral-400 mt-1">
                                    PNG, JPG or SVG, max 2MB
                                </p>
                                <Button variant="outline" size="sm" className="mt-4">
                                    Upload Logo
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Billing Settings */}
                <TabsContent value="billing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>
                                Manage your subscription and billing information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-50">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-neutral-900 capitalize">{tier?.name}</h3>
                                        <Badge variant={subscription.status === "active" ? "success" : "default"}>
                                            {subscription.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-neutral-600 mt-1">
                                        ${tier?.price}/month • Renews on{" "}
                                        {new Date(subscription.current_period_end || "").toLocaleDateString()}
                                    </p>
                                </div>
                                <Button variant="outline">
                                    {subscription.tier === "starter" ? "Upgrade" : "Manage"}
                                </Button>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-medium text-neutral-900 mb-3">Plan Features</h4>
                                <ul className="space-y-2">
                                    {tier?.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                                            <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>
                                Update your payment information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-200">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-14 rounded bg-neutral-100 flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900">•••• •••• •••• 4242</p>
                                        <p className="text-sm text-neutral-500">Expires 12/25</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Update
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>
                                Choose what notifications you receive.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { label: "New lead received", description: "Get notified when someone submits a lead form", enabled: true },
                                { label: "Booking confirmed", description: "Get notified when a booking is confirmed", enabled: true },
                                { label: "Weekly summary", description: "Receive a weekly summary of your activity", enabled: false },
                                { label: "Marketing tips", description: "Receive tips and best practices for growing your business", enabled: false },
                            ].map((notification, index) => (
                                <div key={index} className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="font-medium text-neutral-900">{notification.label}</p>
                                        <p className="text-sm text-neutral-500">{notification.description}</p>
                                    </div>
                                    <label className="relative inline-flex cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked={notification.enabled}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600" />
                                    </label>
                                </div>
                            ))}

                            <div className="pt-4">
                                <Button onClick={handleSave} loading={saving}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Preferences
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
