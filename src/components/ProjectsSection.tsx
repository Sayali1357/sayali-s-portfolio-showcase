import { ArrowRight } from "lucide-react";
import { useProjects } from "@/hooks/usePortfolioData";

const ProjectsSection = () => {
  const { data: projects } = useProjects();

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            A collection of projects showcasing my skills in web development, AI, and mobile apps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(projects || []).map((project) => (
            <div
              key={project.id}
              className="card-glass rounded-xl p-6 flex flex-col justify-between hover:glow-border transition-all duration-300 group"
            >
              <div>
                <div className={`w-12 h-1 ${project.color} rounded-full mb-4`} />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{project.emoji}</span>
                  <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a href={project.link || "#"} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:gap-2">
                View Project <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
