
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  role: string;
  duration: string;
  link: string;
  github?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  stack: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
