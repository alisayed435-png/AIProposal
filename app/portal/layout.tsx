"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Zap,
    LayoutDashboard,
    Users,
    Calendar,
    Globe,
    Bot,
    Settings,
    BarChart3,
    Menu,
    X,
    LogOut,
    Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { isDemoMode, DEMO_PROFILE } from "@/lib/demo-mode";

const navigation = [
    { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
    { name: "Leads", href: "/portal/leads", icon: Users },
    { name: "Bookings", href: "/portal/bookings", icon: Calendar },
    { name: "Campaigns", href: "/portal/campaigns", icon: BarChart3 },
    { name: "Website", href: "/portal/website", icon: Globe },
    { name: "AI Assistant", href: "/portal/ai", icon: Bot, badge: "New" },
    { name: "Settings", href: "/portal/settings", icon: Settings },
];

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const demoMode = isDemoMode();

    const handleLogout = () => {
        // In demo mode, just redirect to home
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Demo Mode Banner */}
            {demoMode && (
                <div className="bg-amber-50 border-b border-amber-200 z-50 relative">
                    <div className="px-4 py-2 text-center text-sm text-amber-800">
                        <Zap className="inline-block h-4 w-4 mr-1" />
                        <strong>Demo Mode:</strong> Running with sample data. Connect Supabase for full functionality.
                    </div>
                </div>
            )}

            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    demoMode && "pt-10"
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-200">
                    <Link href="/portal" className="flex items-center gap-2.5">
                        <div className="relative flex h-9 w-9 items-center justify-center">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500" />
                            <div className="absolute inset-[1px] rounded-[9px] bg-gradient-to-br from-white/20 to-transparent" />
                            <Zap className="relative h-4 w-4 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-semibold text-neutral-900 leading-tight">GrowthOS</span>
                            <span className="text-[9px] font-medium text-neutral-500 uppercase tracking-wider">For Business</span>
                        </div>
                    </Link>
                    <button
                        className="lg:hidden p-1 text-neutral-400 hover:text-neutral-600"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-brand-50 text-brand-700"
                                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                                {item.badge && (
                                    <Badge variant="primary" className="ml-auto text-xs py-0">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout */}
                <div className="border-t border-neutral-200 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-medium">
                            {demoMode ? "DU" : "JD"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                                {demoMode ? DEMO_PROFILE.full_name : "John Doe"}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">
                                {demoMode ? DEMO_PROFILE.email : "john@example.com"}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-neutral-600"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-neutral-200 bg-white px-6">
                    <button
                        className="lg:hidden p-1 text-neutral-600"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex-1" />

                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-neutral-600" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-500" />
                    </Button>
                </header>

                {/* Page content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
