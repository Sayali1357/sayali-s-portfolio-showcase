export const portfolioData = {
    hero: {
        _id: "hero-1",
        name: "Sayali Jadhav",
        title: "Full Stack Developer & AI Enthusiast",
        subtitle: "I build robust, scalable web applications and explore the boundaries of Artificial Intelligence. Dedicated to creating seamless digital experiences that solve real-world problems.",
        status_text: "Open to new opportunities",
        resume_url: "#",
        profile_image_url: ""
    },
    techTags: [
        { _id: "tag-1", name: "React", sort_order: 1 },
        { _id: "tag-2", name: "TypeScript", sort_order: 2 },
        { _id: "tag-3", name: "Node.js", sort_order: 3 },
        { _id: "tag-4", name: "MongoDB", sort_order: 4 },
        { _id: "tag-5", name: "Python", sort_order: 5 },
        { _id: "tag-6", name: "AI/ML", sort_order: 6 }
    ],
    skills: [
        { _id: "skill-1", name: "Frontend Development", icon_name: "Globe", color: "text-blue-500", sort_order: 1 },
        { _id: "skill-2", name: "Backend Architecture", icon_name: "Server", color: "text-green-500", sort_order: 2 },
        { _id: "skill-3", name: "Database Design", icon_name: "Database", color: "text-amber-500", sort_order: 3 },
        { _id: "skill-4", name: "Machine Learning", icon_name: "Brain", color: "text-purple-500", sort_order: 4 },
        { _id: "skill-5", name: "Cloud Deployment", icon_name: "Cloud", color: "text-cyan-500", sort_order: 5 },
        { _id: "skill-6", name: "System Integration", icon_name: "Cpu", color: "text-rose-500", sort_order: 6 }
    ],
    projects: [
        {
            _id: "proj-1",
            title: "AI Portfolio Showcase",
            description: "A dynamic portfolio website built with React, Vite, and now migrating to MongoDB. Features real-time content management and sleek glassmorphism design.",
            emoji: "🚀",
            color: "bg-primary",
            tags: ["React", "MongoDB", "Framer Motion"],
            link: "#",
            sort_order: 1
        },
        {
            _id: "proj-2",
            title: "Smart Learning Module",
            description: "An educational platform designed for interactive learning, featuring course tracking and adaptive feedback mechanisms.",
            emoji: "📚",
            color: "bg-purple-600",
            tags: ["TypeScript", "Node.js", "AI"],
            link: "#",
            sort_order: 2
        },
        {
            _id: "proj-3",
            title: "E-Commerce Analytics Hub",
            description: "Comprehensive dashboard for tracking sales, inventory, and customer behavior with real-time data visualization.",
            emoji: "📊",
            color: "bg-blue-600",
            tags: ["Next.js", "PostgreSQL", "Recharts"],
            link: "#",
            sort_order: 3
        }
    ],
    education: [
        {
            _id: "edu-1",
            degree: "Bachelor of Technology in Computer Science",
            institution: "Technical University",
            years: "2023 - 2027",
            sort_order: 1
        }
    ],
    achievements: [
        {
            _id: "ach-1",
            title: "Best Innovation Award",
            year: "2025",
            source: "Tech Summit",
            description: "Awarded for the development of an AI-driven accessibility tool.",
            sort_order: 1
        },
        {
            _id: "ach-2",
            title: "Full Stack Certification",
            year: "2024",
            source: "Global Dev Academy",
            description: "Comprehensive certification covering modern web technologies.",
            sort_order: 2
        }
    ],
    socials: [
        { _id: "soc-1", platform: "Github", url: "https://github.com", icon_name: "Github", sort_order: 1 },
        { _id: "soc-2", platform: "LinkedIn", url: "https://linkedin.com", icon_name: "Linkedin", sort_order: 2 },
        { _id: "soc-3", platform: "Instagram", url: "https://instagram.com", icon_name: "Instagram", sort_order: 3 }
    ]
};
