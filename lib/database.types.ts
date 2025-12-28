export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            accounts: {
                Row: {
                    id: string
                    name: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    account_id: string
                    email: string
                    role: string
                    full_name: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    account_id: string
                    email: string
                    role?: string
                    full_name?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    account_id?: string
                    email?: string
                    role?: string
                    full_name?: string | null
                    created_at?: string
                }
            }
            leads: {
                Row: {
                    id: string
                    account_id: string
                    name: string
                    email: string
                    business_type: string | null
                    message: string | null
                    utm_source: string | null
                    utm_medium: string | null
                    utm_campaign: string | null
                    utm_term: string | null
                    utm_content: string | null
                    status: string
                    notes: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    account_id: string
                    name: string
                    email: string
                    business_type?: string | null
                    message?: string | null
                    utm_source?: string | null
                    utm_medium?: string | null
                    utm_campaign?: string | null
                    utm_term?: string | null
                    utm_content?: string | null
                    status?: string
                    notes?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    account_id?: string
                    name?: string
                    email?: string
                    business_type?: string | null
                    message?: string | null
                    utm_source?: string | null
                    utm_medium?: string | null
                    utm_campaign?: string | null
                    utm_term?: string | null
                    utm_content?: string | null
                    status?: string
                    notes?: string | null
                    created_at?: string
                }
            }
            bookings: {
                Row: {
                    id: string
                    account_id: string
                    name: string
                    email: string
                    phone: string | null
                    datetime: string
                    service: string | null
                    notes: string | null
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    account_id: string
                    name: string
                    email: string
                    phone?: string | null
                    datetime: string
                    service?: string | null
                    notes?: string | null
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    account_id?: string
                    name?: string
                    email?: string
                    phone?: string | null
                    datetime?: string
                    service?: string | null
                    notes?: string | null
                    status?: string
                    created_at?: string
                }
            }
            subscriptions: {
                Row: {
                    id: string
                    account_id: string
                    tier: string
                    stripe_customer_id: string | null
                    stripe_subscription_id: string | null
                    status: string
                    current_period_end: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    account_id: string
                    tier: string
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    status?: string
                    current_period_end?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    account_id?: string
                    tier?: string
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    status?: string
                    current_period_end?: string | null
                    created_at?: string
                }
            }
            events: {
                Row: {
                    id: string
                    account_id: string | null
                    event_name: string
                    path: string | null
                    metadata: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    account_id?: string | null
                    event_name: string
                    path?: string | null
                    metadata?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    account_id?: string | null
                    event_name?: string
                    path?: string | null
                    metadata?: Json | null
                    created_at?: string
                }
            }
            account_settings: {
                Row: {
                    id: string
                    account_id: string
                    business_name: string | null
                    logo_url: string | null
                    primary_color: string | null
                    secondary_color: string | null
                    selected_template: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    account_id: string
                    business_name?: string | null
                    logo_url?: string | null
                    primary_color?: string | null
                    secondary_color?: string | null
                    selected_template?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    account_id?: string
                    business_name?: string | null
                    logo_url?: string | null
                    primary_color?: string | null
                    secondary_color?: string | null
                    selected_template?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
