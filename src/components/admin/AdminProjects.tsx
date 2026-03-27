import { useState } from "react";
import { useProjects } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";

import { API_BASE } from "@/lib/api";

const AdminProjects = () => {
  const { data: projects } = useProjects();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", emoji: "🚀", description: "", tags: "", color: "bg-primary", link: "", image_url: "", github_url: "", vercel_url: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => { setForm({ title: "", emoji: "🚀", description: "", tags: "", color: "bg-primary", link: "", image_url: "", github_url: "", vercel_url: "" }); setImageFile(null); setEditing(null); };

  const handleAdd = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Description is required!");
      return;
    }
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('emoji', form.emoji);
    formData.append('description', form.description);
    formData.append('color', form.color);
    formData.append('link', form.link);
    formData.append('github_url', form.github_url);
    formData.append('vercel_url', form.vercel_url);
    formData.append('tags', JSON.stringify(tags));
    formData.append('sort_order', String((projects?.length || 0) + 1));
    
    if (imageFile) {
        formData.append('image', imageFile);
    }

    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      resetForm();
      toast.success("Project added to MongoDB!");
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "Failed to add project");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Description is required!");
      return;
    }
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('emoji', form.emoji);
    formData.append('description', form.description);
    formData.append('color', form.color);
    formData.append('link', form.link);
    formData.append('github_url', form.github_url);
    formData.append('vercel_url', form.vercel_url);
    formData.append('tags', JSON.stringify(tags));
    
    if (imageFile) {
        formData.append('image', imageFile);
    }

    const res = await fetch(`${API_BASE}/projects/${editing}`, {
      method: 'PUT',
      body: formData
    });

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      resetForm();
      toast.success("Project updated in MongoDB!");
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error || "Failed to update project");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted from MongoDB!");
    } else {
      toast.error("Failed to delete project");
    }
  };

  const startEdit = (p: any) => {
    if (!p) return;
    setEditing(p._id);
    setForm({
      title: p.title,
      emoji: p.emoji || "🚀",
      description: p.description,
      tags: p.tags?.join(", ") || "",
      color: p.color,
      link: p.link || "",
      image_url: p.image_url || "",
      github_url: p.github_url || "",
      vercel_url: p.vercel_url || ""
    });
    setImageFile(null);
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Projects (MongoDB)</h2>

      <div className="space-y-3 bg-secondary/30 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <input placeholder="Emoji" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
        <input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground font-semibold">Project Image (Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>
        <input placeholder="GitHub URL (optional)" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <input placeholder="Vercel/Live URL (optional)" value={form.vercel_url} onChange={(e) => setForm({ ...form, vercel_url: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <div className="flex gap-2">
          {editing ? (
            <>
              <button onClick={handleUpdate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1"><Save size={14} /> Update</button>
              <button onClick={resetForm} className="px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm flex items-center gap-1"><X size={14} /> Cancel</button>
            </>
          ) : (
            <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1"><Plus size={14} /> Add Project</button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {projects?.map((p: any) => (
          <div key={p._id} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
            <div>
              <span className="mr-2">{p.emoji}</span>
              <span className="text-foreground text-sm font-semibold">{p.title}</span>
              <span className="text-muted-foreground text-xs ml-2">{p.tags?.join(", ")}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-muted-foreground hover:text-primary"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(p._id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
