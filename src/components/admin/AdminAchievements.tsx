import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAchievements } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";

const AdminAchievements = () => {
  const { data: items } = useAchievements();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", year: "", source: "" });

  const resetForm = () => { setForm({ title: "", description: "", year: "", source: "" }); setEditing(null); };

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    const { error } = await supabase.from("achievements").insert({ ...form, sort_order: (items?.length || 0) + 1 });
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["achievements"] });
    resetForm();
    toast.success("Achievement added!");
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const { error } = await supabase.from("achievements").update(form).eq("id", editing);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["achievements"] });
    resetForm();
    toast.success("Achievement updated!");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("achievements").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["achievements"] });
    toast.success("Deleted!");
  };

  const startEdit = (item: NonNullable<typeof items>[0]) => {
    setEditing(item.id);
    setForm({ title: item.title, description: item.description, year: item.year, source: item.source });
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Certifications & Achievements</h2>
      <div className="space-y-3 bg-secondary/30 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <input placeholder="Source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
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
        {items?.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
            <div>
              <span className="text-foreground text-sm font-semibold">{item.title}</span>
              <span className="text-muted-foreground text-xs ml-2">{item.source} ({item.year})</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="text-muted-foreground hover:text-primary"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAchievements;
