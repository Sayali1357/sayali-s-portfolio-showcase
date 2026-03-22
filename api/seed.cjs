const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const mongoURI = process.env.MONGODB_URI;

const SkillSchema = new mongoose.Schema({ name: String, icon_name: String, color: String, sort_order: Number });
const ProjectSchema = new mongoose.Schema({ title: String, description: String, emoji: String, color: String, link: String, tags: [String], sort_order: Number });
const HeroSchema = new mongoose.Schema({ name: String, title: String, subtitle: String, status_text: String, profile_image_url: String, resume_url: String });
const EducationSchema = new mongoose.Schema({ degree: String, institution: String, years: String, sort_order: Number });
const AchievementSchema = new mongoose.Schema({ title: String, description: String, year: String, source: String, sort_order: Number });
const SocialSchema = new mongoose.Schema({ platform: String, url: String, icon_name: String, sort_order: Number });
const TechTagSchema = new mongoose.Schema({ name: String, sort_order: Number });

const Skill = mongoose.model('Skill', SkillSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Hero = mongoose.model('Hero', HeroSchema);
const Education = mongoose.model('Education', EducationSchema);
const Achievement = mongoose.model('Achievement', AchievementSchema);
const Social = mongoose.model('Social', SocialSchema);
const TechTag = mongoose.model('TechTag', TechTagSchema);

const portfolioData = {
    hero: {
        name: "Sayali Jadhav",
        title: "Full Stack Developer & AI Enthusiast",
        subtitle: "I build robust, scalable web applications and explore the boundaries of Artificial Intelligence.",
        status_text: "Open to new opportunities",
        resume_url: "#",
        profile_image_url: ""
    },
    techTags: [
        { name: "React", sort_order: 1 },
        { name: "TypeScript", sort_order: 2 },
        { name: "Node.js", sort_order: 3 },
        { name: "MongoDB", sort_order: 4 }
    ],
    skills: [
        { name: "Frontend Development", icon_name: "Globe", color: "text-blue-500", sort_order: 1 },
        { name: "Backend Architecture", icon_name: "Server", color: "text-green-500", sort_order: 2 }
    ],
    projects: [
        {
            title: "AI Portfolio Showcase",
            description: "A dynamic portfolio website built with React, Vite, and MongoDB.",
            emoji: "🚀",
            color: "bg-primary",
            tags: ["React", "MongoDB"],
            link: "#",
            sort_order: 1
        }
    ],
    education: [
        { degree: "Bachelor of Technology", institution: "Technical University", years: "2023 - 2027", sort_order: 1 }
    ],
    achievements: [
        { title: "Best Innovation Award", year: "2025", source: "Tech Summit", description: "Awarded for AI accessibility tool.", sort_order: 1 }
    ],
    socials: [
        { platform: "Github", url: "https://github.com", icon_name: "Github", sort_order: 1 }
    ]
};

async function seed() {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB...");

    // Clean existing
    await Hero.deleteMany({});
    await TechTag.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});
    await Achievement.deleteMany({});
    await Social.deleteMany({});

    // Seed
    await new Hero(portfolioData.hero).save();
    await TechTag.insertMany(portfolioData.techTags);
    await Skill.insertMany(portfolioData.skills);
    await Project.insertMany(portfolioData.projects);
    await Education.insertMany(portfolioData.education);
    await Achievement.insertMany(portfolioData.achievements);
    await Social.insertMany(portfolioData.socials);

    console.log("Database seeded successfully!");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
