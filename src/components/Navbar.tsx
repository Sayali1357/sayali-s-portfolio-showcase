import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Home", "Expertise", "Projects", "Education", "Achievements", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${scrolled ? "py-4" : "py-6"
        }`}
    >
      <div
        className={`container mx-auto max-w-6xl flex items-center justify-between py-3 px-8 rounded-full transition-all duration-300 ${scrolled ? "glass-panel shadow-2xl" : "bg-transparent border-transparent"
          }`}
      >
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#home"
          className="font-display text-2xl font-black text-white tracking-tighter"
        >
          Sayali<span className="text-primary">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
          >
            Hire Me
          </motion.a>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass-panel rounded-3xl overflow-hidden mx-6"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
