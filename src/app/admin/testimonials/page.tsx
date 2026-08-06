"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useTestimonials, Testimonial } from "@/hooks/queries/useTestimonials";
import { ImageUpload } from "@/components/ui/image-upload";
import toast from "react-hot-toast";

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: loading } = useTestimonials();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    authorName: "",
    authorRole: "",
    authorCompany: "",
    quote: "",
    rating: 5,
    avatarUrl: "",
  });

  const handleOpenModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        authorName: "", authorRole: "", authorCompany: "", quote: "", rating: 5, avatarUrl: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await apiFetch(`/api/v1/testimonials/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(formData)
        });
      } else {
        await apiFetch("/api/v1/testimonials", {
          method: "POST",
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
      toast.success(editingItem ? "Testimonial updated" : "Testimonial created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save testimonial");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const res = await apiFetch(`/api/v1/testimonials/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
          toast.success("Testimonial deleted");
        } else {
          toast.error("Failed to delete testimonial");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete testimonial");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Testimonials</h1>
          <p className="text-foreground/60 mt-1">Manage customer quotes and reviews.</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {items.length === 0 ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <Plus className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No testimonials yet</h3>
            <p className="text-foreground/50 max-w-md">
              Add your first customer review to build trust.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Client</th>
                  <th className="p-4 font-semibold text-foreground/70">Content</th>
                  <th className="p-4 font-semibold text-foreground/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item, idx) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-background/30 transition-colors"
                  >
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-3">
                        {item.avatarUrl ? (
                          <img src={item.avatarUrl} alt={item.authorName} className="w-10 h-10 rounded-full object-cover border border-border" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center border border-border text-xs font-bold text-foreground/50">
                            {(item.authorName || '').substring(0,2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-foreground">{item.authorName}</div>
                          <div className="text-foreground/50 text-xs">{item.authorRole} @ {item.authorCompany}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-foreground/80 max-w-lg line-clamp-2">{item.quote}</p>
                    </td>
                    <td className="p-4 align-top text-right whitespace-nowrap">
                      <button onClick={() => handleOpenModal(item)} className="p-2 text-foreground/50 hover:text-foreground transition-colors mr-2">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400/70 hover:text-red-400 transition-colors">
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold">{editingItem ? "Edit Testimonial" : "Add Testimonial"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Client Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.authorName} 
                        onChange={e => setFormData({...formData, authorName: e.target.value})} 
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Company</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.authorCompany} 
                        onChange={e => setFormData({...formData, authorCompany: e.target.value})} 
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Role</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.authorRole} 
                        onChange={e => setFormData({...formData, authorRole: e.target.value})} 
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Rating (1-5)</label>
                      <input 
                        type="number" 
                        min="1"
                        max="5"
                        required 
                        value={formData.rating} 
                        onChange={e => setFormData({...formData, rating: Number(e.target.value)})} 
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Quote</label>
                    <textarea 
                      required 
                      value={formData.quote} 
                      onChange={e => setFormData({...formData, quote: e.target.value})} 
                      className="w-full bg-background border border-border rounded-md p-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors h-24 resize-none"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Avatar / Headshot</label>
                    <ImageUpload value={formData.avatarUrl || ''} onChange={url => setFormData({...formData, avatarUrl: url})} />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface/50 rounded-b-2xl shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium border border-border bg-background rounded-md hover:bg-border/50 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="testimonial-form" className="px-4 py-2 text-sm font-medium bg-brand-accent text-black rounded-md hover:bg-brand-accent/90 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Save Testimonial
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
