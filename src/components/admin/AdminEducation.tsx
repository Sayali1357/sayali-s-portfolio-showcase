import { useState } from "react";
import { useEducation } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";

import { API_BASE } from "@/lib/api";

const AdminEducation = () => {
  const { data: items } = useEducation();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ degree: "", institution: "", years: "", certificate_url: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => { setForm({ degree: "", institution: "", years: "", certificate_url: "" }); setImageFile(null); setEditing(null); };

  const handleAdd = async () => {
    if (!form.degree.trim()) {
      toast.error("Degree is required!");
      return;
    }
    if (!form.institution.trim()) {
      toast.error("Institution is required!");
      return;
    }
    if (!form.years.trim()) {
      toast.error("Years are required!");
      return;
    }
    const formData = new FormData();
    formData.append('degree', form.degree);
    formData.append('institution', form.institution);
    formData.append('years', form.years);
    formData.append('sort_order', String((items?.length || 0) + 1));
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_BASE}/education`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      resetForm();
      toast.success("Education added to MongoDB!");
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "Failed to add education");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    if (!form.degree.trim()) {
      toast.error("Degree is required!");
      return;
    }
    if (!form.institution.trim()) {
      toast.error("Institution is required!");
      return;
    }
    if (!form.years.trim()) {
      toast.error("Years are required!");
      return;
    }
    const formData = new FormData();
    formData.append('degree', form.degree);
    formData.append('institution', form.institution);
    formData.append('years', form.years);
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_BASE}/education/${editing}`, {
      method: 'PUT',
      body: formData
    });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      resetForm();
      toast.success("Education updated in MongoDB!");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_BASE}/education/${id}`, { method: 'DELETE' });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Deleted!");
    }
  };

  const startEdit = (item: any) => {
    setEditing(item._id);
    setForm({ degree: item.degree, institution: item.institution, years: item.years, certificate_url: item.certificate_url || "" });
    setImageFile(null);
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Education (MongoDB)</h2>
      <div className="space-y-3 bg-secondary/30 rounded-lg p-4">
        <input placeholder="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <input placeholder="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <input placeholder="Years (e.g. 2023 - 2027)" value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground font-semibold">Certificate Image (Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>
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
              <span className="text-foreground text-sm font-semibold">{item.degree}</span>
              <span className="text-muted-foreground text-xs ml-2">{item.institution}</span>
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

export default AdminEducation;
