"use client";

import { useState } from "react";
import { Plus, Filter, Download, Mail, Phone, MessageSquare } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { getDemoLeads, updateDemoLead, type Database } from "@/lib/demo-mode";
import { formatDate, formatRelativeTime } from "@/lib/utils";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const statusOptions = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified" },
    { value: "converted", label: "Converted" },
    { value: "lost", label: "Lost" },
];

export default function LeadsPage() {
    const { addToast } = useToast();
    const [leads, setLeads] = useState(getDemoLeads());
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteInput, setNoteInput] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredLeads = statusFilter === "all"
        ? leads
        : leads.filter(l => l.status === statusFilter);

    const handleStatusChange = (leadId: string, newStatus: string) => {
        const updated = updateDemoLead(leadId, { status: newStatus });
        if (updated) {
            setLeads(getDemoLeads());
            addToast({
                type: "success",
                title: "Status updated",
                description: `Lead status changed to ${newStatus}`,
            });
        }
    };

    const handleAddNote = () => {
        if (!selectedLead || !noteInput.trim()) return;

        const existingNotes = selectedLead.notes || "";
        const newNotes = existingNotes
            ? `${existingNotes}\n\n[${new Date().toLocaleDateString()}] ${noteInput}`
            : `[${new Date().toLocaleDateString()}] ${noteInput}`;

        updateDemoLead(selectedLead.id, { notes: newNotes });
        setLeads(getDemoLeads());
        setNoteInput("");
        setSelectedLead({ ...selectedLead, notes: newNotes });

        addToast({
            type: "success",
            title: "Note added",
        });
    };

    const openLeadDetail = (lead: Lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
        setNoteInput("");
    };

    const columns = [
        {
            key: "name" as keyof Lead,
            header: "Name",
            sortable: true,
            render: (lead: Lead) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-medium">
                        {lead.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                        <p className="font-medium text-neutral-900">{lead.name}</p>
                        <p className="text-xs text-neutral-500">{lead.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "business_type" as keyof Lead,
            header: "Business",
            sortable: true,
            render: (lead: Lead) => (
                <span className="capitalize text-neutral-700">{lead.business_type || "—"}</span>
            ),
        },
        {
            key: "utm_source" as keyof Lead,
            header: "Source",
            sortable: true,
            render: (lead: Lead) => (
                <div className="text-sm">
                    <p className="text-neutral-700 capitalize">{lead.utm_source || "Direct"}</p>
                    {lead.utm_campaign && (
                        <p className="text-xs text-neutral-400">{lead.utm_campaign}</p>
                    )}
                </div>
            ),
        },
        {
            key: "status" as keyof Lead,
            header: "Status",
            sortable: true,
            render: (lead: Lead) => (
                <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    onClick={(e) => e.stopPropagation()}
                >
                    {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            key: "created_at" as keyof Lead,
            header: "Received",
            sortable: true,
            render: (lead: Lead) => (
                <span className="text-sm text-neutral-500">{formatRelativeTime(lead.created_at)}</span>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Leads</h1>
                    <p className="mt-1 text-neutral-600">
                        Manage and track your leads from all sources.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">Total Leads</p>
                    <p className="text-2xl font-bold text-neutral-900">{leads.length}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">New</p>
                    <p className="text-2xl font-bold text-brand-600">
                        {leads.filter(l => l.status === "new").length}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">Qualified</p>
                    <p className="text-2xl font-bold text-success-600">
                        {leads.filter(l => l.status === "qualified").length}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">Converted</p>
                    <p className="text-2xl font-bold text-accent-600">
                        {leads.filter(l => l.status === "converted").length}
                    </p>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                    <option value="all">All Statuses</option>
                    {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <DataTable
                data={filteredLeads}
                columns={columns}
                searchable
                searchKeys={["name", "email", "business_type"] as (keyof Lead)[]}
                emptyMessage="No leads found. Start a campaign to capture leads!"
                onRowClick={openLeadDetail}
            />

            {/* Lead Detail Modal */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader onClose={() => setIsModalOpen(false)}>
                    Lead Details
                </ModalHeader>
                {selectedLead && (
                    <ModalBody className="space-y-6">
                        {/* Lead Info */}
                        <div className="flex items-start gap-4">
                            <div className="h-14 w-14 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xl font-semibold">
                                {selectedLead.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900">{selectedLead.name}</h3>
                                <div className="flex items-center gap-4 mt-1 text-sm text-neutral-600">
                                    <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-1 hover:text-brand-600">
                                        <Mail className="h-4 w-4" />
                                        {selectedLead.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge
                                        variant={
                                            selectedLead.status === "new" ? "primary" :
                                                selectedLead.status === "contacted" ? "warning" :
                                                    selectedLead.status === "qualified" ? "success" :
                                                        selectedLead.status === "converted" ? "success" :
                                                            "default"
                                        }
                                        dot
                                    >
                                        {selectedLead.status}
                                    </Badge>
                                    {selectedLead.business_type && (
                                        <Badge variant="outline" className="capitalize">
                                            {selectedLead.business_type}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        {selectedLead.message && (
                            <div>
                                <h4 className="text-sm font-medium text-neutral-700 mb-2">Message</h4>
                                <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-700">
                                    {selectedLead.message}
                                </div>
                            </div>
                        )}

                        {/* Source */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-neutral-500">Source</p>
                                <p className="font-medium capitalize">{selectedLead.utm_source || "Direct"}</p>
                            </div>
                            <div>
                                <p className="text-neutral-500">Campaign</p>
                                <p className="font-medium">{selectedLead.utm_campaign || "—"}</p>
                            </div>
                            <div>
                                <p className="text-neutral-500">Medium</p>
                                <p className="font-medium capitalize">{selectedLead.utm_medium || "—"}</p>
                            </div>
                            <div>
                                <p className="text-neutral-500">Received</p>
                                <p className="font-medium">{formatDate(selectedLead.created_at)}</p>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <h4 className="text-sm font-medium text-neutral-700 mb-2">Notes</h4>
                            {selectedLead.notes ? (
                                <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-700 whitespace-pre-wrap mb-3">
                                    {selectedLead.notes}
                                </div>
                            ) : (
                                <p className="text-sm text-neutral-500 mb-3">No notes yet.</p>
                            )}
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a note..."
                                    value={noteInput}
                                    onChange={(e) => setNoteInput(e.target.value)}
                                    className="flex-1"
                                />
                                <Button onClick={handleAddNote} disabled={!noteInput.trim()}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                )}
                <ModalFooter>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                    <a href={`mailto:${selectedLead?.email}`}>
                        <Button>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                        </Button>
                    </a>
                </ModalFooter>
            </Modal>
        </div>
    );
}
