import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Github, X } from "lucide-react";
import { useState } from "react";
import { useProjects } from "@/hooks/usePortfolioData";

const ProjectsSection = () => {
  const { data: projects } = useProjects();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              A selection of my most impactful work, ranging from web applications to AI experiments.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block h-px flex-1 bg-white/10 mx-12 mb-6"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(projects || []).map((project, idx) => (
            <motion.div
              key={project._id || project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="glow-card glass-panel rounded-3xl p-8 h-full flex flex-col justify-between border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden">
                {/* Background Accent */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: project.color === 'bg-primary' ? '#10b981' : '#8b5cf6' }}
                />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500">
                      {project.emoji || "🚀"}
                    </div>
                    <div className="flex gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {(project.github_url || project.link) && (
                        <a href={project.github_url || project.link || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {(project.vercel_url || project.link) && (
                        <a href={project.vercel_url || project.link || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {project.image_url && (
                    <div 
                      className="w-full h-40 mb-6 rounded-xl overflow-hidden cursor-pointer relative group/img opacity-90 hover:opacity-100 transition-opacity"
                      onClick={() => setSelectedImage(project.image_url)}
                    >
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold tracking-widest uppercase">Click to Enlarge</span>
                      </div>
                    </div>
                  )}

                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:border-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.vercel_url || project.link || "#"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary opacity-80 hover:opacity-100 transition-all group-hover:translate-x-1 mt-4"
                >
                  Explore Details <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selectedImage}
              alt="Project Fullscreen"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
