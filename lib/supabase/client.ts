import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a mock client for demo mode
        return null;
    }

    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Singleton for browser client
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseClient() {
    if (typeof window === "undefined") {
        throw new Error("getSupabaseClient should only be called on the client side");
    }

    if (!browserClient) {
        const client = createClient();
        if (client) {
            browserClient = client;
        }
    }

    return browserClient;
}
