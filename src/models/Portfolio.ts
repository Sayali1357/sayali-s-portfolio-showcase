import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon_name: { type: String },
    color: { type: String },
    sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    emoji: { type: String },
    color: { type: String },
    link: { type: String },
    tags: [String],
    sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const HeroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    status_text: { type: String },
    profile_image_url: { type: String },
    resume_url: { type: String }
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    years: { type: String, required: true },
    sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    year: { type: String },
    source: { type: String },
    sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const SocialLinkSchema = new mongoose.Schema({
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon_name: { type: String },
    sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const TechTagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sort_order: { type: Number, default: 0 }
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
export const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
export const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
export const SocialLink = mongoose.models.SocialLink || mongoose.model('SocialLink', SocialLinkSchema);
export const TechTag = mongoose.models.TechTag || mongoose.model('TechTag', TechTagSchema);
