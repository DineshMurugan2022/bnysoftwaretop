"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useProductCategories } from "@/hooks/queries/useProductCategories";
import { ProductCategory } from "@/hooks/queries/useProducts";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Must be lowercase alphanumeric and dashes"),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function AdminProductCategories() {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: loading } = useProductCategories();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductCategory | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    }
  });

  const handleOpenModal = (item?: ProductCategory) => {
    if (item) {
      setEditingItem(item);
      reset({
        name: item.name,
        slug: item.slug,
        description: item.description || "",
      });
    } else {
      setEditingItem(null);
      reset({
        name: "", slug: "", description: ""
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (editingItem) {
        await apiFetch(`/api/v1/admin/product-categories/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(data)
        });
      } else {
        await apiFetch("/api/v1/admin/product-categories", {
          method: "POST",
          body: JSON.stringify(data)
        });
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'product-categories'] });
      toast.success(editingItem ? "Category updated successfully" : "Category created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save category");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await apiFetch(`/api/v1/admin/product-categories/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'product-categories'] });
          toast.success("Category deleted successfully");
        } else {
          toast.error("Failed to delete category");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete category");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Product Categories</h1>
          <p className="text-foreground/60 mt-1">Manage categories for your software products.</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {items.length === 0 ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <Plus className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No categories yet</h3>
            <p className="text-foreground/50 max-w-md">
              Start by adding a category to organize your products.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Name</th>
                  <th className="p-4 font-semibold text-foreground/70">Description</th>
                  <th className="p-4 font-semibold text-foreground/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item: any, idx: number) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-background/30 transition-colors"
                  >
                    <td className="p-4 align-top">
                      <div className="font-medium text-foreground text-base mb-1">{item.name}</div>
                      <div className="text-foreground/50 text-xs">{item.slug}</div>
                    </td>
                    <td className="p-4 align-top text-foreground/80">
                      {item.description || "-"}
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
              className="bg-surface border border-border w-full max-w-md rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold">{editingItem ? "Edit Category" : "Add Category"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <input 
                      {...register("name")}
                      onChange={(e) => {
                        register("name").onChange(e);
                        if (!editingItem) {
                          setValue("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                        }
                      }}
                      className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Slug</label>
                    <input 
                      {...register("slug")}
                      className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    />
                    {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea 
                      {...register("description")}
                      className="w-full bg-background border border-border rounded-md p-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors h-24 resize-none"
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface/50 rounded-b-2xl shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium border border-border bg-background rounded-md hover:bg-border/50 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="category-form" className="px-4 py-2 text-sm font-medium bg-brand-accent text-black rounded-md hover:bg-brand-accent/90 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Save Category
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
