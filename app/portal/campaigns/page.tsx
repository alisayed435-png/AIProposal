"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Users, MousePointer, Filter, Download, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { getDemoLeads } from "@/lib/demo-mode";
import { formatDate } from "@/lib/utils";

// Simulated campaign data
const campaigns = [
    {
        id: "1",
        name: "Plumber Landing - Google Ads",
        utm_campaign: "plumber-landing",
        utm_source: "google",
        utm_medium: "cpc",
        leads: 12,
        views: 342,
        conversionRate: 3.5,
        status: "active",
        startDate: "2024-12-01",
    },
    {
        id: "2",
        name: "Dental Spring Campaign",
        utm_campaign: "dental-spring",
        utm_source: "facebook",
        utm_medium: "social",
        leads: 8,
        views: 256,
        conversionRate: 3.1,
        status: "active",
        startDate: "2024-12-15",
    },
    {
        id: "3",
        name: "Fitness January Promo",
        utm_campaign: "fitness-january",
        utm_source: "instagram",
        utm_medium: "social",
        leads: 5,
        views: 189,
        conversionRate: 2.6,
        status: "paused",
        startDate: "2024-12-20",
    },
];

export default function CampaignsPage() {
    const leads = getDemoLeads();
    const [dateRange, setDateRange] = useState("30d");

    // Calculate stats
    const totalLeads = leads.length;
    const totalViews = campaigns.reduce((acc, c) => acc + c.views, 0);
    const avgConversion = campaigns.reduce((acc, c) => acc + c.conversionRate, 0) / campaigns.length;

    // Get leads by campaign
    const leadsByCampaign = campaigns.map((campaign) => ({
        ...campaign,
        leads: leads.filter((l) => l.utm_campaign === campaign.utm_campaign).length,
    }));

    // Get leads by source
    const leadsBySource = [
        { source: "Google", count: leads.filter((l) => l.utm_source === "google").length, color: "bg-blue-500" },
        { source: "Facebook", count: leads.filter((l) => l.utm_source === "facebook").length, color: "bg-indigo-500" },
        { source: "Instagram", count: leads.filter((l) => l.utm_source === "instagram").length, color: "bg-pink-500" },
        { source: "Direct", count: leads.filter((l) => !l.utm_source).length, color: "bg-neutral-500" },
    ].filter((s) => s.count > 0);

    const columns = [
        {
            key: "name" as const,
            header: "Campaign",
            sortable: true,
            render: (campaign: typeof campaigns[0]) => (
                <div>
                    <p className="font-medium text-neutral-900">{campaign.name}</p>
                    <p className="text-xs text-neutral-500">
                        {campaign.utm_source} / {campaign.utm_medium}
                    </p>
                </div>
            ),
        },
        {
            key: "status" as const,
            header: "Status",
            sortable: true,
            render: (campaign: typeof campaigns[0]) => (
                <Badge
                    variant={campaign.status === "active" ? "success" : "default"}
                    dot
                >
                    {campaign.status}
                </Badge>
            ),
        },
        {
            key: "views" as const,
            header: "Views",
            sortable: true,
            render: (campaign: typeof campaigns[0]) => (
                <span className="font-medium">{campaign.views.toLocaleString()}</span>
            ),
        },
        {
            key: "leads" as const,
            header: "Leads",
            sortable: true,
            render: (campaign: typeof campaigns[0]) => (
                <span className="font-medium text-brand-600">{campaign.leads}</span>
            ),
        },
        {
            key: "conversionRate" as const,
            header: "Conv. Rate",
            sortable: true,
            render: (campaign: typeof campaigns[0]) => (
                <span className="font-medium">{campaign.conversionRate.toFixed(1)}%</span>
            ),
        },
        {
            key: "startDate" as const,
            header: "Started",
            sortable: true,
            render: (campaign: typeof campaigns[0]) => (
                <span className="text-neutral-500">{formatDate(campaign.startDate)}</span>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Campaigns</h1>
                    <p className="mt-1 text-neutral-600">
                        Track your marketing campaigns and lead sources.
                    </p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Page Views"
                    value={totalViews.toLocaleString()}
                    change={{ value: 18, label: "vs last period" }}
                    icon={MousePointer}
                />
                <StatCard
                    title="Total Leads"
                    value={totalLeads}
                    change={{ value: 12, label: "vs last period" }}
                    icon={Users}
                />
                <StatCard
                    title="Avg. Conversion"
                    value={`${avgConversion.toFixed(1)}%`}
                    change={{ value: 0.5, label: "vs last period" }}
                    icon={TrendingUp}
                />
                <StatCard
                    title="Active Campaigns"
                    value={campaigns.filter((c) => c.status === "active").length}
                    icon={BarChart3}
                />
            </div>

            {/* Leads by Source */}
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Leads by Campaign</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {leadsByCampaign.map((campaign) => (
                                <div key={campaign.id} className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-neutral-700">
                                                {campaign.name}
                                            </span>
                                            <span className="text-sm text-neutral-500">
                                                {campaign.leads} leads
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all"
                                                style={{
                                                    width: `${totalLeads > 0 ? (campaign.leads / totalLeads) * 100 : 0}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Leads by Source</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {leadsBySource.map((source) => (
                                <div key={source.source} className="flex items-center gap-3">
                                    <div className={`h-3 w-3 rounded-full ${source.color}`} />
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-sm text-neutral-700">{source.source}</span>
                                        <span className="text-sm font-medium text-neutral-900">
                                            {source.count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {leadsBySource.length === 0 && (
                                <p className="text-sm text-neutral-500 text-center py-4">
                                    No leads data available
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Campaigns Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={campaigns}
                        columns={columns}
                        searchable
                        searchKeys={["name", "utm_campaign", "utm_source"]}
                        emptyMessage="No campaigns found."
                    />
                </CardContent>
            </Card>
        </div>
    );
}
