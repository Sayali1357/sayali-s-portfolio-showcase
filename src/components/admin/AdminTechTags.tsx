import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTechTags } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const AdminTechTags = () => {
  const { data: tags } = useTechTags();
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState("");

  const handleAdd = async () => {
    if (!newTag.trim()) return;
    const { error } = await supabase.from("tech_tags").insert({ name: newTag.trim(), sort_order: (tags?.length || 0) + 1 });
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["tech_tags"] });
    setNewTag("");
    toast.success("Tag added!");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("tech_tags").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["tech_tags"] });
    toast.success("Tag deleted!");
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Tech Tags (Hero Section)</h2>
      <div className="flex gap-2">
        <input placeholder="New tag name" value={newTag} onChange={(e) => setNewTag(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1"><Plus size={14} /> Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2">
            <span className="text-foreground text-sm">{tag.name}</span>
            <button onClick={() => handleDelete(tag.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTechTags;
