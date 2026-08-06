export interface Profile {
  name: string;
  title: string;
  bio: string;
  about: string;
  avatarUrl: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  location: string;
  availableForHire: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'mobile' | 'tools' | 'database';
  icon?: string;
  level: number; // 1 - 100
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  published: boolean;
  tags: string[];
  readTimeMinutes: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AuthResponse {
  user: {
    username: string;
    role: string;
  };
}
