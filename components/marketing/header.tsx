"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
    { name: "Features", href: "/#features" },
];

export function MarketingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/70 backdrop-blur-xl border-b border-neutral-200/50 shadow-sm"
                    : "bg-transparent"
            )}
        >
            <nav className="container-wide flex h-16 items-center justify-between" aria-label="Global">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative flex h-10 w-10 items-center justify-center">
                            {/* Glassmorphic logo container */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 opacity-90" />
                            <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/20 to-transparent" />
                            <Zap className="relative h-5 w-5 text-white drop-shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[17px] font-semibold tracking-tight text-neutral-900 leading-tight">
                                GrowthOS
                            </span>
                            <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                                For Business
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100/80 backdrop-blur-sm text-neutral-600 transition-all hover:bg-neutral-200/80 active:scale-95"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open main menu"
                    >
                        <Menu className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden lg:flex lg:gap-x-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 text-sm font-medium text-neutral-600 rounded-full transition-all hover:text-neutral-900 hover:bg-neutral-100/80"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
                    <Link href="/login">
                        <Button variant="ghost" className="rounded-full">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/login?signup=true">
                        <Button className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg shadow-neutral-900/20">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Mobile menu with AnimatePresence */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Slide-over panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm lg:hidden"
                        >
                            {/* Glassmorphic panel */}
                            <div className="h-full bg-white/90 backdrop-blur-xl shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-200/50">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2.5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="relative flex h-9 w-9 items-center justify-center">
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500" />
                                            <div className="absolute inset-[1px] rounded-[9px] bg-gradient-to-br from-white/20 to-transparent" />
                                            <Zap className="relative h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-lg font-semibold text-neutral-900">GrowthOS</span>
                                    </Link>
                                    <button
                                        type="button"
                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-all hover:bg-neutral-200 active:scale-95"
                                        onClick={() => setMobileMenuOpen(false)}
                                        aria-label="Close menu"
                                    >
                                        <X className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Navigation */}
                                <div className="px-6 py-8">
                                    <nav className="space-y-1">
                                        {navigation.map((item, index) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 + 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center px-4 py-3.5 rounded-2xl text-base font-medium text-neutral-700 transition-all hover:bg-neutral-100 active:scale-[0.98]"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </nav>

                                    {/* CTA Buttons */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-8 space-y-3"
                                    >
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                            <Button variant="outline" size="lg" className="w-full rounded-2xl h-14 text-base">
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link href="/login?signup=true" onClick={() => setMobileMenuOpen(false)}>
                                            <Button
                                                size="lg"
                                                className="w-full rounded-2xl h-14 text-base bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg shadow-neutral-900/20"
                                            >
                                                Get Started Free
                                            </Button>
                                        </Link>
                                    </motion.div>

                                    {/* Footer note */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-8 text-center text-sm text-neutral-500"
                                    >
                                        No credit card required
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
