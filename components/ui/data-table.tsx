"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface Column<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    searchKeys?: (keyof T)[];
    emptyMessage?: string;
    className?: string;
    onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    searchable = false,
    searchKeys = [],
    emptyMessage = "No data available",
    className,
    onRowClick,
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };

    const filteredData = React.useMemo(() => {
        let result = [...data];

        // Apply search filter
        if (searchQuery && searchKeys.length > 0) {
            const query = searchQuery.toLowerCase();
            result = result.filter((item) =>
                searchKeys.some((key) => {
                    const value = item[key];
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(query);
                    }
                    return false;
                })
            );
        }

        // Apply sorting
        if (sortKey) {
            result.sort((a, b) => {
                const aValue = a[sortKey as keyof T];
                const bValue = b[sortKey as keyof T];

                if (aValue === bValue) return 0;
                if (aValue === null || aValue === undefined) return 1;
                if (bValue === null || bValue === undefined) return -1;

                const comparison = aValue < bValue ? -1 : 1;
                return sortDirection === "asc" ? comparison : -comparison;
            });
        }

        return result;
    }, [data, searchQuery, searchKeys, sortKey, sortDirection]);

    return (
        <div className={cn("w-full", className)}>
            {searchable && (
                <div className="mb-4 relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            )}

            <div className="rounded-lg border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-200 bg-neutral-50">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={cn(
                                            "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600",
                                            column.sortable && "cursor-pointer select-none hover:text-neutral-900",
                                            column.className
                                        )}
                                        onClick={() => column.sortable && handleSort(String(column.key))}
                                    >
                                        <div className="flex items-center gap-1">
                                            {column.header}
                                            {column.sortable && (
                                                <span className="inline-flex flex-col">
                                                    {sortKey === column.key ? (
                                                        sortDirection === "asc" ? (
                                                            <ChevronUp className="h-3 w-3" />
                                                        ) : (
                                                            <ChevronDown className="h-3 w-3" />
                                                        )
                                                    ) : (
                                                        <ChevronsUpDown className="h-3 w-3 opacity-40" />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 bg-white">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-4 py-8 text-center text-sm text-neutral-500"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        onClick={() => onRowClick?.(item)}
                                        className={cn(
                                            "transition-colors",
                                            onRowClick && "cursor-pointer hover:bg-neutral-50"
                                        )}
                                    >
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className={cn(
                                                    "px-4 py-3 text-sm text-neutral-700",
                                                    column.className
                                                )}
                                            >
                                                {column.render
                                                    ? column.render(item)
                                                    : String(item[column.key as keyof T] ?? "")}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredData.length > 0 && (
                <div className="mt-3 text-xs text-neutral-500">
                    Showing {filteredData.length} of {data.length} results
                </div>
            )}
        </div>
    );
}
