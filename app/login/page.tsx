"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { getSupabaseClient } from "@/lib/supabase/client";
import { isDemoMode } from "@/lib/utils";

function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { addToast } = useToast();

    const isSignup = searchParams.get("signup") === "true";
    const redirect = searchParams.get("redirect") || "/portal";

    const [mode, setMode] = useState<"login" | "signup">(isSignup ? "signup" : "login");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Demo mode - skip auth
            if (isDemoMode()) {
                addToast({
                    type: "info",
                    title: "Demo Mode",
                    description: "Logged in as demo user",
                });
                router.push(redirect);
                return;
            }

            const supabase = getSupabaseClient();
            if (!supabase) {
                // Demo mode fallback
                addToast({
                    type: "info",
                    title: "Demo Mode",
                    description: "Supabase not configured. Proceeding in demo mode.",
                });
                router.push(redirect);
                return;
            }

            if (mode === "signup") {
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        },
                    },
                });

                if (error) throw error;

                addToast({
                    type: "success",
                    title: "Account created!",
                    description: "Check your email to verify your account.",
                });
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });

                if (error) throw error;

                addToast({
                    type: "success",
                    title: "Welcome back!",
                });
                router.push(redirect);
            }
        } catch (err: unknown) {
            const error = err as Error;
            addToast({
                type: "error",
                title: "Authentication failed",
                description: error.message || "Please try again",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = () => {
        addToast({
            type: "info",
            title: "Demo Mode",
            description: "Logged in as demo user",
        });
        router.push(redirect);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Link
                href="/"
                className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-700 mb-8"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to home
            </Link>

            <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-xl text-neutral-900">
                    SmallBiz<span className="text-brand-600">Growth</span>
                </span>
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">
                    {mode === "signup" ? "Create your account" : "Welcome back"}
                </h1>
                <p className="mt-2 text-neutral-600">
                    {mode === "signup"
                        ? "Start your 14-day free trial. No credit card required."
                        : "Sign in to access your dashboard"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                    <Input
                        label="Full Name"
                        placeholder="John Smith"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                )}

                <Input
                    type="email"
                    label="Email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="••••••••"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full" loading={loading}>
                    {mode === "signup" ? "Create Account" : "Sign In"}
                </Button>
            </form>

            {/* Demo mode button */}
            <div className="mt-4">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleDemoLogin}
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Try Demo (No Login Required)
                </Button>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-600">
                {mode === "signup" ? (
                    <>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className="font-medium text-brand-600 hover:underline"
                        >
                            Sign in
                        </button>
                    </>
                ) : (
                    <>
                        Don&apos;t have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setMode("signup")}
                            className="font-medium text-brand-600 hover:underline"
                        >
                            Start free trial
                        </button>
                    </>
                )}
            </p>
        </div>
    );
}

function LoginFormFallback() {
    return (
        <div className="w-full max-w-md mx-auto flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
                <Suspense fallback={<LoginFormFallback />}>
                    <LoginForm />
                </Suspense>
            </div>

            {/* Right side - Branding */}
            <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-brand-600 to-accent-600 p-12 items-center justify-center">
                <div className="max-w-md text-white">
                    <h2 className="text-3xl font-bold">Grow your business online</h2>
                    <p className="mt-4 text-lg text-white/80">
                        Join thousands of small businesses using SmallBiz Growth Platform to
                        capture leads, manage bookings, and scale their online presence.
                    </p>

                    <div className="mt-12 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Lead Capture</h3>
                                <p className="text-white/70">Forms that convert with UTM tracking</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                <Lock className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Secure & Reliable</h3>
                                <p className="text-white/70">Enterprise-grade security built in</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
