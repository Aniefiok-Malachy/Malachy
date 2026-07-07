/**
 * Shared Type Definitions for the Developer Portfolio
 */

export type Theme = 'light' | 'dark';

export interface Project {
  id: number | string;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  homepage: string | null;
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
  icon: string; // lucide icon name
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface CertificationItem {
  id: string;
  institution: string;
  certificate: string;
  date: string;
  credentialUrl: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  date: string;
  location: string;
  gpa: string;
  details: string[];
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
