"use client";

import { useState, useMemo, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Edit2, Trash2, X, Check, Image as ImageIcon, List as ListIcon, Info, Upload, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useProducts, Product } from "@/hooks/queries/useProducts";
import { useProductCategories } from "@/hooks/queries/useProductCategories";
import { useProductMedia, useCreateProductMedia, useUpdateProductMedia, useDeleteProductMedia } from "@/hooks/queries/useProductMedia";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Must be lowercase alphanumeric and dashes"),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.number().min(1, "Category is required"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  iconKey: z.string().optional(),
  displayOrder: z.number().int().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: loading } = useProducts();
  const { data: categories = [] } = useProductCategories();
  
  // Modals and tabs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'media' | 'features'>('details');

  // List View State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Media & Features Data
  const { data: productMedia = [], isLoading: mediaLoading } = useProductMedia(editingItem?.id);
  const createMedia = useCreateProductMedia();
  const updateMedia = useUpdateProductMedia();
  const deleteMedia = useDeleteProductMedia();

  const { data: allFeatures = [], refetch: refetchFeatures } = useQuery({
    queryKey: ['admin', 'product-features'],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/product-features");
      const json = await res.json();
      return json.content || json;
    }
  });

  const productFeatures = useMemo(() => allFeatures.filter((f: any) => editingItem && f.productId === editingItem.id), [allFeatures, editingItem]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "", slug: "", shortDescription: "", description: "", categoryId: undefined, status: "DRAFT", iconKey: "", displayOrder: 0,
    }
  });

  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDesc, setFeatureDesc] = useState("");
  
  const [uploading, setUploading] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);

  // List View Filtering
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenModal = (item?: Product) => {
    if (item) {
      setEditingItem(item);
      reset({
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription || "",
        description: item.description || "",
        categoryId: item.category?.id,
        status: item.status as any,
        iconKey: item.iconKey || "",
        displayOrder: item.displayOrder || 0,
      });
    } else {
      setEditingItem(null);
      reset({
        name: "", slug: "", shortDescription: "", description: "", categoryId: undefined, status: "DRAFT", iconKey: "", displayOrder: 0
      });
    }
    setActiveTab('details');
    setIsModalOpen(true);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (editingItem) {
        await apiFetch(`/api/v1/admin/products/${editingItem.id}`, {
          method: "PUT",
          body: JSON.stringify(data)
        });
      } else {
        const res = await apiFetch("/api/v1/admin/products", {
          method: "POST",
          body: JSON.stringify(data)
        });
        const newProduct = await res.json();
        setEditingItem(newProduct);
        toast.success("Product created. You can now add Media and Features.");
        queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
        return;
      }
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success("Product updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await apiFetch(`/api/v1/admin/products/${id}`, { method: "DELETE" });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
          toast.success("Product deleted successfully");
        } else {
          toast.error("Failed to delete product");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete product");
      }
    }
  };

  // Feature Handlers
  const handleAddFeature = async () => {
    if (!editingItem || !featureTitle) return;
    try {
      await apiFetch("/api/v1/admin/product-features", {
        method: "POST",
        body: JSON.stringify({
          productId: editingItem.id,
          title: featureTitle,
          description: featureDesc,
          displayOrder: productFeatures.length
        })
      });
      setFeatureTitle("");
      setFeatureDesc("");
      refetchFeatures();
      toast.success("Feature added");
    } catch (err) {
      toast.error("Failed to add feature");
    }
  };

  const handleDeleteFeature = async (id: number) => {
    if (confirm("Delete this feature?")) {
      await apiFetch(`/api/v1/admin/product-features/${id}`, { method: "DELETE" });
      refetchFeatures();
      toast.success("Feature deleted");
    }
  };

  // Media Handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingItem || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    
    // Client-side validation matching backend constraints
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, WEBP, GIF, and SVG are allowed.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadRes = await fetch("/api/v1/media/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}` // Need to pass token if protected
        },
        body: formData
      });
      
      if (!uploadRes.ok) throw new Error("Upload failed");
      const filename = await uploadRes.text();

      const nextOrder = productMedia.length > 0 
        ? Math.max(...productMedia.map(m => m.displayOrder || 0)) + 1 
        : 0;

      await createMedia.mutateAsync({
        productId: editingItem.id,
        mediaType: "IMAGE",
        url: `/uploads/${filename}`,
        altText: file.name,
        displayOrder: nextOrder
      });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (e.target) e.target.value = ''; // Reset input
    }
  };

  const handleDeleteMedia = async (id: number) => {
    if (confirm("Delete this media?")) {
      try {
        setProcessingId(id);
        await deleteMedia.mutateAsync(id);
        toast.success("Media deleted");
      } catch (err) {
        toast.error("Failed to delete media");
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleMoveMedia = async (currentIndex: number, direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === productMedia.length - 1) return;

    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const item1 = productMedia[currentIndex];
    const item2 = productMedia[swapIndex];

    try {
      setProcessingId(item1.id);
      
      // Swap their orders
      const order1 = item1.displayOrder;
      const order2 = item2.displayOrder;
      
      await Promise.all([
        updateMedia.mutateAsync({ id: item1.id, productId: item1.productId, displayOrder: order2 }),
        updateMedia.mutateAsync({ id: item2.id, productId: item2.productId, displayOrder: order1 })
      ]);
    } catch (err) {
      toast.error("Failed to reorder images");
    } finally {
      setProcessingId(null);
    }
  };

  const handleAltTextChange = async (id: number, productId: number, newAltText: string) => {
    try {
      await updateMedia.mutateAsync({ id, productId, altText: newAltText });
      toast.success("Alt text saved");
    } catch (err) {
      toast.error("Failed to save alt text");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-foreground/60 mt-1">Manage your software product portfolio.</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 h-10 bg-surface border border-border rounded-md px-3 text-sm focus:border-brand-accent outline-none"
        />
        <select 
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 h-10 bg-surface border border-border rounded-md px-3 text-sm focus:border-brand-accent outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {currentItems.length === 0 ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-foreground/50">Adjust your search or filters to see more results.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Name</th>
                  <th className="p-4 font-semibold text-foreground/70">Category</th>
                  <th className="p-4 font-semibold text-foreground/70">Status</th>
                  <th className="p-4 font-semibold text-foreground/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentItems.map((item, idx) => (
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
                      {item.category?.name || "Uncategorized"}
                    </td>
                    <td className="p-4 align-top">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded ${item.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {item.status}
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
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                currentPage === i + 1 ? 'bg-brand-accent text-black' : 'bg-surface border border-border hover:bg-border'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

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
                <h2 className="text-xl font-bold">{editingItem ? "Edit Product" : "Add Product"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border px-6 mt-4 gap-6 shrink-0">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'details' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-foreground/60 hover:text-foreground'}`}
                >
                  <Info className="w-4 h-4" /> Details
                </button>
                <button 
                  onClick={() => setActiveTab('media')}
                  disabled={!editingItem}
                  className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'media' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-foreground/60 hover:text-foreground'} disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <ImageIcon className="w-4 h-4" /> Media
                </button>
                <button 
                  onClick={() => setActiveTab('features')}
                  disabled={!editingItem}
                  className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'features' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-foreground/60 hover:text-foreground'} disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <ListIcon className="w-4 h-4" /> Features
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                {activeTab === 'details' && (
                  <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Category</label>
                        <select 
                          {...register("categoryId", { valueAsNumber: true })}
                          className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Status</label>
                        <select 
                          {...register("status")}
                          className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                        >
                          <option value="DRAFT">Draft</option>
                          <option value="PUBLISHED">Published</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Icon Key (Lucide)</label>
                        <input 
                          {...register("iconKey")}
                          className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                        />
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

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Short Description</label>
                      <textarea 
                        {...register("shortDescription")}
                        className="w-full bg-background border border-border rounded-md p-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors h-20 resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Detailed Description</label>
                      <textarea 
                        {...register("description")}
                        className="w-full bg-background border border-border rounded-md p-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors h-32 resize-none"
                      />
                    </div>
                  </form>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <label className={`flex items-center gap-2 bg-brand-accent text-black hover:bg-brand-accent/90 px-4 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                        {uploading ? (
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        {uploading ? "Uploading..." : "Upload Image"}
                        <input type="file" className="hidden" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" onChange={handleFileUpload} disabled={uploading} />
                      </label>
                      <p className="text-xs text-foreground/50">Supported formats: JPG, PNG, WEBP, GIF, SVG.</p>
                    </div>

                    {mediaLoading ? (
                      <div className="flex justify-center p-10">
                        <div className="w-6 h-6 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : productMedia.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-border rounded-lg text-foreground/50 text-sm">
                        No media uploaded yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productMedia.map((m: any, index: number) => {
                          const isProcessing = processingId === m.id;
                          return (
                            <div key={m.id} className="relative group rounded-lg border border-border bg-surface p-3 flex flex-col gap-3">
                              {/* Loading Overlay */}
                              {isProcessing && (
                                <div className="absolute inset-0 bg-background/80 z-20 flex items-center justify-center rounded-lg backdrop-blur-sm">
                                  <div className="w-6 h-6 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}

                              <div className="relative aspect-video rounded-md overflow-hidden bg-background">
                                <img src={m.url} alt={m.altText} className="w-full h-full object-cover" />
                                {index === 0 && (
                                  <span className="absolute top-2 left-2 bg-brand-accent text-black text-[10px] font-bold px-2 py-1 rounded">Primary</span>
                                )}
                              </div>
                              
                              <div className="flex-1 flex flex-col gap-2">
                                <input 
                                  defaultValue={m.altText || ""}
                                  placeholder="Alt text"
                                  onBlur={(e) => {
                                    if (e.target.value !== m.altText) {
                                      handleAltTextChange(m.id, m.productId, e.target.value);
                                    }
                                  }}
                                  className="w-full h-8 bg-background border border-border rounded-md px-2 text-xs focus:outline-none focus:border-brand-accent transition-colors"
                                />
                                
                                <div className="flex justify-between items-center mt-1">
                                  <div className="flex gap-1">
                                    <button 
                                      onClick={() => handleMoveMedia(index, 'up')}
                                      disabled={index === 0}
                                      className="p-1.5 bg-background border border-border rounded text-foreground/70 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                      title="Move Up"
                                    >
                                      <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <button 
                                      onClick={() => handleMoveMedia(index, 'down')}
                                      disabled={index === productMedia.length - 1}
                                      className="p-1.5 bg-background border border-border rounded text-foreground/70 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                      title="Move Down"
                                    >
                                      <ArrowDown className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <button 
                                    onClick={() => handleDeleteMedia(m.id)} 
                                    className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-2">
                        <input 
                          value={featureTitle}
                          onChange={e => setFeatureTitle(e.target.value)}
                          placeholder="Feature Title"
                          className="w-full h-10 bg-background border border-border rounded-md px-3 text-sm focus:border-brand-accent outline-none"
                        />
                        <input 
                          value={featureDesc}
                          onChange={e => setFeatureDesc(e.target.value)}
                          placeholder="Short description (optional)"
                          className="w-full h-10 bg-background border border-border rounded-md px-3 text-sm focus:border-brand-accent outline-none"
                        />
                      </div>
                      <button 
                        onClick={handleAddFeature}
                        disabled={!featureTitle}
                        className="bg-brand-accent text-black px-4 rounded-md font-medium text-sm disabled:opacity-50 h-10"
                      >
                        Add
                      </button>
                    </div>

                    <div className="space-y-2">
                      {productFeatures.length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-border rounded-lg text-foreground/50 text-sm">
                          No features added yet.
                        </div>
                      ) : (
                        productFeatures.map((f: any) => (
                          <div key={f.id} className="flex justify-between items-start bg-background border border-border p-3 rounded-lg">
                            <div>
                              <h4 className="font-medium text-sm">{f.title}</h4>
                              {f.description && <p className="text-xs text-foreground/70 mt-1">{f.description}</p>}
                            </div>
                            <button onClick={() => handleDeleteFeature(f.id)} className="text-red-400 hover:text-red-500 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-border flex justify-between items-center bg-surface/50 rounded-b-2xl shrink-0">
                <div className="text-xs text-foreground/50">
                  {activeTab !== 'details' && "Changes in Media/Features save automatically."}
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium border border-border bg-background rounded-md hover:bg-border/50 transition-colors">
                    Close
                  </button>
                  {activeTab === 'details' && (
                    <button type="submit" form="product-form" className="px-4 py-2 text-sm font-medium bg-brand-accent text-black rounded-md hover:bg-brand-accent/90 transition-colors flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Save Details
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
