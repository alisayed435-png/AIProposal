"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
    value: string;
    onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
    return (
        <TabsContext.Provider value={{ value, onValueChange }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            role="tablist"
            className={cn(
                "inline-flex items-center gap-1 rounded-lg bg-neutral-100 p-1",
                className
            )}
        >
            {children}
        </div>
    );
}

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.value === value;

    return (
        <button
            role="tab"
            aria-selected={isActive}
            onClick={() => context.onValueChange(value)}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                isActive
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900",
                className
            )}
        >
            {children}
        </button>
    );
}

interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.value !== value) return null;

    return (
        <div role="tabpanel" className={cn("mt-4", className)}>
            {children}
        </div>
    );
}
