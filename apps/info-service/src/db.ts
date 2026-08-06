import fs from 'fs';
import path from 'path';
import { Profile, Project, Skill, Experience, ContactMessage } from '@portfolio/shared-types';

const DB_PATH = path.join(__dirname, '../data/info_db.json');

export interface LegacyUser {
  user_id: number;
  username: string;
  foto: string;
  about_pt: string;
  about_en: string;
  work_title_pt: string;
  work_title_en: string;
  email: string;
}

export interface LegacyWorkSkill {
  skill_id: number;
  name: string;
  color_hexa: string;
}

export interface LegacyWork {
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  photo: string;
  link_github: string;
  link_project: string;
  main_language_id: number;
  skills: LegacyWorkSkill[];
}

export interface LegacyWorkType {
  service_id: number;
  title_pt: string;
  title_en: string;
  desc_pt: string;
  desc_en: string;
  image: string;
}

export interface InfoDatabase {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  messages: ContactMessage[];
  legacyUser: LegacyUser;
  legacyWorks: LegacyWork[];
  legacySkills: LegacyWorkSkill[];
  legacyWorkTypes: LegacyWorkType[];
}

const initialData: InfoDatabase = {
  profile: {
    name: "Caique Nerivan",
    title: "Desenvolvedor Full Stack & Especialista em Arquitetura",
    bio: "Engenheiro de Software focado em soluções escaláveis, microsserviços e interfaces modernas e intuitivas.",
    about: "Desenvolvedor apaixonado por construir sistemas de alta performance e grande impacto visual. Experiência sólida na criação de ecossistemas web completos, microsserviços performáticos, consumo de APIs e integração contínua.",
    avatarUrl: "https://github.com/caiquenerivan.png",
    email: "caiquenerivan.santos@gmail.com",
    githubUrl: "https://github.com/caiquenerivan",
    linkedinUrl: "https://linkedin.com/in/caiquenerivan",
    location: "São Paulo, Brasil",
    availableForHire: true,
  },
  projects: [
    {
      id: "1",
      title: "Plataforma SaaS Personal Trainr",
      description: "Arquitetura de microsserviços em monorepo com suporte a múltiplos perfis, treinos e autenticação JWT.",
      longDescription: "Sistema SaaS completo construído com React, Node.js e Docker. Integração de microsserviços de treino e autenticação com bancos isolados.",
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "TypeScript", "Node.js", "Microservices", "Docker"],
      githubUrl: "https://github.com/caiquenerivan/personal-trainr",
      liveUrl: "https://personaltrainr.demo",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Dashboard de Métricas Financeiras",
      description: "Interface analítica com gráficos em tempo real, relatórios automatizados e gráficos interativos.",
      longDescription: "Aplicação web de analytics financeiro com integração via WebSockets para atualização instantânea de cotações e relatórios.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "TailwindCSS", "Chart.js", "Express"],
      githubUrl: "https://github.com/caiquenerivan/finance-dashboard",
      liveUrl: "https://finance.demo",
      featured: true,
      createdAt: new Date().toISOString()
    }
  ],
  skills: [
    { id: "1", name: "TypeScript / JavaScript", category: "frontend", level: 95 },
    { id: "2", name: "React & Next.js", category: "frontend", level: 90 },
    { id: "3", name: "Node.js & Express", category: "backend", level: 92 },
    { id: "4", name: "Microsserviços & REST APIs", category: "backend", level: 88 },
    { id: "5", name: "Docker & Linux", category: "devops", level: 80 },
    { id: "6", name: "PostgreSQL & SQLite", category: "database", level: 85 },
    { id: "7", name: "TailwindCSS & CSS3", category: "frontend", level: 90 }
  ],
  experiences: [
    {
      id: "1",
      role: "Desenvolvedor Full Stack Senior",
      company: "Tech Solutions",
      period: "2023 - Presente",
      description: "Liderança técnica na migração de monolito para microsserviços, resultando em 40% de ganho de performance.",
      technologies: ["Node.js", "React", "TypeScript", "Docker", "AWS"]
    },
    {
      id: "2",
      role: "Desenvolvedor Frontend",
      company: "Digital Studio",
      period: "2021 - 2023",
      description: "Construção de aplicações web interativas para grandes clientes, com foco em SEO e acessibilidade.",
      technologies: ["React", "TypeScript", "TailwindCSS", "Next.js"]
    }
  ],
  messages: [],
  legacyUser: {
    user_id: 1,
    username: "caiquenerivan",
    foto: "https://github.com/caiquenerivan.png",
    about_pt: "Desenvolvedor Full Stack apaixonado por construir sistemas de alta performance, microsserviços performáticos e interfaces modernas e intuitivas.",
    about_en: "Full Stack Developer passionate about building high-performance systems, performant microservices and modern intuitive interfaces.",
    work_title_pt: "Desenvolvedor Fullstack | Node.js, React & TypeScript",
    work_title_en: "Fullstack Developer | Node.js, React & TypeScript",
    email: "caiquenerivan.santos@gmail.com"
  },
  legacySkills: [
    { skill_id: 1, name: "TypeScript", color_hexa: "#3178C6" },
    { skill_id: 2, name: "React", color_hexa: "#61DAFB" },
    { skill_id: 3, name: "Node.js", color_hexa: "#339933" },
    { skill_id: 4, name: "Docker", color_hexa: "#2496ED" },
    { skill_id: 5, name: "TailwindCSS", color_hexa: "#06B6D4" },
    { skill_id: 6, name: "Express", color_hexa: "#000000" }
  ],
  legacyWorks: [
    {
      title_pt: "Plataforma SaaS Personal Trainr",
      title_en: "Personal Trainr SaaS Platform",
      description_pt: "Arquitetura de microsserviços em monorepo com suporte a múltiplos perfis, treinos e autenticação JWT.",
      description_en: "Microservices architecture in monorepo supporting multi-roles, workouts, and JWT authentication.",
      photo: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      link_github: "https://github.com/caiquenerivan/personal-trainr",
      link_project: "https://personaltrainr.demo",
      main_language_id: 1,
      skills: [
        { skill_id: 1, name: "TypeScript", color_hexa: "#3178C6" },
        { skill_id: 2, name: "React", color_hexa: "#61DAFB" },
        { skill_id: 3, name: "Node.js", color_hexa: "#339933" },
        { skill_id: 4, name: "Docker", color_hexa: "#2496ED" }
      ]
    },
    {
      title_pt: "Dashboard de Métricas Financeiras",
      title_en: "Financial Metrics Dashboard",
      description_pt: "Interface analítica com gráficos em tempo real, relatórios automatizados e visualizações interativas.",
      description_en: "Analytical interface with real-time charts, automated reports, and interactive visuals.",
      photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      link_github: "https://github.com/caiquenerivan/finance-dashboard",
      link_project: "https://finance.demo",
      main_language_id: 2,
      skills: [
        { skill_id: 2, name: "React", color_hexa: "#61DAFB" },
        { skill_id: 5, name: "TailwindCSS", color_hexa: "#06B6D4" },
        { skill_id: 3, name: "Node.js", color_hexa: "#339933" }
      ]
    },
    {
      title_pt: "Novo Portfólio em Microsserviços",
      title_en: "New Microservices Portfolio",
      description_pt: "Portfólio moderno em monorepo com API Gateway, microsserviços desacoplados e painel de controle.",
      description_en: "Modern monorepo portfolio with API Gateway, decoupled microservices, and control panel.",
      photo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      link_github: "https://github.com/caiquenerivan/novo-portfolio",
      link_project: "http://localhost:5173",
      main_language_id: 1,
      skills: [
        { skill_id: 1, name: "TypeScript", color_hexa: "#3178C6" },
        { skill_id: 2, name: "React", color_hexa: "#61DAFB" },
        { skill_id: 6, name: "Express", color_hexa: "#000000" }
      ]
    }
  ],
  legacyWorkTypes: [
    {
      service_id: 1,
      title_pt: "Desenvolvimento Web & SaaS",
      title_en: "Web & SaaS Development",
      desc_pt: "Criação de aplicações web modernas, responsivas e de alta performance utilizando React, Next.js e TypeScript.",
      desc_en: "Creation of modern, responsive, high-performance web applications using React, Next.js, and TypeScript.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
    },
    {
      service_id: 2,
      title_pt: "Arquitetura de Microsserviços & APIs",
      title_en: "Microservices & API Architecture",
      desc_pt: "Desenvolvimento de APIs RESTful escaláveis, Gateways de autenticação e microsserviços desacoplados em Node.js.",
      desc_en: "Development of scalable RESTful APIs, authentication Gateways, and decoupled microservices in Node.js.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    },
    {
      service_id: 3,
      title_pt: "Otimização de Performance & SEO",
      title_en: "Performance Optimization & SEO",
      desc_pt: "Auditoria de código, melhoria no tempo de carregamento, acessibilidade e SEO avançado para maximizar resultados.",
      desc_en: "Code auditing, load time improvements, accessibility, and advanced SEO strategies for peak results.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    }
  ]
};

function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readDb(): InfoDatabase {
  ensureDirExists(DB_PATH);
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      ...initialData,
      ...parsed,
      legacyUser: parsed.legacyUser || initialData.legacyUser,
      legacyWorks: parsed.legacyWorks || initialData.legacyWorks,
      legacySkills: parsed.legacySkills || initialData.legacySkills,
      legacyWorkTypes: parsed.legacyWorkTypes || initialData.legacyWorkTypes
    };
  } catch {
    return initialData;
  }
}

export function writeDb(data: InfoDatabase): void {
  ensureDirExists(DB_PATH);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
