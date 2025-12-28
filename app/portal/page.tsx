import Link from "next/link";
import { Users, Calendar, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDemoLeads, getDemoBookings, DEMO_SUBSCRIPTION, isDemoMode } from "@/lib/demo-mode";
import { formatRelativeTime } from "@/lib/utils";

export default function PortalDashboard() {
    const leads = getDemoLeads();
    const bookings = getDemoBookings();
    const subscription = DEMO_SUBSCRIPTION;

    const newLeads = leads.filter(l => l.status === "new").length;
    const upcomingBookings = bookings.filter(b => new Date(b.datetime) > new Date()).length;
    const conversionRate = leads.length > 0
        ? Math.round((leads.filter(l => l.status === "converted").length / leads.length) * 100)
        : 0;

    const recentLeads = leads.slice(0, 5);
    const recentBookings = bookings.slice(0, 3);

    return (
        <div className="space-y-8">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
                <p className="mt-1 text-neutral-600">
                    Welcome back! Here's what's happening with your business.
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Leads"
                    value={leads.length}
                    change={{ value: 12, label: "vs last month" }}
                    icon={Users}
                />
                <StatCard
                    title="New Leads"
                    value={newLeads}
                    change={{ value: 8, label: "today" }}
                    icon={TrendingUp}
                />
                <StatCard
                    title="Upcoming Bookings"
                    value={upcomingBookings}
                    change={{ value: 5, label: "this week" }}
                    icon={Calendar}
                />
                <StatCard
                    title="Conversion Rate"
                    value={`${conversionRate}%`}
                    change={{ value: 2.5, label: "vs last month" }}
                    icon={BarChart3}
                />
            </div>

            {/* Content grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Leads */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Leads</CardTitle>
                        <Link href="/portal/leads">
                            <Button variant="ghost" size="sm">
                                View all
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {recentLeads.length === 0 ? (
                            <div className="text-center py-8 text-neutral-500">
                                No leads yet. Start a campaign to capture leads!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentLeads.map((lead) => (
                                    <div
                                        key={lead.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-medium">
                                                {lead.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">{lead.name}</p>
                                                <p className="text-sm text-neutral-500">{lead.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                variant={
                                                    lead.status === "new" ? "primary" :
                                                        lead.status === "contacted" ? "warning" :
                                                            lead.status === "qualified" ? "success" :
                                                                lead.status === "converted" ? "success" :
                                                                    "default"
                                                }
                                                dot
                                            >
                                                {lead.status}
                                            </Badge>
                                            <p className="text-xs text-neutral-400 mt-1">
                                                {formatRelativeTime(lead.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Upcoming Bookings */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Upcoming Bookings</CardTitle>
                        <Link href="/portal/bookings">
                            <Button variant="ghost" size="sm">
                                View all
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {recentBookings.length === 0 ? (
                            <div className="text-center py-8 text-neutral-500">
                                No upcoming bookings.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">{booking.name}</p>
                                                <p className="text-sm text-neutral-500">{booking.service}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-neutral-900">
                                                {new Date(booking.datetime).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {new Date(booking.datetime).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Subscription Status */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-neutral-900">Your Plan</h3>
                                <Badge variant="primary" className="capitalize">
                                    {subscription.tier}
                                </Badge>
                            </div>
                            <p className="mt-1 text-sm text-neutral-600">
                                {subscription.status === "active" ? (
                                    <>
                                        <Clock className="inline h-4 w-4 mr-1" />
                                        Renews on{" "}
                                        {new Date(subscription.current_period_end || "").toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </>
                                ) : (
                                    "Upgrade to unlock more features"
                                )}
                            </p>
                        </div>
                        <Link href="/pricing">
                            <Button variant="outline">
                                {subscription.tier === "starter" ? "Upgrade Plan" : "Manage Subscription"}
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
