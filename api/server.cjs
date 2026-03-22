const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME_HERE',
  api_key: process.env.CLOUDINARY_API_KEY || 'YOUR_API_KEY_HERE',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'YOUR_API_SECRET_HERE'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'gif'],
  }
});
const upload = multer({ storage: storage });

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Specialized schemas
const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon_name: { type: String },
  color: { type: String, default: 'text-primary' },
  sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  emoji: { type: String, default: '🚀' },
  color: { type: String, default: 'bg-primary' },
  link: { type: String },
  image_url: { type: String },
  github_url: { type: String },
  vercel_url: { type: String },
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
  certificate_url: { type: String },
  sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  year: { type: String },
  source: { type: String },
  image_url: { type: String },
  credential_url: { type: String },
  sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const SocialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon_name: { type: String },
  sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const TechTagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sort_order: { type: Number, default: 0 }
}, { timestamps: true });

const Skill = mongoose.model('Skill', SkillSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Hero = mongoose.model('Hero', HeroSchema);
const Education = mongoose.model('Education', EducationSchema);
const Achievement = mongoose.model('Achievement', AchievementSchema);
const Social = mongoose.model('Social', SocialSchema);
const TechTag = mongoose.model('TechTag', TechTagSchema);

// CRUD Routes
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find().sort({ sort_order: 1 });
  res.json(projects);
});
app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (typeof req.body.tags === 'string') {
        projectData.tags = JSON.parse(req.body.tags);
    }
    if (req.file) {
      projectData.image_url = req.file.path; // Cloudinary returns the secure URL in path
    }
    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/projects/:id', upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (typeof req.body.tags === 'string') {
        projectData.tags = JSON.parse(req.body.tags);
    }
    if (req.file) {
      projectData.image_url = req.file.path; // Cloudinary returns the secure URL in path
    }
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get('/api/hero', async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) {
    hero = new Hero({
      name: "Sayali Jadhav",
      title: "Full Stack Developer",
      subtitle: "Passionate about building modern web applications",
      status_text: "Available for projects"
    });
    await hero.save();
  }
  res.json(hero);
});
app.put('/api/hero/:id', async (req, res) => {
  const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hero);
});

app.get('/api/skills', async (req, res) => {
  const skills = await Skill.find().sort({ sort_order: 1 });
  res.json(skills);
});
app.post('/api/skills', async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.status(201).json(skill);
});
app.put('/api/skills/:id', async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(skill);
});
app.delete('/api/skills/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get('/api/education', async (req, res) => {
  const edu = await Education.find().sort({ sort_order: 1 });
  res.json(edu);
});
app.post('/api/education', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.certificate_url = req.file.path; // Cloudinary returns the secure URL in path
    }
    const edu = new Education(data);
    await edu.save();
    res.status(201).json(edu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/education/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.certificate_url = req.file.path; // Cloudinary returns the secure URL in path
    }
    const edu = await Education.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(edu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/education/:id', async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get('/api/achievements', async (req, res) => {
  const ach = await Achievement.find().sort({ sort_order: 1 });
  res.json(ach);
});
app.post('/api/achievements', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image_url = req.file.path;
    }
    const ach = new Achievement(data);
    await ach.save();
    res.status(201).json(ach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/achievements/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image_url = req.file.path;
    }
    const ach = await Achievement.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(ach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/achievements/:id', async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get('/api/socials', async (req, res) => {
  const socials = await Social.find().sort({ sort_order: 1 });
  res.json(socials);
});
app.post('/api/socials', async (req, res) => {
  const social = new Social(req.body);
  await social.save();
  res.status(201).json(social);
});
app.put('/api/socials/:id', async (req, res) => {
  const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(social);
});
app.delete('/api/socials/:id', async (req, res) => {
  await Social.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get('/api/tech-tags', async (req, res) => {
  const tags = await TechTag.find().sort({ sort_order: 1 });
  res.json(tags);
});
app.post('/api/tech-tags', async (req, res) => {
  const tag = new TechTag(req.body);
  await tag.save();
  res.status(201).json(tag);
});
app.delete('/api/tech-tags/:id', async (req, res) => {
  await TechTag.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
