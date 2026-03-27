import { useState } from "react";
import { useSkills } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

import { API_BASE } from "@/lib/api";

const AdminSkills = () => {
  const { data: skills } = useSkills();
  const queryClient = useQueryClient();
  const [newSkill, setNewSkill] = useState({ name: "", icon_name: "Code", color: "text-primary" });

  const handleAdd = async () => {
    if (!newSkill.name.trim()) return;

    const res = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newSkill, sort_order: (skills?.length || 0) + 1 })
    });

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setNewSkill({ name: "", icon_name: "Code", color: "text-primary" });
      toast.success("Skill added to MongoDB!");
    } else {
      toast.error("Failed to add skill");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_BASE}/skills/${id}`, { method: 'DELETE' });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted from MongoDB!");
    } else {
      toast.error("Failed to delete skill");
    }
  };

  const handleUpdate = async (id: string, updates: Record<string, string>) => {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated!");
    }
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Skills / Expertise (MongoDB)</h2>

      <div className="flex gap-2 flex-wrap">
        <input placeholder="Skill name" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          className="flex-1 min-w-[150px] px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <input placeholder="Icon (e.g. Code)" value={newSkill.icon_name} onChange={(e) => setNewSkill({ ...newSkill, icon_name: e.target.value })}
          className="w-32 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1"><Plus size={14} /> Add</button>
      </div>

      <div className="space-y-2">
        {skills?.map((skill: any) => (
          <div key={skill._id} className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3">
            <input defaultValue={skill.name} onBlur={(e) => e.target.value !== skill.name && handleUpdate(skill._id, { name: e.target.value })}
              className="flex-1 bg-transparent text-foreground text-sm focus:outline-none" />
            <input defaultValue={skill.icon_name} onBlur={(e) => e.target.value !== skill.icon_name && handleUpdate(skill._id, { icon_name: e.target.value })}
              className="w-24 bg-transparent text-muted-foreground text-xs focus:outline-none" />
            <button onClick={() => handleDelete(skill._id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;
