"use client";

import { apiFetch } from "@/lib/api";
import { Mailbox, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useNewsletter } from "@/hooks/queries/useNewsletter";
import toast from "react-hot-toast";

export default function AdminNewsletter() {
  const queryClient = useQueryClient();
  const { data: subscribers = [], isLoading: loading } = useNewsletter();

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this subscriber?")) {
      try {
        const res = await apiFetch(`/api/v1/admin/newsletter-subscribers/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'newsletter'] });
          toast.success("Subscriber deleted successfully");
        } else {
          toast.error("Failed to delete subscriber");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete subscriber");
      }
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Newsletter Subscribers</h1>
          <p className="text-foreground/60 mt-1">Manage your mailing list subscribers.</p>
        </div>
        <div className="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-medium">
          Total Subscribers: <span className="text-brand-accent">{subscribers.length}</span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <Mailbox className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No subscribers yet</h3>
            <p className="text-foreground/50 max-w-md">
              When visitors subscribe to your newsletter, their emails will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Email Address</th>
                  <th className="p-4 font-semibold text-foreground/70">Subscribed Date</th>
                  <th className="p-4 font-semibold text-foreground/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subscribers.map((subscriber, idx) => (
                  <motion.tr 
                    key={subscriber.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-background/30 transition-colors"
                  >
                    <td className="p-4 align-top">
                      <div className="font-medium text-foreground">{subscriber.email}</div>
                    </td>
                    <td className="p-4 align-top text-foreground/60">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-top text-right">
                      <button onClick={() => handleDelete(subscriber.id)} className="text-foreground/50 hover:text-red-400 transition-colors p-1">
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
