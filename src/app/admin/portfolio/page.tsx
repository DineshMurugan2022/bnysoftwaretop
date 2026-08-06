"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Edit2, Trash2, ExternalLink, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { usePortfolio, PortfolioItem as Portfolio } from "@/hooks/queries/usePortfolio";
import { ImageUpload } from "@/components/ui/image-upload";
import toast from "react-hot-toast";

export default function AdminPortfolio() {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: loading } = usePortfolio();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);

  const [formData, setFormData] = useState<Partial<Portfolio>>({
    title: "",
    summary: "",
    description: "",
    techStack: [],
    imageUrl: "",
    liveUrl: "",
    repoUrl: "",
    featured: false,
    customerName: "",
    customerLogo: "",
    industry: "",
    problemStatement: "",
    solutionSummary: "",
    quantifiedResults: [],
    testimonialQuote: "",
    testimonialAuthorName: "",
    testimonialAuthorTitle: ""
  });
  const [techInput, setTechInput] = useState("");
  const [resultInput, setResultInput] = useState("");

  const handleOpenModal = (item?: Portfolio) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: "", summary: "", description: "", techStack: [], imageUrl: "", liveUrl: "", repoUrl: "", featured: false,
        customerName: "", customerLogo: "", industry: "", problemStatement: "", solutionSummary: "", quantifiedResults: [], testimonialQuote: "", testimonialAuthorName: "", testimonialAuthorTitle: ""
      });
    }
    setTechInput("");
    setResultInput("");
    setIsModalOpen(true);
  };

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim() !== '') {
      e.preventDefault();
      setFormData(prev => ({ ...prev, techStack: [...(prev.techStack || []), techInput.trim()] }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setFormData(prev => ({ ...prev, techStack: prev.techStack?.filter(t => t !== techToRemove) }));
  };

  const handleAddResult = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && resultInput.trim() !== '') {
      e.preventDefault();
      setFormData(prev => ({ ...prev, quantifiedResults: [...(prev.quantifiedResults || []), resultInput.trim()] }));
      setResultInput("");
    }
  };

  const handleRemoveResult = (resToRemove: string) => {
    setFormData(prev => ({ ...prev, quantifiedResults: prev.quantifiedResults?.filter(r => r !== resToRemove) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await apiFetch(`/api/v1/portfolio/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(formData)
        });
      } else {
        await apiFetch("/api/v1/portfolio", {
          method: "POST",
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'portfolio'] });
      toast.success(editingItem ? "Project updated successfully" : "Project created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const res = await apiFetch(`/api/v1/portfolio/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'portfolio'] });
          toast.success("Project deleted successfully");
        } else {
          toast.error("Failed to delete project");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete project");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Portfolio Projects</h1>
          <p className="text-foreground/60 mt-1">Manage your public case studies.</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <Plus className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No projects yet</h3>
            <p className="text-foreground/50 max-w-md">
              Showcase your recent success stories by adding a project. They will appear on your public portfolio page.
            </p>
          </div>
        ) : items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-surface border border-border rounded-xl p-6 flex flex-col group relative"
          >
            {item.featured && (
              <div className="absolute top-4 right-4 text-xs font-bold bg-brand-accent/20 text-brand-accent px-2 py-1 rounded">
                Featured
              </div>
            )}
            <h3 className="text-xl font-bold text-foreground mb-2 pr-16">{item.title}</h3>
            <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{item.summary}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {item.techStack.map(tech => (
                <span key={tech} className="px-2 py-1 text-[10px] font-medium bg-background border border-border rounded-md text-foreground/80">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex justify-between items-center pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                {item.liveUrl && (
                  <a href={item.liveUrl} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-brand-accent transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenModal(item)} className="p-2 text-foreground/50 hover:text-foreground bg-background rounded-md transition-colors border border-border">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400/70 hover:text-red-400 bg-red-400/10 rounded-md transition-colors border border-red-500/20">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
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
              className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingItem ? "Edit Project" : "Add Project"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="portfolio-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Title</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                    </div>
                    <div className="space-y-1 flex items-end pb-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="accent-brand-accent w-4 h-4" />
                        Featured Project
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/70">Summary</label>
                    <input type="text" required value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/70">Detailed Description</label>
                    <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none h-32 resize-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/70">Tech Stack (Press Enter to add)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.techStack?.map(tech => (
                        <span key={tech} className="bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                          {tech}
                          <button type="button" onClick={() => handleRemoveTech(tech)}><X className="w-3 h-3 hover:text-red-400" /></button>
                        </span>
                      ))}
                    </div>
                    <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={handleAddTech} placeholder="e.g. Next.js" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Image</label>
                      <ImageUpload value={formData.imageUrl || ''} onChange={url => setFormData({...formData, imageUrl: url})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Live URL</label>
                      <input type="url" value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                    </div>
                  </div>

                  <hr className="border-border my-4" />
                  <h3 className="text-sm font-bold text-foreground">Case Study Details</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Customer Name</label>
                      <input type="text" value={formData.customerName || ''} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Customer Logo</label>
                      <ImageUpload value={formData.customerLogo || ''} onChange={url => setFormData({...formData, customerLogo: url})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Industry</label>
                      <input type="text" value={formData.industry || ''} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/70">Problem Statement</label>
                    <textarea value={formData.problemStatement || ''} onChange={e => setFormData({...formData, problemStatement: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none h-20 resize-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/70">Solution Summary</label>
                    <textarea value={formData.solutionSummary || ''} onChange={e => setFormData({...formData, solutionSummary: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none h-20 resize-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/70">Quantified Results (Press Enter to add)</label>
                    <div className="flex flex-col gap-2 mb-2">
                      {formData.quantifiedResults?.map(res => (
                        <div key={res} className="bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-3 py-2 rounded-md text-xs flex items-center justify-between gap-2">
                          <span>• {res}</span>
                          <button type="button" onClick={() => handleRemoveResult(res)}><X className="w-4 h-4 hover:text-red-400" /></button>
                        </div>
                      ))}
                    </div>
                    <input type="text" value={resultInput} onChange={e => setResultInput(e.target.value)} onKeyDown={handleAddResult} placeholder="e.g. +38% conversion rate" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/70">Testimonial Quote</label>
                    <textarea value={formData.testimonialQuote || ''} onChange={e => setFormData({...formData, testimonialQuote: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none h-20 resize-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Author Name</label>
                      <input type="text" value={formData.testimonialAuthorName || ''} onChange={e => setFormData({...formData, testimonialAuthorName: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Author Title</label>
                      <input type="text" value={formData.testimonialAuthorTitle || ''} onChange={e => setFormData({...formData, testimonialAuthorTitle: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-brand-accent focus:outline-none" />
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface/50">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium border border-border bg-background rounded-md hover:bg-border/50 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="portfolio-form" className="px-4 py-2 text-sm font-medium bg-brand-accent text-black rounded-md hover:bg-brand-accent/90 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
