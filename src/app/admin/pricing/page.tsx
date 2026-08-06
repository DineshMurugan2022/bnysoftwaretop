"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { usePricingPlans, PricingPlan } from "@/hooks/queries/usePricingPlans";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const pricingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Must be lowercase alphanumeric and dashes"),
  priceMonthly: z.number().min(0),
  priceYearly: z.number().min(0),
  currency: z.string(),
  isFeatured: z.boolean(),
  displayOrder: z.number().int(),
});

type PricingFormData = z.infer<typeof pricingSchema>;

export default function AdminPricing() {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: loading } = usePricingPlans();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingPlan | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PricingFormData>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      name: "",
      slug: "",
      priceMonthly: 0,
      priceYearly: 0,
      currency: "USD",
      isFeatured: false,
      displayOrder: 0,
    }
  });

  const handleOpenModal = (item?: PricingPlan) => {
    if (item) {
      setEditingItem(item);
      reset({
        name: item.name,
        slug: item.slug,
        priceMonthly: item.priceMonthly,
        priceYearly: item.priceYearly,
        currency: item.currency || "USD",
        isFeatured: item.isFeatured,
        displayOrder: item.displayOrder || 0,
      });
    } else {
      setEditingItem(null);
      reset({ name: "", slug: "", priceMonthly: 0, priceYearly: 0, currency: "USD", isFeatured: false, displayOrder: 0 });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data: PricingFormData) => {
    try {
      if (editingItem) {
        await apiFetch(`/api/v1/admin/pricing-plans/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(data)
        });
      } else {
        await apiFetch("/api/v1/admin/pricing-plans", {
          method: "POST",
          body: JSON.stringify(data)
        });
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'pricing-plans'] });
      toast.success(editingItem ? "Pricing plan updated successfully" : "Pricing plan created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save pricing plan");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this pricing plan?")) {
      try {
        const res = await apiFetch(`/api/v1/admin/pricing-plans/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'pricing-plans'] });
          toast.success("Pricing plan deleted successfully");
        } else {
          toast.error("Failed to delete pricing plan");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete pricing plan");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Pricing Plans</h1>
          <p className="text-foreground/60 mt-1">Manage your subscription tiers.</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Pricing Plan
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {items.length === 0 ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <Plus className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No pricing plans yet</h3>
            <p className="text-foreground/50 max-w-md">
              Start by adding your first subscription tier.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Name</th>
                  <th className="p-4 font-semibold text-foreground/70">Monthly</th>
                  <th className="p-4 font-semibold text-foreground/70">Yearly</th>
                  <th className="p-4 font-semibold text-foreground/70">Featured</th>
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
                      <div className="font-medium text-foreground text-base mb-1">{item.name}</div>
                      <div className="text-foreground/50 text-xs">{item.slug}</div>
                    </td>
                    <td className="p-4 align-top text-foreground/80">${item.priceMonthly}/{item.currency}</td>
                    <td className="p-4 align-top text-foreground/80">${item.priceYearly}/{item.currency}</td>
                    <td className="p-4 align-top">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded ${item.isFeatured ? 'bg-brand-accent/20 text-brand-accent' : 'bg-background text-foreground/50'}`}>
                        {item.isFeatured ? 'FEATURED' : 'STANDARD'}
                      </span>
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
                <h2 className="text-xl font-bold">{editingItem ? "Edit Pricing Plan" : "Add Pricing Plan"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="pricing-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Monthly Price</label>
                      <input 
                        type="number"
                        step="0.01"
                        {...register("priceMonthly", { valueAsNumber: true })}
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Yearly Price</label>
                      <input 
                        type="number"
                        step="0.01"
                        {...register("priceYearly", { valueAsNumber: true })}
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Currency</label>
                      <input 
                        {...register("currency")}
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 pt-8">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          {...register("isFeatured")}
                          className="w-5 h-5 bg-background border border-border rounded text-brand-accent focus:ring-brand-accent"
                        />
                        <span className="text-sm font-medium text-foreground">Featured Plan</span>
                      </label>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Display Order</label>
                      <input 
                        type="number"
                        {...register("displayOrder", { valueAsNumber: true })}
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface/50 rounded-b-2xl shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium border border-border bg-background rounded-md hover:bg-border/50 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="pricing-form" className="px-4 py-2 text-sm font-medium bg-brand-accent text-black rounded-md hover:bg-brand-accent/90 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Save Plan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
