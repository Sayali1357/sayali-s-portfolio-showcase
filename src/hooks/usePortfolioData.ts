import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/lib/api";
import { portfolioData } from "@/lib/seedData";

export const useHeroContent = () =>
  useQuery({
    queryKey: ["hero_content"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/hero`);
      if (!res.ok) throw new Error("Failed to fetch hero");
      return res.json();
    },
    initialData: portfolioData.hero,
  });

export const useTechTags = () =>
  useQuery({
    queryKey: ["tech_tags"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/tech-tags`).catch(() => null);
      if (res && res.ok) return res.json();
      return portfolioData.techTags;
    },
    initialData: portfolioData.techTags,
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/skills`);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return res.json();
    },
    initialData: portfolioData.skills,
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    initialData: portfolioData.projects,
  });

export const useEducation = () =>
  useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/education`).catch(() => null);
      if (res && res.ok) return res.json();
      return portfolioData.education;
    },
    initialData: portfolioData.education,
  });

export const useAchievements = () =>
  useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/achievements`).catch(() => null);
      if (res && res.ok) return res.json();
      return portfolioData.achievements;
    },
    initialData: portfolioData.achievements,
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/socials`).catch(() => null);
      if (res && res.ok) return res.json();
      return portfolioData.socials;
    },
    initialData: portfolioData.socials,
  });
