import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useHeroContent } from "@/hooks/usePortfolioData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save } from "lucide-react";

const AdminHero = () => {
  const { data: hero } = useHeroContent();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", title: "", subtitle: "", status_text: "", resume_url: "" });

  useEffect(() => {
    if (hero) setForm({
      name: hero.name,
      title: hero.title,
      subtitle: hero.subtitle,
      status_text: hero.status_text || "",
      resume_url: hero.resume_url || "",
    });
  }, [hero]);

  const handleSave = async () => {
    if (!hero) return;
    const { error } = await supabase.from("hero_content").update(form).eq("id", hero.id);
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["hero_content"] });
    toast.success("Hero updated!");
  };

  return (
    <div className="card-glass rounded-xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">Hero Section</h2>
      {(["name", "title", "status_text", "resume_url"] as const).map((field) => (
        <div key={field}>
          <label className="text-sm font-semibold text-foreground mb-1 block capitalize">{field.replace("_", " ")}</label>
          <input
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      ))}
      <div>
        <label className="text-sm font-semibold text-foreground mb-1 block">Subtitle</label>
        <textarea
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>
      <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90">
        <Save size={16} /> Save Changes
      </button>
    </div>
  );
};

export default AdminHero;
