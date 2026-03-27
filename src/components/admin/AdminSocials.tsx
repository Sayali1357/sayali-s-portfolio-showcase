import { useState } from "react";
import { useSocialLinks } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";

import { API_BASE } from "@/lib/api";

const AdminSocials = () => {
  const { data: items } = useSocialLinks();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ platform: "", url: "", icon_name: "Globe" });

  const resetForm = () => { setForm({ platform: "", url: "", icon_name: "Globe" }); setEditing(null); };

  const handleAdd = async () => {
    if (!form.platform.trim()) return;
    const res = await fetch(`${API_BASE}/socials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, sort_order: (items?.length || 0) + 1 })
    });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
      resetForm();
      toast.success("Social link added!");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const res = await fetch(`${API_BASE}/socials/${editing}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
      resetForm();
      toast.success("Social link updated!");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_BASE}/socials/${id}`, { method: 'DELETE' });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
      toast.success("Deleted!");
    }
  };

  const startEdit = (item: any) => {
    setEditing(item._id);
    setForm({ platform: item.platform, url: item.url, icon_name: item.icon_name });
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Social Links (MongoDB)</h2>
      <div className="space-y-3 bg-secondary/30 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-3">
          <input placeholder="Platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <input placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <input placeholder="Icon name" value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
            className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
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
              <span className="text-foreground text-sm font-semibold">{item.platform}</span>
              <span className="text-muted-foreground text-xs ml-2">{item.url}</span>
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

export default AdminSocials;
