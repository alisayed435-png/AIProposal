"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        aria-hidden="true"
                    />
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            className={cn(
                                "relative w-full max-w-lg rounded-xl bg-white shadow-xl",
                                className
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export function ModalHeader({
    children,
    className,
    onClose,
}: {
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
}) {
    return (
        <div
            className={cn(
                "flex items-center justify-between border-b border-neutral-200 px-6 py-4",
                className
            )}
        >
            <h2 className="text-lg font-semibold text-neutral-900">{children}</h2>
            {onClose && (
                <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}

export function ModalBody({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("p-6", className)}>{children}</div>;
}

export function ModalFooter({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex items-center justify-end gap-3 border-t border-neutral-200 px-6 py-4",
                className
            )}
        >
            {children}
        </div>
    );
}
