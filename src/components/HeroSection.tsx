import { Download, Eye, MessageCircle } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const techTags = ["React", "Next.js", "Python", "Java", "Spring Boot", "AI/ML"];

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary">
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="text-gradient">Sayali</span>
            <br />
            <span className="text-foreground">Jadhav</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg">
            A passionate <span className="text-primary font-semibold">BTech Computer Engineering</span> student crafting digital experiences through{" "}
            <span className="text-primary">web development</span>, <span className="text-primary">AI</span>, and innovative solutions.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold">
              <Download size={18} />
              Download Resume
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:border-muted-foreground transition-all">
              <Eye size={18} />
              View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              <MessageCircle size={18} />
              Let's Connect
            </a>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {techTags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 relative">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 animate-glow-pulse">
            <img src={profileImg} alt="Sayali Jadhav" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-card border border-border">
            <span className="text-sm">🚀 Building Cool Stuff</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
