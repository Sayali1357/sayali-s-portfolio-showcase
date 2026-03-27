import { motion } from "framer-motion";
import { Download, Eye, MessageCircle } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";
import { useHeroContent, useTechTags } from "@/hooks/usePortfolioData";

const HeroSection = () => {
  const { data: hero } = useHeroContent();
  const { data: tags } = useTechTags();

  const name = hero?.name || "Sayali Jadhav";
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -ml-48 -mb-48 opacity-50" />

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-sm font-medium text-slate-300">{hero?.status_text || "Available for opportunities"}</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter">
            Hi, I'm{" "}
            <span className="text-gradient drop-shadow-sm">{firstName}</span>
            <br />
            <span className="text-foreground">{lastName}</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
            {hero?.subtitle || "A passionate developer crafting digital experiences."}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={hero?.resume_url || "#contact"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
            >
              <Download size={20} />
              Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-panel text-white font-bold transition-all"
            >
              <Eye size={20} />
              Featured Work
            </motion.a>
          </div>

          <div className="flex flex-wrap gap-3 pt-6">
            {(tags || []).map((tag, idx) => (
              <motion.span
                key={tag._id || tag.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="px-5 py-2 rounded-xl glass-panel text-xs font-semibold text-slate-300"
              >
                {tag.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-shrink-0 relative group"
        >
          {/* Animated Background Rings */}
          <div className="absolute inset-[-20px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

          <div className="relative group w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
            {/* Background Circle with Glassmorphism */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-purple-500/10 to-rose-500/10 border-4 border-white/20 glass-panel shadow-2xl transition-transform duration-500 group-hover:scale-105" />
            
            {/* Main Image Container with Circular Clipping for the bottom only */}
            <div className="absolute inset-0 rounded-full overflow-hidden flex items-end justify-center">
              <img
                src={hero?.profile_image_url || profileImg}
                alt={name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Highlighting the 'Pop-out' effect - the top part of the image can overflow if we remove overflow-hidden, 
                but for a clean circular look with pop-out, we often use a mask. 
                However, image 2 shows a perfect circle. Let's make it a clean, premium circle with a thick border. */}
            <div className="absolute inset-0 rounded-full border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] pointer-events-none group-hover:border-primary group-hover:shadow-primary/30 transition-all duration-500" />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl glass-panel border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                🚀
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expert in</p>
                <p className="text-sm font-bold text-white">React & AI</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
