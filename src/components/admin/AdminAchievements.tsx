import { useState } from "react";
import { useAchievements } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";

import { API_BASE } from "@/lib/api";

const AdminAchievements = () => {
  const { data: items } = useAchievements();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", year: "", source: "", credential_url: "", image_url: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => { setForm({ title: "", description: "", year: "", source: "", credential_url: "", image_url: "" }); setImageFile(null); setEditing(null); };

  const handleAdd = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('year', form.year);
    formData.append('source', form.source);
    formData.append('credential_url', form.credential_url);
    formData.append('sort_order', String((items?.length || 0) + 1));
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_BASE}/achievements`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      resetForm();
      toast.success("Achievement added!");
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "Failed to add achievement");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('year', form.year);
    formData.append('source', form.source);
    formData.append('credential_url', form.credential_url);
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_BASE}/achievements/${editing}`, {
      method: 'PUT',
      body: formData
    });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      resetForm();
      toast.success("Achievement updated!");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_BASE}/achievements/${id}`, { method: 'DELETE' });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      toast.success("Deleted!");
    }
  };

  const startEdit = (item: any) => {
    setEditing(item._id);
    setForm({ title: item.title, description: item.description, year: item.year, source: item.source, credential_url: item.credential_url || "", image_url: item.image_url || "" });
    setImageFile(null);
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Certifications & Achievements (MongoDB)</h2>
      <div className="space-y-3 bg-secondary/30 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <input placeholder="Credential URL (Optional)" value={form.credential_url} onChange={(e) => setForm({ ...form, credential_url: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground font-semibold">Certificate Image (Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
        <div className="flex gap-2">
          {editing ? (
            <>
              <button onClick={handleUpdate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1"><Save size={14} /> Update</button>
              <button onClick={resetForm} className="px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm flex items-center gap-1"><X size={14} /> Cancel</button>
            </>
          ) : (
            <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1"><Plus size={14} /> Add</button>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {items?.map((item: any) => (
          <div key={item._id} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
            <div>
              <span className="text-foreground text-sm font-semibold">{item.title}</span>
              <span className="text-muted-foreground text-xs ml-2">{item.source} ({item.year})</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="text-muted-foreground hover:text-primary"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(item._id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAchievements;
