import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        label?: string;
    };
    icon?: LucideIcon;
    className?: string;
}

export function StatCard({ title, value, change, icon: Icon, className }: StatCardProps) {
    const isPositive = change && change.value >= 0;

    return (
        <div
            className={cn(
                "rounded-xl border border-neutral-200 bg-white p-6",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-neutral-500">{title}</p>
                    <p className="mt-2 text-3xl font-semibold text-neutral-900">{value}</p>
                    {change && (
                        <div className="mt-2 flex items-center gap-1">
                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    isPositive ? "text-success-600" : "text-error-600"
                                )}
                            >
                                {isPositive ? "+" : ""}
                                {change.value}%
                            </span>
                            {change.label && (
                                <span className="text-sm text-neutral-500">{change.label}</span>
                            )}
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className="rounded-lg bg-brand-50 p-3">
                        <Icon className="h-6 w-6 text-brand-600" />
                    </div>
                )}
            </div>
        </div>
    );
}

interface StatCardSkeletonProps {
    className?: string;
}

export function StatCardSkeleton({ className }: StatCardSkeletonProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-neutral-200 bg-white p-6 animate-pulse",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-3">
                    <div className="h-4 w-20 rounded bg-neutral-200" />
                    <div className="h-8 w-24 rounded bg-neutral-200" />
                    <div className="h-4 w-16 rounded bg-neutral-200" />
                </div>
                <div className="h-12 w-12 rounded-lg bg-neutral-200" />
            </div>
        </div>
    );
}
