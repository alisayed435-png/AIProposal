import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        ...options,
    });
}

/**
 * Format a date to a relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(d);
}

/**
 * Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + "...";
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate a random ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse UTM parameters from URL search params
 */
export function parseUtmParams(searchParams: URLSearchParams): {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
} {
    return {
        utm_source: searchParams.get("utm_source") || undefined,
        utm_medium: searchParams.get("utm_medium") || undefined,
        utm_campaign: searchParams.get("utm_campaign") || undefined,
        utm_term: searchParams.get("utm_term") || undefined,
        utm_content: searchParams.get("utm_content") || undefined,
    };
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}

/**
 * Format a number with compact notation (e.g., 1.2K, 3.4M)
 */
export function formatCompact(num: number): string {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
    }).format(num);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Check if we're running on the server
 */
export function isServer(): boolean {
    return typeof window === "undefined";
}

/**
 * Check if we're in demo mode
 */
export function isDemoMode(): boolean {
    if (isServer()) {
        return (
            process.env.FORCE_DEMO_MODE === "true" ||
            !process.env.NEXT_PUBLIC_SUPABASE_URL ||
            !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
    }
    return (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}
