import { useQuery } from "@tanstack/react-query";

const API_BASE = "http://localhost:5000/api";

export const useHeroContent = () =>
  useQuery({
    queryKey: ["hero_content"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/hero`);
      if (!res.ok) throw new Error("Failed to fetch hero");
      return res.json();
    },
  });

export const useTechTags = () =>
  useQuery({
    queryKey: ["tech_tags"],
    queryFn: async () => {
      // Logic for tech tags could also be fetched from the API if we add routes for them
      const res = await fetch(`${API_BASE}/tech-tags`).catch(() => null);
      if (res && res.ok) return res.json();
      return [];
    },
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/skills`);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return res.json();
    },
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

export const useEducation = () =>
  useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/education`).catch(() => null);
      if (res && res.ok) return res.json();
      return [];
    },
  });

export const useAchievements = () =>
  useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/achievements`).catch(() => null);
      if (res && res.ok) return res.json();
      return [];
    },
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/socials`).catch(() => null);
      if (res && res.ok) return res.json();
      return [];
    },
  });
