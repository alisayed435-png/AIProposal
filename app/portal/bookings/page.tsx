"use client";

import { useState } from "react";
import { Plus, Calendar, Clock, User, Mail, Phone, Trash2, CheckCircle, X } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import {
    getDemoBookings,
    addDemoBooking,
    updateDemoBooking,
    deleteDemoBooking,
    DEMO_ACCOUNT,
    type Database
} from "@/lib/demo-mode";
import { formatDate } from "@/lib/utils";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
];

const serviceOptions = [
    { value: "", label: "Select service" },
    { value: "Consultation Call", label: "Consultation Call" },
    { value: "Demo Walkthrough", label: "Demo Walkthrough" },
    { value: "Onboarding Session", label: "Onboarding Session" },
    { value: "Support Call", label: "Support Call" },
];

const initialFormData = {
    name: "",
    email: "",
    phone: "",
    datetime: "",
    service: "",
    notes: "",
};

export default function BookingsPage() {
    const { addToast } = useToast();
    const [bookings, setBookings] = useState(getDemoBookings());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [formData, setFormData] = useState(initialFormData);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredBookings = statusFilter === "all"
        ? bookings
        : bookings.filter(b => b.status === statusFilter);

    const upcomingCount = bookings.filter(b =>
        new Date(b.datetime) > new Date() && b.status !== "cancelled"
    ).length;

    const openCreateModal = () => {
        setEditingBooking(null);
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const openEditModal = (booking: Booking) => {
        setEditingBooking(booking);
        setFormData({
            name: booking.name,
            email: booking.email,
            phone: booking.phone || "",
            datetime: new Date(booking.datetime).toISOString().slice(0, 16),
            service: booking.service || "",
            notes: booking.notes || "",
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingBooking) {
            updateDemoBooking(editingBooking.id, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone || null,
                datetime: new Date(formData.datetime).toISOString(),
                service: formData.service || null,
                notes: formData.notes || null,
            });
            addToast({ type: "success", title: "Booking updated" });
        } else {
            addDemoBooking({
                account_id: DEMO_ACCOUNT.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone || null,
                datetime: new Date(formData.datetime).toISOString(),
                service: formData.service || null,
                notes: formData.notes || null,
                status: "pending",
            });
            addToast({ type: "success", title: "Booking created" });
        }

        setBookings(getDemoBookings());
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this booking?")) {
            deleteDemoBooking(id);
            setBookings(getDemoBookings());
            addToast({ type: "success", title: "Booking deleted" });
        }
    };

    const handleStatusChange = (id: string, status: string) => {
        updateDemoBooking(id, { status });
        setBookings(getDemoBookings());
        addToast({ type: "success", title: "Status updated" });
    };

    const columns = [
        {
            key: "name" as keyof Booking,
            header: "Customer",
            sortable: true,
            render: (booking: Booking) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-medium">
                        {booking.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                        <p className="font-medium text-neutral-900">{booking.name}</p>
                        <p className="text-xs text-neutral-500">{booking.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "service" as keyof Booking,
            header: "Service",
            sortable: true,
            render: (booking: Booking) => (
                <span className="text-neutral-700">{booking.service || "—"}</span>
            ),
        },
        {
            key: "datetime" as keyof Booking,
            header: "Date & Time",
            sortable: true,
            render: (booking: Booking) => {
                const date = new Date(booking.datetime);
                const isPast = date < new Date();
                return (
                    <div className={isPast ? "text-neutral-400" : "text-neutral-700"}>
                        <p className="font-medium">
                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        <p className="text-xs">
                            {date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                        </p>
                    </div>
                );
            },
        },
        {
            key: "status" as keyof Booking,
            header: "Status",
            sortable: true,
            render: (booking: Booking) => (
                <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
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
            key: "actions" as keyof Booking,
            header: "",
            render: (booking: Booking) => (
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(booking);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(booking.id);
                        }}
                        className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Bookings</h1>
                    <p className="mt-1 text-neutral-600">
                        Manage appointments and consultations.
                    </p>
                </div>
                <Button onClick={openCreateModal}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Booking
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">Total Bookings</p>
                    <p className="text-2xl font-bold text-neutral-900">{bookings.length}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">Upcoming</p>
                    <p className="text-2xl font-bold text-brand-600">{upcomingCount}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">Confirmed</p>
                    <p className="text-2xl font-bold text-success-600">
                        {bookings.filter(b => b.status === "confirmed").length}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-neutral-500">Completed</p>
                    <p className="text-2xl font-bold text-neutral-600">
                        {bookings.filter(b => b.status === "completed").length}
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
                data={filteredBookings}
                columns={columns}
                searchable
                searchKeys={["name", "email", "service"] as (keyof Booking)[]}
                emptyMessage="No bookings yet. Create your first booking!"
                onRowClick={openEditModal}
            />

            {/* Create/Edit Modal */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader onClose={() => setIsModalOpen(false)}>
                    {editingBooking ? "Edit Booking" : "New Booking"}
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody className="space-y-4">
                        <Input
                            label="Customer Name"
                            placeholder="John Smith"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            type="email"
                            label="Email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            type="tel"
                            label="Phone"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <Input
                            type="datetime-local"
                            label="Date & Time"
                            required
                            value={formData.datetime}
                            onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                        />
                        <Select
                            label="Service"
                            options={serviceOptions}
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        />
                        <Textarea
                            label="Notes"
                            placeholder="Any additional notes..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {editingBooking ? "Save Changes" : "Create Booking"}
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}
