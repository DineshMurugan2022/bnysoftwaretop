"use client";

import { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { MonitorPlay, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useDemoRequests } from "@/hooks/queries/useDemoRequests";
import toast from "react-hot-toast";

export default function AdminDemoRequests() {
  const queryClient = useQueryClient();
  const { data: leads = [], isLoading: loading } = useDemoRequests();
  const [filter, setFilter] = useState<string>("ALL");
  const prevLeadsRef = useRef<number[]>([]);
  const [newLeadIds, setNewLeadIds] = useState<number[]>([]);

  useEffect(() => {
    if (leads.length > 0) {
      const prevIds = prevLeadsRef.current;
      if (prevIds.length > 0) {
        const newlyAdded = leads.filter(l => !prevIds.includes(l.id)).map(l => l.id);
        if (newlyAdded.length > 0) {
          setNewLeadIds(prev => [...prev, ...newlyAdded]);
          setTimeout(() => {
            setNewLeadIds(prev => prev.filter(id => !newlyAdded.includes(id)));
          }, 4000); // highlight for 4 seconds
        }
      }
      prevLeadsRef.current = leads.map(l => l.id);
    }
  }, [leads]);

  const updateStatus = async (lead: any, newStatus: string) => {
    try {
      const res = await apiFetch(`/api/v1/admin/demo-requests/${lead.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...lead, status: newStatus })
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'demo-requests'] });
        toast.success("Status updated");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this demo request?")) {
      try {
        const res = await apiFetch(`/api/v1/admin/demo-requests/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'demo-requests'] });
          toast.success("Demo request deleted successfully");
        } else {
          toast.error("Failed to delete demo request");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete demo request");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Demo Requests</h1>
          <p className="text-foreground/60 mt-1">Manage software demonstration requests.</p>
        </div>
        
        <div className="flex bg-surface border border-border rounded-lg p-1">
          {["ALL", "PENDING", "SCHEDULED", "COMPLETED", "CANCELED"].map((f) => (
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
              <MonitorPlay className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No demo requests yet</h3>
            <p className="text-foreground/50 max-w-md">
              When prospects request a demo, their details will appear here for you to schedule.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Prospect</th>
                  <th className="p-4 font-semibold text-foreground/70">Company Info</th>
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
                    className={`transition-all duration-700 border-l-4 ${
                      newLeadIds.includes(lead.id) 
                        ? "border-brand-accent bg-brand-accent/10" 
                        : "border-transparent hover:bg-background/30"
                    }`}
                  >
                    <td className="p-4 align-top">
                      <div className="font-medium text-foreground">{lead.name}</div>
                      <div className="text-foreground/50 text-xs flex items-center gap-1 mt-1">
                        <a href={`mailto:${lead.email}`} className="hover:text-brand-accent transition-colors">{lead.email}</a>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-medium text-foreground">{lead.companyName}</div>
                      <div className="text-foreground/50 text-xs mt-1">{lead.employeeCount}</div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-foreground/80 line-clamp-2 max-w-[250px]">{lead.message}</p>
                    </td>
                    <td className="p-4 align-top whitespace-nowrap text-foreground/60">
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-top">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-md border appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-accent ${
                          lead.status === 'PENDING' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          lead.status === 'SCHEDULED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          lead.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          'bg-foreground/5 text-foreground/50 border-border'
                        }`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELED">Canceled</option>
                      </select>
                    </td>
                    <td className="p-4 align-top text-right">
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
