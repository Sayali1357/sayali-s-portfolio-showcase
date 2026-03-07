import { Award } from "lucide-react";

const achievements = [
  {
    title: "Programming in C++",
    description: "All functions and features of C++ till C++20.",
    year: "2024",
    source: "NPTEL Online Certification",
  },
  {
    title: "Machine Learning",
    description: "Concepts of Machine Learning like types of models and their working.",
    year: "2024",
    source: "Simplilearn SkillUp",
  },
  {
    title: "Programming in Java",
    description: "All Java concepts like Swing, AWT, JDBC fundamentals.",
    year: "2025",
    source: "NPTEL Online Certification",
  },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Certifications & Achievements</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Proof of my skills and learning journey across different technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.title}
              className="card-glass rounded-xl p-6 hover:glow-border transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-primary" />
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {ach.year}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{ach.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{ach.description}</p>
              <p className="text-xs text-primary/70">{ach.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
