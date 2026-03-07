import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProjects } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";

const AdminProjects = () => {
  const { data: projects } = useProjects();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", emoji: "🚀", description: "", tags: "", color: "bg-primary", link: "" });

  const resetForm = () => { setForm({ title: "", emoji: "🚀", description: "", tags: "", color: "bg-primary", link: "" }); setEditing(null); };

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const { error } = await supabase.from("projects").insert({ title: form.title, emoji: form.emoji, description: form.description, tags, color: form.color, link: form.link || null, sort_order: (projects?.length || 0) + 1 });
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    resetForm();
    toast.success("Project added!");
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const { error } = await supabase.from("projects").update({ title: form.title, emoji: form.emoji, description: form.description, tags, color: form.color, link: form.link || null }).eq("id", editing);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    resetForm();
    toast.success("Project updated!");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    toast.success("Project deleted!");
  };

  const startEdit = (p: typeof projects extends (infer T)[] | undefined ? T : never) => {
    if (!p) return;
    setEditing(p.id);
    setForm({ title: p.title, emoji: p.emoji || "🚀", description: p.description, tags: p.tags.join(", "), color: p.color, link: p.link || "" });
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Projects</h2>

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
        <input placeholder="Link URL" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
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
        {projects?.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
            <div>
              <span className="mr-2">{p.emoji}</span>
              <span className="text-foreground text-sm font-semibold">{p.title}</span>
              <span className="text-muted-foreground text-xs ml-2">{p.tags.join(", ")}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-muted-foreground hover:text-primary"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
