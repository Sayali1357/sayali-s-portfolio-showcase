import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Github, Mail, Globe, Send, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useSocialLinks } from "@/hooks/usePortfolioData";

const iconMap: Record<string, LucideIcon> = { Instagram, Linkedin, Github, Mail, Globe };

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { data: socials } = useSocialLinks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight mb-6">
                Let's <span className="text-gradient">Connect</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Me</p>
                  <p className="text-white font-bold">sayali@example.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {(socials || []).map((s, idx) => {
                const Icon = iconMap[s.icon_name] || Globe;
                return (
                  <motion.a
                    key={s._id || s.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    href={s.url}
                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-slate-300 hover:text-primary transition-all"
                    aria-label={s.platform}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-[40px] space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                    required
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
              >
                Send Message <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
