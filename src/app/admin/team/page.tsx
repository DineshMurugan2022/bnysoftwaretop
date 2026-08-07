"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Edit2, Trash2, X, Check, Image as ImageIcon, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useTeam, TeamMember, saveLocalTeam, getLocalTeam } from "@/hooks/queries/useTeam";
import { ImageUpload } from "@/components/ui/image-upload";
import toast from "react-hot-toast";

const PRESET_IMAGES = [
  { name: "Babu Image", url: "/babu.jpg" },
  { name: "Mani Image", url: "/mani.jpg" },
  { name: "Dinesh Image", url: "/dinesh.jpg" },
  { name: "CEO Default", url: "/images/team/ceo.png" },
  { name: "CTO Default", url: "/images/team/cto.png" },
  { name: "Designer Default", url: "/images/team/designer.png" },
  { name: "Engineer Default", url: "/images/team/engineer.png" },
];

export default function AdminTeam() {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading: loading } = useTeam();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);

  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    bio: "",
    image: "/babu.jpg",
    displayOrder: 1,
  });

  const handleOpenModal = (item?: TeamMember) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        role: "",
        bio: "",
        image: "/babu.jpg",
        displayOrder: (items.length + 1),
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updatedList: TeamMember[] = [];
      const currentList = getLocalTeam();

      if (editingItem) {
        // Try API update
        try {
          await apiFetch(`/api/v1/admin/team/${editingItem.id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
          });
        } catch {
          // Fallback to local
        }
        updatedList = currentList.map((m) =>
          m.id === editingItem.id ? ({ ...m, ...formData } as TeamMember) : m
        );
        toast.success("Team member updated!");
      } else {
        const newId = Date.now();
        const newItem: TeamMember = {
          id: newId,
          name: formData.name || "New Team Member",
          role: formData.role || "Team Member",
          bio: formData.bio || "",
          image: formData.image || "/babu.jpg",
          displayOrder: formData.displayOrder || currentList.length + 1,
        };

        try {
          const res = await apiFetch("/api/v1/admin/team", {
            method: "POST",
            body: JSON.stringify(formData),
          });
          if (res.ok) {
            const created = await res.json();
            newItem.id = created.id || newId;
          }
        } catch {
          // Fallback
        }
        updatedList = [...currentList, newItem];
        toast.success("Team member added!");
      }

      saveLocalTeam(updatedList);
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["team"] });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save team member");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        try {
          await apiFetch(`/api/v1/admin/team/${id}`, { method: "DELETE" });
        } catch {
          // Fallback
        }
        const currentList = getLocalTeam();
        const updatedList = currentList.filter((m) => m.id !== id);
        saveLocalTeam(updatedList);
        queryClient.invalidateQueries({ queryKey: ["team"] });
        toast.success("Team member deleted!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete team member");
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Meet The Team Management</h1>
          <p className="text-foreground/60 mt-1">Manage team members and update team profile images.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-accent text-black px-4 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        {items.length === 0 ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mb-6 border border-border">
              <User className="w-8 h-8 text-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No team members yet</h3>
            <p className="text-foreground/50 max-w-md">
              Add your first team member to display on the website.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/70">Image</th>
                  <th className="p-4 font-semibold text-foreground/70">Member</th>
                  <th className="p-4 font-semibold text-foreground/70">Role</th>
                  <th className="p-4 font-semibold text-foreground/70">Bio</th>
                  <th className="p-4 font-semibold text-foreground/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((member, idx) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-background/30 transition-colors"
                  >
                    {/* Render Image Thumbnail */}
                    <td className="p-4 align-middle">
                      <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-brand-accent/40 bg-black/60 shadow-md relative shrink-0">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-surface-2 text-foreground/50 font-bold text-xs">
                            {member.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle font-bold text-foreground text-base">
                      {member.name}
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-accent/10 text-brand-accent border border-brand-accent/20 uppercase tracking-wider">
                        {member.role}
                      </span>
                    </td>
                    <td className="p-4 align-middle max-w-xs">
                      <p className="text-foreground/70 text-xs line-clamp-2 leading-relaxed">
                        {member.bio || "No bio provided"}
                      </p>
                    </td>
                    <td className="p-4 align-middle text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(member)}
                        className="p-2 text-foreground/70 hover:text-brand-accent transition-colors mr-2 rounded-lg hover:bg-white/5"
                        title="Edit Member"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-red-400/70 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                        title="Delete Member"
                      >
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

      {/* Add / Edit Team Member Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-accent" />
                  {editingItem ? "Edit Team Member" : "Add Team Member"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-foreground/50 hover:text-foreground p-1 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <form id="team-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Member Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Babu"
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Role / Position</label>
                      <input
                        type="text"
                        required
                        value={formData.role || ""}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. CEO & Founder"
                        className="w-full h-11 bg-background border border-border rounded-md px-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Bio / Description</label>
                    <textarea
                      rows={3}
                      value={formData.bio || ""}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Brief background or role summary..."
                      className="w-full bg-background border border-border rounded-md p-4 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors resize-none text-sm"
                    />
                  </div>

                  {/* Team Image Section with Live Preview */}
                  <div className="space-y-3 pt-2 border-t border-border">
                    <label className="text-sm font-medium text-foreground flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-brand-accent" />
                        Team Image
                      </span>
                      <span className="text-xs text-foreground/50">Upload or select existing picture</span>
                    </label>

                    {/* Live Image Preview Component */}
                    <div className="flex items-center gap-4 bg-background/50 border border-border p-4 rounded-xl">
                      <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-brand-accent bg-black/60 relative shrink-0 shadow-md flex items-center justify-center">
                        {formData.image ? (
                          <img
                            src={formData.image}
                            alt="Live Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <User className="w-8 h-8 text-foreground/40" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-brand-accent">Full Image Live Preview</div>
                        <p className="text-xs text-foreground/70 truncate font-mono">{formData.image || "No image selected"}</p>
                        <p className="text-[11px] text-foreground/40">This image will be displayed on the admin panel and public site without flip card restrictions.</p>
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground/70">Quick Preset Images:</label>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_IMAGES.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: preset.url })}
                            className={`px-3 py-1.5 rounded-lg text-xs border transition-all flex items-center gap-2 ${
                              formData.image === preset.url
                                ? "bg-brand-accent text-black font-bold border-brand-accent"
                                : "bg-surface border-border text-foreground/80 hover:bg-white/5"
                            }`}
                          >
                            <img src={preset.url} alt={preset.name} className="w-4 h-4 rounded-full object-cover" />
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Manual Image URL Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Image Path or Direct URL:</label>
                      <input
                        type="text"
                        value={formData.image || ""}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/babu.jpg or /mani.jpg or https://..."
                        className="w-full h-10 bg-background border border-border rounded-md px-3 text-sm text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors font-mono"
                      />
                    </div>

                    {/* Upload File Box */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/70">Or Upload New Image File:</label>
                      <ImageUpload
                        value={formData.image || ""}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface/50 rounded-b-2xl shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium border border-border bg-background rounded-md hover:bg-border/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="team-form"
                  className="px-4 py-2 text-sm font-medium bg-brand-accent text-black rounded-md hover:bg-brand-accent/90 transition-colors flex items-center gap-2 font-bold"
                >
                  <Check className="w-4 h-4" />
                  Save Team Member
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
