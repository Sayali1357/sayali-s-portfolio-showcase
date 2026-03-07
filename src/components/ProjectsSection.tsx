import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Smart Attendance System",
    emoji: "📸",
    description: "A web-based system using OpenCV for face detection, Flask for the interface, and KNN for recognition. Enables student registration, model training, and more.",
    tags: ["Python", "OpenCV", "Flask", "KNN"],
    color: "bg-blue-500",
  },
  {
    title: "Stock Monitoring & Billing",
    emoji: "💻",
    description: "A Django-based web app with user authentication, product management, and bill generation. Tracks stock, manages sessions, and generates bills.",
    tags: ["Django", "SQLite", "HTML", "CSS"],
    color: "bg-destructive",
  },
  {
    title: "StudyGenius – AI Exam Assistant",
    emoji: "📝",
    description: "An AI-powered platform that generates MCQs, sample papers, and personalized study schedules using Gemini API.",
    tags: ["Python", "Flask", "Gemini API", "Tailwind"],
    color: "bg-blue-600",
  },
  {
    title: "InsureEase – Smart Insurance",
    emoji: "🛡️",
    description: "A unified platform to manage, track, and pay for all insurance policies, with AI-powered recommendations and gamified rewards.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "bg-destructive",
  },
  {
    title: "Student Manager App",
    emoji: "📊",
    description: "An offline-first Android app that helps students manage daily schedules, timed tasks, reminders, and track goal progress with AI chatbot.",
    tags: ["Java", "Android", "SQLite", "Gemini"],
    color: "bg-blue-500",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            A collection of projects showcasing my skills in web development, AI, and mobile apps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="card-glass rounded-xl p-6 flex flex-col justify-between hover:glow-border transition-all duration-300 group"
            >
              <div>
                <div className={`w-12 h-1 ${project.color} rounded-full mb-4`} />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{project.emoji}</span>
                  <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a href="#" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:gap-2">
                View Project <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
