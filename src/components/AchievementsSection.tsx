import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { useAchievements } from "@/hooks/usePortfolioData";

const AchievementsSection = () => {
  const { data: achievements } = useAchievements();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="achievements" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-display text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            Milestones & <span className="text-gradient">Awards</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed px-4"
          >
            A validation of my commitment to excellence and continuous learning in the ever-evolving tech landscape.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(achievements || []).map((ach, idx) => (
            <motion.div
              key={ach._id || ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glow-card glass-panel rounded-[32px] p-8 h-full border-white/5 group-hover:border-primary/20 transition-all duration-500 overflow-hidden relative">
                {/* Decoration */}
                <Star className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors rotate-12" />

                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/10 to-purple-500/10 flex items-center justify-center text-primary shadow-inner border border-white/5">
                    <Award size={28} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                    {ach.year}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                  {ach.title}
                </h3>

                {ach.image_url && (
                  <div 
                    className="w-full h-32 mb-6 rounded-xl overflow-hidden cursor-pointer relative group/img opacity-90 hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedImage(ach.image_url)}
                  >
                    <img src={ach.image_url} alt={ach.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-bold tracking-widest uppercase">Click to Enlarge</span>
                    </div>
                  </div>
                )}

                <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-medium">
                  {ach.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/80 px-4 py-1.5 rounded-lg bg-primary/5">
                    {ach.source}
                  </span>
                  {(ach.credential_url) && (
                    <motion.a
                      href={ach.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="p-2 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span className="text-xs font-semibold uppercase tracking-widest px-2 hidden lg:inline-block">View Credential</span>
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
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
              alt="Fullscreen Modal"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AchievementsSection;
