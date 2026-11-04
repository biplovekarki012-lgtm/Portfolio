export type ProjectCategory = 
  | 'Software Development'
  | 'Java Applications'
  | 'C++ Projects'
  | 'Web Development'
  | 'Raspberry Pi Robotics'
  | 'Creative Experiments';

export type VisualType = 'java' | 'cpp' | 'robotics' | 'web' | 'generative' | 'distributed' | 'photo';

export interface Project {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  year: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  visualType: VisualType;
  image?: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Web & Frontend' | 'Hardware & Systems' | 'Tools & DevOps';
  experience: string;
  description: string;
  libraries: string[];
  codeSnippet: string;
}
