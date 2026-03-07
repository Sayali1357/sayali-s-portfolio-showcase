import { useState } from "react";
import { Instagram, Linkedin, Github, Mail, Send } from "lucide-react";
import { toast } from "sonner";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:sayali@example.com", label: "Email" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            I'd love to hear from you! Whether it's a project, job opportunity, or just a hello.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              aria-label={s.label}
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Message</label>
            <textarea
              placeholder="Your message..."
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
