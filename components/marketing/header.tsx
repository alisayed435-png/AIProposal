"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
    { name: "Features", href: "/#features" },
];

export function MarketingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 glass border-b border-neutral-200/50">
            <nav className="container-wide flex h-16 items-center justify-between" aria-label="Global">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-semibold text-lg text-neutral-900">
                            SmallBiz<span className="text-brand-600">Growth</span>
                        </span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open main menu"
                    >
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                    <Link href="/login">
                        <Button variant="ghost">Log in</Button>
                    </Link>
                    <Link href="/login?signup=true">
                        <Button variant="gradient">Start Free Trial</Button>
                    </Link>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={cn(
                    "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
                    mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Sidebar */}
                <div
                    className={cn(
                        "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-xl transition-transform duration-300",
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg text-neutral-900">
                                SmallBiz<span className="text-brand-600">Growth</span>
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-neutral-700"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-neutral-200">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6 space-y-3">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/login?signup=true" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="gradient" className="w-full">
                                        Start Free Trial
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
