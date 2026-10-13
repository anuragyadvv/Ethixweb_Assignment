"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateLeadStatusAction, deleteLeadAction } from "@/app/actions/admin-leads";
import { Lead, LeadStatus } from "@/types/lead";
import { 
  Shield, 
  LogOut, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  Inbox, 
  X, 
  Building 
} from "lucide-react";

interface AdminDashboardClientProps {
  initialLeads: Lead[];
  adminEmail: string;
}

const statusBadgeStyles: Record<LeadStatus, { label: string; bg: string; text: string; border: string }> = {
  new: { label: "New Lead", bg: "bg-red-950/60", text: "text-red-400", border: "border-red-800/60" },
  contacted: { label: "Contacted", bg: "bg-amber-950/60", text: "text-amber-400", border: "border-amber-800/60" },
  in_discussion: { label: "In Discussion", bg: "bg-blue-950/60", text: "text-blue-400", border: "border-blue-800/60" },
  converted: { label: "Converted", bg: "bg-emerald-950/60", text: "text-emerald-400", border: "border-emerald-800/60" },
  archived: { label: "Archived", bg: "bg-zinc-900", text: "text-zinc-400", border: "border-zinc-800" },
};

export function AdminDashboardClient({ initialLeads, adminEmail }: AdminDashboardClientProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteConfirmLead, setDeleteConfirmLead] = useState<Lead | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    startTransition(async () => {
      const result = await updateLeadStatusAction(leadId, newStatus);
      if (!result.success) {
        showToast(`Failed to update status: ${result.error}`);
        router.refresh();
      } else {
        showToast(`Lead status updated to ${statusBadgeStyles[newStatus].label}`);
      }
    });
  };

  const handleDeleteLead = async (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    setDeleteConfirmLead(null);
    if (selectedLead?.id === leadId) {
      setSelectedLead(null);
    }

    startTransition(async () => {
      const result = await deleteLeadAction(leadId);
      if (!result.success) {
        showToast(`Failed to delete lead: ${result.error}`);
        router.refresh();
      } else {
        showToast("Lead successfully deleted from database.");
      }
    });
  };

  const handleRefresh = () => {
    router.refresh();
    showToast("Refreshing enquiries from Supabase...");
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Name", "Email", "Company", "Phone", "Service Interest", "Budget", "Status", "Created At"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.company.replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${l.service_interest.replace(/"/g, '""')}"`,
      `"${(l.budget_range || "").replace(/"/g, '""')}"`,
      l.status,
      l.created_at,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ethixweb-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      lead.name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      lead.company.toLowerCase().includes(term) ||
      lead.message.toLowerCase().includes(term) ||
      lead.service_interest.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  // Metric counts
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const inDiscussionCount = leads.filter((l) => l.status === "in_discussion" || l.status === "contacted").length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100">
      
      {/* Top Admin Header Bar */}
      <header className="border-b border-brand-border bg-brand-surface/90 sticky top-0 z-40 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-dark border border-brand-border text-brand-red">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-white tracking-wider">
                ETHIX<span className="text-brand-red">WEB</span> ADMIN
              </span>
              <span className="ml-2 rounded bg-brand-red/10 border border-brand-red/30 px-1.5 py-0.5 text-[10px] font-mono text-brand-red uppercase">
                Protected Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-brand-muted bg-brand-dark px-3 py-1.5 rounded-lg border border-brand-border">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>{adminEmail}</span>
            </div>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-dark px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-brand-red/50 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-brand-border bg-brand-surface p-4 shadow-2xl text-xs text-white flex items-center gap-2.5 animate-in slide-in-from-bottom-3">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-brand-border bg-brand-surface p-5">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-muted">Total Enquiries</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-black text-white">{totalCount}</span>
              <Inbox className="h-5 w-5 text-zinc-500" />
            </div>
          </div>

          <div className="rounded-xl border border-brand-red/40 bg-brand-red/5 p-5 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-red font-semibold">New (Pending)</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-black text-brand-red">{newCount}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red animate-ping" />
            </div>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-surface p-5">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-muted">In Pipeline</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-black text-blue-400">{inDiscussionCount}</span>
              <Clock className="h-5 w-5 text-blue-500/60" />
            </div>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-surface p-5">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-muted">Converted Clients</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-black text-emerald-400">{convertedCount}</span>
              <CheckCircle className="h-5 w-5 text-emerald-500/60" />
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-brand-border bg-brand-surface p-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search enquiries by name, company, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-brand-border bg-brand-dark pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
            />
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Filter className="h-3.5 w-3.5" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-brand-border bg-brand-dark px-2.5 py-1.5 text-xs text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red"
              >
                <option value="all">All Statuses ({leads.length})</option>
                <option value="new">New ({newCount})</option>
                <option value="contacted">Contacted</option>
                <option value="in_discussion">In Discussion</option>
                <option value="converted">Converted</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-dark px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-brand-borderHover transition-colors"
              title="Refresh from Supabase"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-dark px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-brand-borderHover transition-colors disabled:opacity-40"
              title="Export to CSV"
            >
              <Download className="h-3.5 w-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Lead Table / List View */}
        <div className="overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-md">
          {filteredLeads.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center px-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark border border-brand-border text-zinc-500 mb-4">
                <Inbox className="h-7 w-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {searchTerm || statusFilter !== "all" ? "No matching enquiries" : "No enquiries yet"}
              </h3>
              <p className="max-w-md mx-auto text-xs text-brand-muted leading-relaxed">
                {searchTerm || statusFilter !== "all"
                  ? "Try clearing your search term or changing the status filter to see other enquiries."
                  : "When prospects submit the enquiry form on your website, their submissions will be safely persisted to your Supabase PostgreSQL database and will appear here in real-time."}
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="mt-4 rounded-lg border border-brand-border bg-brand-dark px-4 py-1.5 text-xs text-white hover:border-brand-red/40"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            /* Data Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs" role="table">
                <thead className="border-b border-brand-border bg-brand-dark/90 font-mono uppercase text-brand-muted">
                  <tr>
                    <th scope="col" className="px-6 py-4">Prospect &amp; Company</th>
                    <th scope="col" className="px-6 py-4">Service Interest</th>
                    <th scope="col" className="px-6 py-4">Budget</th>
                    <th scope="col" className="px-6 py-4">Status Pipeline</th>
                    <th scope="col" className="px-6 py-4">Date (IST)</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60 text-slate-300">
                  {filteredLeads.map((lead) => {
                    const badge = statusBadgeStyles[lead.status] || statusBadgeStyles.new;
                    const dateFormatted = new Date(lead.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                    return (
                      <tr 
                        key={lead.id} 
                        className="hover:bg-brand-elevated/40 transition-colors group cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Prospect & Company */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span className="font-semibold text-white text-sm block group-hover:text-brand-red transition-colors">
                              {lead.name}
                            </span>
                            <div className="flex items-center gap-2 text-zinc-400">
                              <Building className="h-3.5 w-3.5 shrink-0" />
                              <span>{lead.company}</span>
                            </div>
                            <div className="flex items-center gap-2 text-brand-muted">
                              <Mail className="h-3.5 w-3.5 shrink-0" />
                              <span>{lead.email}</span>
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-2 text-brand-subtle">
                                <Phone className="h-3.5 w-3.5 shrink-0" />
                                <span>{lead.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Service Interest */}
                        <td className="px-6 py-4">
                          <span className="font-medium text-slate-200 block">
                            {lead.service_interest.replace(/-/g, " ").toUpperCase()}
                          </span>
                          <span className="text-[11px] text-zinc-500 line-clamp-1 mt-1 max-w-[200px]">
                            {lead.message}
                          </span>
                        </td>

                        {/* Budget */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-zinc-300">
                            {lead.budget_range ? lead.budget_range.replace(/_/g, " ").toUpperCase() : "Flexible"}
                          </span>
                        </td>

                        {/* Status Updater */}
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            <option value="new" className="bg-brand-dark text-white">New Lead</option>
                            <option value="contacted" className="bg-brand-dark text-white">Contacted</option>
                            <option value="in_discussion" className="bg-brand-dark text-white">In Discussion</option>
                            <option value="converted" className="bg-brand-dark text-white">Converted</option>
                            <option value="archived" className="bg-brand-dark text-white">Archived</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-zinc-400">
                          {dateFormatted}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="rounded-lg border border-brand-border bg-brand-dark px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:border-brand-borderHover transition-colors"
                              title="View full enquiry"
                            >
                              Details
                            </button>

                            <button
                              onClick={() => setDeleteConfirmLead(lead)}
                              className="rounded-lg border border-brand-border bg-brand-dark p-1.5 text-zinc-500 hover:text-rose-400 hover:border-rose-900 transition-colors"
                              title="Delete enquiry"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 font-mono text-xs font-semibold ${statusBadgeStyles[selectedLead.status].bg} ${statusBadgeStyles[selectedLead.status].text} ${statusBadgeStyles[selectedLead.status].border}`}>
                  {statusBadgeStyles[selectedLead.status].label}
                </span>
                <span className="font-mono text-xs text-brand-subtle">
                  ID: {selectedLead.id}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{selectedLead.name}</h2>
                <p className="text-sm text-brand-muted mt-1">{selectedLead.company}</p>
              </div>

              {/* Grid info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-brand-border bg-brand-dark p-4 text-xs">
                <div>
                  <span className="font-mono text-brand-subtle uppercase tracking-wider block mb-1">Email:</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-white hover:text-brand-red flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{selectedLead.email}</span>
                  </a>
                </div>

                <div>
                  <span className="font-mono text-brand-subtle uppercase tracking-wider block mb-1">Phone / WhatsApp:</span>
                  {selectedLead.phone ? (
                    <div className="flex items-center gap-3">
                      <a href={`tel:${selectedLead.phone}`} className="text-white hover:text-brand-red flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{selectedLead.phone}</span>
                      </a>
                      <a 
                        href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline text-[11px]"
                      >
                        WhatsApp Chat →
                      </a>
                    </div>
                  ) : (
                    <span className="text-zinc-500">Not provided</span>
                  )}
                </div>

                <div>
                  <span className="font-mono text-brand-subtle uppercase tracking-wider block mb-1">Service Interest:</span>
                  <span className="text-slate-200">{selectedLead.service_interest}</span>
                </div>

                <div>
                  <span className="font-mono text-brand-subtle uppercase tracking-wider block mb-1">Budget Range:</span>
                  <span className="text-slate-200">{selectedLead.budget_range || "Flexible / Unspecified"}</span>
                </div>

                <div>
                  <span className="font-mono text-brand-subtle uppercase tracking-wider block mb-1">Submitted At:</span>
                  <span className="text-slate-200 font-mono">
                    {new Date(selectedLead.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                  </span>
                </div>

                <div>
                  <span className="font-mono text-brand-subtle uppercase tracking-wider block mb-1">Source Page:</span>
                  <span className="text-slate-200">{selectedLead.source_page || "contact"}</span>
                </div>
              </div>

              {/* Full Enquiry Message */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-semibold block mb-2">
                  Project Message
                </span>
                <div className="rounded-xl border border-brand-border bg-brand-dark p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>

              {/* Status change actions */}
              <div className="pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-brand-muted">Update Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    className="rounded-lg border border-brand-border bg-brand-dark px-3 py-1.5 text-xs text-white"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="converted">Converted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${selectedLead.email}?subject=RE: Ethixweb Architecture Enquiry - ${encodeURIComponent(selectedLead.company)}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-4 py-2 text-xs font-semibold text-white hover:bg-brand-redHover transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <button
                    onClick={() => {
                      setDeleteConfirmLead(selectedLead);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-brand-border p-2 text-zinc-500 hover:text-rose-400 hover:border-rose-900 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-rose-900/50 bg-brand-surface p-6 shadow-2xl text-slate-100">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-950/60 border border-rose-800 text-rose-400">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Lead Record?</h3>
                <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                  Are you sure you want to permanently delete the enquiry from <strong>{deleteConfirmLead.name}</strong> ({deleteConfirmLead.company})? 
                  This will remove the record directly from your Supabase PostgreSQL database. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-brand-border">
              <button
                onClick={() => setDeleteConfirmLead(null)}
                className="rounded-lg border border-brand-border bg-brand-dark px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLead(deleteConfirmLead.id)}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/20"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
