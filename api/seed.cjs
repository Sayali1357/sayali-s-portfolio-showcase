const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

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
        resume_url: "https://drive.google.com/drive/folders/1gzZMKRnYUhUqf_BTu7the7hqCC0CqxPA?usp=drive_link",
        profile_image_url: ""
    },
    techTags: [
        { name: "React", sort_order: 1 },
        { name: "Next.js", sort_order: 2 },
        { name: "Node.js", sort_order: 3 },
        { name: "MongoDB", sort_order: 4 }
    ],
    skills: [
        { name: "Frontend Development", icon_name: "Globe", color: "text-blue-500", sort_order: 1 },
        { name: "Backend Architecture", icon_name: "Server", color: "text-green-500", sort_order: 2 }
    ],
    projects: [
        {
            title: "Millet Value Chain Platform",
            description: "Developed a web platform (Shree Anna Connect) to promote millet awareness and strengthen the agricultural supply chain connecting farmers, consumers, and markets.",
            emoji: "🌾",
            color: "bg-orange-600",
            tags: ["React", "Node.js", "Agricultural Tech"],
            link: "https://github.com/yashwawge/sih",
            sort_order: 1
        },
        {
            title: "Ctrl+You",
            description: "Digital wellbeing platform to help students monitor and manage gaming addiction. Features real-time tracking and personalized feedback.",
            emoji: "🎮",
            color: "bg-indigo-600",
            tags: ["MERN Stack", "Tailwind CSS", "Digital Wellbeing"],
            link: "https://addiction-ctrl-you.vercel.app",
            github_url: "https://github.com/Sayali1357/Ctrl-You",
            sort_order: 2
        },
        {
            title: "Arthankur",
            description: "FinTech platform connecting startups, MSMEs, and investors to streamline funding and financial collaboration through a centralized digital hub.",
            emoji: "💰",
            color: "bg-purple-600",
            tags: ["API Integration", "React", "FinTech"],
            link: "https://github.com/Sayali1357/ArthX",
            sort_order: 3
        },
        {
            title: "AI Portfolio Showcase",
            description: "A dynamic portfolio website built with React, Vite, and MongoDB. Features real-time content management and sleek glassmorphism design.",
            emoji: "🚀",
            color: "bg-blue-600",
            tags: ["React", "MongoDB", "Vercel"],
            link: "https://github.com/Sayali1357/sayali-s-portfolio-showcase",
            sort_order: 4
        }
    ],
    education: [
        {
            degree: "B.Tech in Computer Engineering",
            institution: "K.K. Wagh Institute of Engineering Education and Research, Nashik",
            years: "2023 - 2027",
            grade: "CGPA: 8.86",
            sort_order: 1
        },
        {
            degree: "Higher Secondary Certificate (HSC)",
            institution: "Upadhye College of Science",
            years: "2021 - 2023",
            grade: "83.33%",
            sort_order: 2
        },
        {
            degree: "Secondary School Certificate (SSC)",
            institution: "K.D. Bhalerao English Medium School",
            years: "2020 - 2021",
            grade: "96%",
            sort_order: 3
        }
    ],
    achievements: [
        {
            title: "Smart India Hackathon 2025 - Grand Finale",
            description: "Participated as part of 'Team Sahashra' in the Software Edition of SIH 2025, solving real-world problems through innovation.",
            year: "2025",
            source: "Ministry of Education, Govt. of India",
            sort_order: 1
        },
        {
            title: "Full-Stack Development 101",
            description: "Successfully completed the professional certification in Full-Stack development foundations.",
            year: "2026",
            source: "Simplilearn SkillUp",
            sort_order: 2
        },
        {
            title: "Databases and SQL for Data Science with Python (With Honors)",
            description: "Advanced certification covering SQL and Database management for Data Science applications.",
            year: "2025",
            source: "IBM / Coursera",
            credential_url: "https://coursera.org/verify/RDN2690IDKQ7",
            sort_order: 3
        },
        {
            title: "Introduction to Data Analytics",
            description: "Foundational course on Data Analytics principles and practices.",
            year: "2024",
            source: "IBM / Coursera",
            credential_url: "https://coursera.org/verify/0GDW6A302J2V",
            sort_order: 4
        },
        {
            title: "Grand Elocution Competition - Career Katta",
            description: "Awarded Certificate of Appreciation for active participation and commendable ideas in the 'शब्द सम्राट' competition.",
            year: "2023",
            source: "Career Katta (K.K. Wagh Institute)",
            sort_order: 5
        }
    ],
    socials: [
        { platform: "Github", url: "https://github.com/Sayali1357", icon_name: "Github", sort_order: 1 },
        { platform: "LinkedIn", url: "https://www.linkedin.com/in/sayali-jadhav-a52718289/", icon_name: "Linkedin", sort_order: 2 }
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
