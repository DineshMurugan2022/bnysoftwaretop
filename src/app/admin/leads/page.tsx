"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Mail, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useLeads } from "@/hooks/queries/useLeads";
import toast from "react-hot-toast";

export default function AdminLeads() {
  const queryClient = useQueryClient();
  const { data: leads = [], isLoading: loading } = useLeads();
  const [filter, setFilter] = useState<string>("ALL");

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await apiFetch(`/api/v1/leads/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'leads'] });
        toast.success("Status updated");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await apiFetch(`/api/v1/leads/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'leads'] });
          toast.success("Lead deleted successfully");
        } else {
          toast.error("Failed to delete lead");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete lead");
      }
    }
  };

  const filteredLeads = filter === "ALL" ? leads : leads.filter(l => l.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Leads</h1>
          <p className="text-foreground/60 mt-1">Manage contact submissions and inquiries.</p>
        </div>
        
        <div className="flex bg-surface border border-border rounded-lg p-1">
          {["ALL", "NEW", "CONTACTED", "CONVERTED", "DISMISSED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f 
                  ? "bg-foreground text-background" 
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <Mail className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No leads yet</h3>
            <p className="text-foreground/50 max-w-md">
              When visitors submit the contact form or request a demo, their inquiries will appear here for you to manage.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Name</th>
                  <th className="p-4 font-semibold text-foreground/70">Message</th>
                  <th className="p-4 font-semibold text-foreground/70">Date</th>
                  <th className="p-4 font-semibold text-foreground/70">Status</th>
                  <th className="p-4 font-semibold text-foreground/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead, idx) => (
                  <motion.tr 
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-background/30 transition-colors"
                  >
                    <td className="p-4 align-top">
                      <div className="font-medium text-foreground">{lead.name}</div>
                      <div className="text-foreground/50 text-xs flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${lead.email}`} className="hover:text-brand-accent transition-colors">{lead.email}</a>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-foreground/80 line-clamp-2 max-w-md">{lead.message}</p>
                    </td>
                    <td className="p-4 align-top whitespace-nowrap text-foreground/60">
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-top">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-md border appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-accent ${
                          lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          lead.status === 'CONVERTED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          'bg-foreground/5 text-foreground/50 border-border'
                        }`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CONVERTED">Converted</option>
                        <option value="DISMISSED">Dismissed</option>
                      </select>
                    </td>
                    <td className="p-4 align-top text-right">
                      {/* Optional: Add a delete button or view details button */}
                      <button onClick={() => handleDelete(lead.id)} className="text-foreground/50 hover:text-red-400 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
