"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Edit2, Trash2, X, Check, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useBlog, BlogPost } from "@/hooks/queries/useBlog";
import { ImageUpload } from "@/components/ui/image-upload";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminBlog() {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: loading } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    featuredImageUrl: "",
    published: false,
  });

  const handleOpenModal = (item?: BlogPost) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: "", slug: "", excerpt: "", content: "", author: "", featuredImageUrl: "", published: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await apiFetch(`/api/v1/blog-posts/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(formData)
        });
      } else {
        await apiFetch("/api/v1/blog-posts", {
          method: "POST",
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      toast.success(editingItem ? "Post updated successfully" : "Post created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save post");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await apiFetch(`/api/v1/blog-posts/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
          toast.success("Post deleted successfully");
        } else {
          toast.error("Failed to delete post");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete post");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog Posts</h1>
          <p className="text-foreground/60 mt-1">Manage your resources and articles.</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Post
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {items.length === 0 ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <Plus className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No posts yet</h3>
            <p className="text-foreground/50 max-w-md">
              Start writing to engage your audience.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Title</th>
                  <th className="p-4 font-semibold text-foreground/70">Author</th>
                  <th className="p-4 font-semibold text-foreground/70">Status</th>
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
                      <div className="font-medium text-foreground text-base mb-1">{item.title}</div>
                      <div className="text-foreground/50 text-xs">{item.slug}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-foreground/80">{item.author}</div>
                    </td>
                    <td className="p-4 align-top">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded ${item.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 align-top text-right whitespace-nowrap">
                      <Link href={`/resources/${item.slug}`} target="_blank" className="inline-block p-2 text-foreground/50 hover:text-brand-accent transition-colors mr-2">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
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
              className="bg-surface border border-border w-full max-w-4xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold">{editingItem ? "Edit Post" : "Add Post"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="blog-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Title</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.title} 
                        onChange={e => {
                          const title = e.target.value;
                          setFormData({...formData, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})
                        }} 
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Slug</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.slug} 
                        onChange={e => setFormData({...formData, slug: e.target.value})} 
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Author</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.author} 
                        onChange={e => setFormData({...formData, author: e.target.value})} 
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1 flex items-center pt-6">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="accent-brand-accent w-4 h-4" />
                        Published
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Excerpt</label>
                    <textarea 
                      required 
                      value={formData.excerpt} 
                      onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                      className="w-full bg-background border border-border rounded-md p-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors h-24 resize-none"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Featured Image</label>
                    <ImageUpload value={formData.featuredImageUrl || ''} onChange={url => setFormData({...formData, featuredImageUrl: url})} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Content (Markdown)</label>
                    <textarea 
                      required 
                      value={formData.content} 
                      onChange={e => setFormData({...formData, content: e.target.value})} 
                      className="w-full bg-background border border-border rounded-md p-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors h-64 font-mono text-sm"
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface/50 rounded-b-2xl shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium border border-border bg-background rounded-md hover:bg-border/50 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="blog-form" className="px-4 py-2 text-sm font-medium bg-brand-accent text-black rounded-md hover:bg-brand-accent/90 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Save Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
