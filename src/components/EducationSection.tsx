import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { useEducation } from "@/hooks/usePortfolioData";

const EducationSection = () => {
  const { data: education } = useEducation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="education" className="py-32 bg-slate-950/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight mb-4">
            Path of <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-muted-foreground">My academic journey and professional evolution.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-purple-500/50 to-rose-500/50 hidden md:block" />

          <div className="space-y-12">
            {(education || []).map((edu, idx) => (
              <motion.div
                key={edu._id || edu.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div className="glow-card glass-panel p-8 rounded-[32px] border-white/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        {edu.degree.toLowerCase().includes('experience') ? <Briefcase size={24} /> : <GraduationCap size={24} />}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10">
                          {edu.years}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white mt-1">{edu.degree}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-medium">{edu.institution}</p>
                    <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                      {(edu as any).description || "Gaining deep knowledge and practical insights in technical domains."}
                    </p>
                    {edu.certificate_url && (
                        <button 
                            onClick={() => setSelectedImage(edu.certificate_url)}
                            className="mt-6 flex items-center gap-2 text-primary text-sm font-semibold hover:text-white transition-colors"
                        >
                            <ExternalLink size={16} /> View Certificate
                        </button>
                    )}
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-950 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

                {/* Visual Gap for the other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
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
              alt="Certificate Fullscreen"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EducationSection;
