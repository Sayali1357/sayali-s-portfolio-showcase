import { Code, Database, Brain, Globe, Server, Cpu, type LucideIcon } from "lucide-react";
import { useSkills } from "@/hooks/usePortfolioData";

const iconMap: Record<string, LucideIcon> = { Code, Database, Brain, Globe, Server, Cpu };

const ExpertiseSection = () => {
  const { data: skills } = useSkills();

  return (
    <section id="expertise" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Expertise</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {(skills || []).map((skill) => {
            const Icon = iconMap[skill.icon_name] || Code;
            return (
              <div
                key={skill._id || skill.id}
                className="card-glass rounded-xl p-6 flex flex-col items-center gap-3 hover:glow-border transition-all duration-300 group cursor-default"
              >
                <Icon className={`w-10 h-10 ${skill.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors text-center">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
