
-- Timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Hero section content
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Sayali Jadhav',
  title TEXT NOT NULL DEFAULT 'BTech Computer Engineering',
  subtitle TEXT NOT NULL DEFAULT 'A passionate BTech Computer Engineering student crafting digital experiences through web development, AI, and innovative solutions.',
  profile_image_url TEXT,
  resume_url TEXT,
  status_text TEXT DEFAULT 'Available for opportunities',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hero content is publicly readable" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update hero" ON public.hero_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert hero" ON public.hero_content FOR INSERT TO authenticated WITH CHECK (true);

CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Tech tags for hero
CREATE TABLE public.tech_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tech_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tech tags are publicly readable" ON public.tech_tags FOR SELECT USING (true);
CREATE POLICY "Auth users can manage tech tags" ON public.tech_tags FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Skills / Expertise
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Code',
  color TEXT NOT NULL DEFAULT 'text-primary',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skills are publicly readable" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Auth users can manage skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  emoji TEXT DEFAULT '🚀',
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  color TEXT NOT NULL DEFAULT 'bg-primary',
  link TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are publicly readable" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Auth users can manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Education
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  years TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Education is publicly readable" ON public.education FOR SELECT USING (true);
CREATE POLICY "Auth users can manage education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Achievements / Certifications
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year TEXT NOT NULL,
  source TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements are publicly readable" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Auth users can manage achievements" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON public.achievements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Social links
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Globe',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Social links are publicly readable" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Auth users can manage social links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
