import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, hint, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={inputId}
                    className={cn(
                        "flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-colors",
                        "placeholder:text-neutral-400",
                        "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
                        "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50",
                        error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    {...props}
                />
                {error && (
                    <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error-600">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-neutral-500">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, hint, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={inputId}
                    className={cn(
                        "flex min-h-[100px] w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-colors",
                        "placeholder:text-neutral-400",
                        "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
                        "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50",
                        error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    {...props}
                />
                {error && (
                    <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error-600">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-neutral-500">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                        {label}
                    </label>
                )}
                <select
                    id={inputId}
                    className={cn(
                        "flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-colors",
                        "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
                        "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50",
                        error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? "true" : "false"}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1.5 text-sm text-error-600">{error}</p>
                )}
            </div>
        );
    }
);
Select.displayName = "Select";

export { Input, Textarea, Select };
