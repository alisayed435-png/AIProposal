"use client";

import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { ...toast, id }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const styles = {
        success: "bg-success-50 border-success-200 text-success-800",
        error: "bg-error-50 border-error-200 text-error-800",
        warning: "bg-warning-50 border-warning-200 text-warning-800",
        info: "bg-brand-50 border-brand-200 text-brand-800",
    };

    const iconStyles = {
        success: "text-success-500",
        error: "text-error-500",
        warning: "text-warning-500",
        info: "text-brand-500",
    };

    const Icon = icons[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={cn(
                "flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg",
                styles[toast.type]
            )}
        >
            <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconStyles[toast.type])} />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{toast.title}</p>
                {toast.description && (
                    <p className="mt-1 text-sm opacity-80">{toast.description}</p>
                )}
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 rounded p-1 opacity-60 transition-opacity hover:opacity-100"
                aria-label="Close notification"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}

// Standalone toast function for convenience
let toastFunction: ((toast: Omit<Toast, "id">) => void) | null = null;

export function setToastFunction(fn: (toast: Omit<Toast, "id">) => void) {
    toastFunction = fn;
}

export function toast(toast: Omit<Toast, "id">) {
    if (toastFunction) {
        toastFunction(toast);
    }
}
