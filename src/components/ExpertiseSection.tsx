import { Code, Database, Brain, Globe, Server, Cpu } from "lucide-react";

const skills = [
  { icon: Code, name: "JavaScript", color: "text-yellow-400" },
  { icon: Globe, name: "React", color: "text-blue-400" },
  { icon: Server, name: "Node.js", color: "text-green-400" },
  { icon: Code, name: "Next.js", color: "text-foreground" },
  { icon: Database, name: "Python", color: "text-accent" },
  { icon: Brain, name: "Machine Learning", color: "text-primary" },
  { icon: Cpu, name: "Java", color: "text-orange-400" },
  { icon: Server, name: "Flask", color: "text-muted-foreground" },
  { icon: Database, name: "MongoDB", color: "text-green-500" },
  { icon: Database, name: "SQL", color: "text-blue-300" },
  { icon: Globe, name: "Tailwind CSS", color: "text-cyan-400" },
  { icon: Code, name: "Spring Boot", color: "text-green-400" },
];

const ExpertiseSection = () => {
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
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="card-glass rounded-xl p-6 flex flex-col items-center gap-3 hover:glow-border transition-all duration-300 group cursor-default"
            >
              <skill.icon className={`w-10 h-10 ${skill.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
