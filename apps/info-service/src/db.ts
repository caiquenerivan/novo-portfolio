import { Pool } from 'pg';
import { Profile, Project, Skill, Experience, ContactMessage } from '@portfolio/shared-types';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[FATAL] DATABASE_URL não definido. Configure a connection string do Neon no .env');
  process.exit(1);
}

// A connection string do Neon já traz "?sslmode=require" — o driver `pg`
// respeita esse parâmetro sozinho, não precisa de config de ssl extra aqui.
export const pool = new Pool({ connectionString: DATABASE_URL });

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

// ─── Schema — idempotente, roda toda vez que o serviço sobe ────────────────
const SCHEMA_SQL = `
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

  CREATE TABLE IF NOT EXISTS profile (
    id INT PRIMARY KEY DEFAULT 1,
    name TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL DEFAULT '',
    bio TEXT NOT NULL DEFAULT '',
    about TEXT NOT NULL DEFAULT '',
    avatar_url TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    github_url TEXT NOT NULL DEFAULT '',
    linkedin_url TEXT NOT NULL DEFAULT '',
    location TEXT NOT NULL DEFAULT '',
    available_for_hire BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT profile_single_row CHECK (id = 1)
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    long_description TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    tags TEXT[] NOT NULL DEFAULT '{}',
    github_url TEXT NOT NULL DEFAULT '',
    live_url TEXT NOT NULL DEFAULT '',
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'frontend',
    level INT NOT NULL DEFAULT 80
  );

  CREATE TABLE IF NOT EXISTS experiences (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    technologies TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    read BOOLEAN NOT NULL DEFAULT false
  );

  -- Tabelas legadas — ainda usadas por componentes antigos do frontend
  -- (Carousel, ListUsers, Portfolio) que consomem /users, /works, /work-types.
  CREATE TABLE IF NOT EXISTS legacy_user (
    user_id INT PRIMARY KEY DEFAULT 1,
    username TEXT NOT NULL DEFAULT '',
    foto TEXT NOT NULL DEFAULT '',
    about_pt TEXT NOT NULL DEFAULT '',
    about_en TEXT NOT NULL DEFAULT '',
    work_title_pt TEXT NOT NULL DEFAULT '',
    work_title_en TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS legacy_works (
    id SERIAL PRIMARY KEY,
    title_pt TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_pt TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    photo TEXT NOT NULL DEFAULT '',
    link_github TEXT NOT NULL DEFAULT '',
    link_project TEXT NOT NULL DEFAULT '',
    main_language_id INT NOT NULL DEFAULT 1,
    skills JSONB NOT NULL DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS legacy_work_types (
    service_id SERIAL PRIMARY KEY,
    title_pt TEXT NOT NULL,
    title_en TEXT NOT NULL,
    desc_pt TEXT NOT NULL DEFAULT '',
    desc_en TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT ''
  );
`;

async function seedIfEmpty(): Promise<void> {
  const { rows: profileRows } = await pool.query('SELECT 1 FROM profile WHERE id = 1');
  if (profileRows.length === 0) {
    await pool.query(
      `INSERT INTO profile (id, name, title, bio, about, avatar_url, email, github_url, linkedin_url, location, available_for_hire)
       VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        'Caique Nerivan',
        'Desenvolvedor Full Stack & Especialista em Arquitetura',
        'Engenheiro de Software focado em soluções escaláveis, microsserviços e interfaces modernas e intuitivas.',
        'Desenvolvedor apaixonado por construir sistemas de alta performance e grande impacto visual. Experiência sólida na criação de ecossistemas web completos, microsserviços performáticos, consumo de APIs e integração contínua.',
        'https://github.com/caiquenerivan.png',
        'caiquenerivan.santos@gmail.com',
        'https://github.com/caiquenerivan',
        'https://linkedin.com/in/caiquenerivan',
        'São Paulo, Brasil',
        true
      ]
    );
  }

  const { rows: projectRows } = await pool.query('SELECT 1 FROM projects LIMIT 1');
  if (projectRows.length === 0) {
    await pool.query(
      `INSERT INTO projects (title, description, long_description, image_url, tags, github_url, live_url, featured)
       VALUES
       ($1, $2, $3, $4, $5, $6, $7, true),
       ($8, $9, $10, $11, $12, $13, $14, true)`,
      [
        'Plataforma SaaS Personal Trainr',
        'Arquitetura de microsserviços em monorepo com suporte a múltiplos perfis, treinos e autenticação JWT.',
        'Sistema SaaS completo construído com React, Node.js e Docker. Integração de microsserviços de treino e autenticação com bancos isolados.',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
        ['React', 'TypeScript', 'Node.js', 'Microservices', 'Docker'],
        'https://github.com/caiquenerivan/personal-trainr',
        'https://personaltrainr.demo',
        'Dashboard de Métricas Financeiras',
        'Interface analítica com gráficos em tempo real, relatórios automatizados e gráficos interativos.',
        'Aplicação web de analytics financeiro com integração via WebSockets para atualização instantânea de cotações e relatórios.',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        ['React', 'TailwindCSS', 'Chart.js', 'Express'],
        'https://github.com/caiquenerivan/finance-dashboard',
        'https://finance.demo'
      ]
    );
  }

  const { rows: skillRows } = await pool.query('SELECT 1 FROM skills LIMIT 1');
  if (skillRows.length === 0) {
    const seedSkills: [string, Skill['category'], number][] = [
      ['TypeScript / JavaScript', 'frontend', 95],
      ['React & Next.js', 'frontend', 90],
      ['Node.js & Express', 'backend', 92],
      ['Microsserviços & REST APIs', 'backend', 88],
      ['Docker & Linux', 'devops', 80],
      ['PostgreSQL & SQLite', 'database', 85],
      ['TailwindCSS & CSS3', 'frontend', 90]
    ];
    for (const [name, category, level] of seedSkills) {
      await pool.query('INSERT INTO skills (name, category, level) VALUES ($1, $2, $3)', [name, category, level]);
    }
  }

  const { rows: expRows } = await pool.query('SELECT 1 FROM experiences LIMIT 1');
  if (expRows.length === 0) {
    await pool.query(
      `INSERT INTO experiences (role, company, period, description, technologies) VALUES
       ($1, $2, $3, $4, $5), ($6, $7, $8, $9, $10)`,
      [
        'Desenvolvedor Full Stack Senior', 'Tech Solutions', '2023 - Presente',
        'Liderança técnica na migração de monolito para microsserviços, resultando em 40% de ganho de performance.',
        ['Node.js', 'React', 'TypeScript', 'Docker', 'AWS'],
        'Desenvolvedor Frontend', 'Digital Studio', '2021 - 2023',
        'Construção de aplicações web interativas para grandes clientes, com foco em SEO e acessibilidade.',
        ['React', 'TypeScript', 'TailwindCSS', 'Next.js']
      ]
    );
  }

  const { rows: legacyUserRows } = await pool.query('SELECT 1 FROM legacy_user WHERE user_id = 1');
  if (legacyUserRows.length === 0) {
    await pool.query(
      `INSERT INTO legacy_user (user_id, username, foto, about_pt, about_en, work_title_pt, work_title_en, email)
       VALUES (1, $1, $2, $3, $4, $5, $6, $7)`,
      [
        'caiquenerivan',
        'https://github.com/caiquenerivan.png',
        'Desenvolvedor Full Stack apaixonado por construir sistemas de alta performance, microsserviços performáticos e interfaces modernas e intuitivas.',
        'Full Stack Developer passionate about building high-performance systems, performant microservices and modern intuitive interfaces.',
        'Desenvolvedor Fullstack | Node.js, React & TypeScript',
        'Fullstack Developer | Node.js, React & TypeScript',
        'caiquenerivan.santos@gmail.com'
      ]
    );
  }

  const { rows: legacyWorksRows } = await pool.query('SELECT 1 FROM legacy_works LIMIT 1');
  if (legacyWorksRows.length === 0) {
    const works: [string, string, string, string, string, string, string, number, LegacyWorkSkill[]][] = [
      [
        'Plataforma SaaS Personal Trainr', 'Personal Trainr SaaS Platform',
        'Arquitetura de microsserviços em monorepo com suporte a múltiplos perfis, treinos e autenticação JWT.',
        'Microservices architecture in monorepo supporting multi-roles, workouts, and JWT authentication.',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
        'https://github.com/caiquenerivan/personal-trainr', 'https://personaltrainr.demo', 1,
        [
          { skill_id: 1, name: 'TypeScript', color_hexa: '#3178C6' },
          { skill_id: 2, name: 'React', color_hexa: '#61DAFB' },
          { skill_id: 3, name: 'Node.js', color_hexa: '#339933' },
          { skill_id: 4, name: 'Docker', color_hexa: '#2496ED' }
        ]
      ],
      [
        'Dashboard de Métricas Financeiras', 'Financial Metrics Dashboard',
        'Interface analítica com gráficos em tempo real, relatórios automatizados e visualizações interativas.',
        'Analytical interface with real-time charts, automated reports, and interactive visuals.',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        'https://github.com/caiquenerivan/finance-dashboard', 'https://finance.demo', 2,
        [
          { skill_id: 2, name: 'React', color_hexa: '#61DAFB' },
          { skill_id: 5, name: 'TailwindCSS', color_hexa: '#06B6D4' },
          { skill_id: 3, name: 'Node.js', color_hexa: '#339933' }
        ]
      ],
      [
        'Novo Portfólio em Microsserviços', 'New Microservices Portfolio',
        'Portfólio moderno em monorepo com API Gateway, microsserviços desacoplados e painel de controle.',
        'Modern monorepo portfolio with API Gateway, decoupled microservices, and control panel.',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        'https://github.com/caiquenerivan/novo-portfolio', 'https://nerivan.site', 1,
        [
          { skill_id: 1, name: 'TypeScript', color_hexa: '#3178C6' },
          { skill_id: 2, name: 'React', color_hexa: '#61DAFB' },
          { skill_id: 6, name: 'Express', color_hexa: '#000000' }
        ]
      ]
    ];
    for (const w of works) {
      await pool.query(
        `INSERT INTO legacy_works (title_pt, title_en, description_pt, description_en, photo, link_github, link_project, main_language_id, skills)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [...w.slice(0, 8), JSON.stringify(w[8])]
      );
    }
  }

  const { rows: legacyWorkTypesRows } = await pool.query('SELECT 1 FROM legacy_work_types LIMIT 1');
  if (legacyWorkTypesRows.length === 0) {
    const workTypes: [string, string, string, string, string][] = [
      ['Desenvolvimento Web & SaaS', 'Web & SaaS Development',
        'Criação de aplicações web modernas, responsivas e de alta performance utilizando React, Next.js e TypeScript.',
        'Creation of modern, responsive, high-performance web applications using React, Next.js, and TypeScript.',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'],
      ['Arquitetura de Microsserviços & APIs', 'Microservices & API Architecture',
        'Desenvolvimento de APIs RESTful escaláveis, Gateways de autenticação e microsserviços desacoplados em Node.js.',
        'Development of scalable RESTful APIs, authentication Gateways, and decoupled microservices in Node.js.',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop'],
      ['Otimização de Performance & SEO', 'Performance Optimization & SEO',
        'Auditoria de código, melhoria no tempo de carregamento, acessibilidade e SEO avançado para maximizar resultados.',
        'Code auditing, load time improvements, accessibility, and advanced SEO strategies for peak results.',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop']
    ];
    for (const t of workTypes) {
      await pool.query(
        `INSERT INTO legacy_work_types (title_pt, title_en, desc_pt, desc_en, image) VALUES ($1, $2, $3, $4, $5)`,
        t
      );
    }
  }
}

// Corrida benigna: se dois serviços sobem ao mesmo tempo contra um banco
// novo, os dois tentam criar a extensão/tabelas simultaneamente e um perde
// a corrida — mesmo com "IF NOT EXISTS" (é uma race condition conhecida do
// Postgres em DDL concorrente). Esses códigos só significam "outro processo
// já criou isso", não um erro de verdade.
const BENIGN_RACE_CODES = new Set(['23505', '42710', '42P07']);

async function runSchemaIdempotent(sql: string): Promise<void> {
  try {
    await pool.query(sql);
  } catch (err: any) {
    if (BENIGN_RACE_CODES.has(err.code)) {
      console.warn('[info-service/db] Corrida benigna na criação do schema, ignorando:', err.detail || err.message);
      return;
    }
    throw err;
  }
}

export async function initDb(): Promise<void> {
  await runSchemaIdempotent(SCHEMA_SQL);
  await seedIfEmpty();
}

// ─── Mapeamento snake_case (Postgres) → camelCase (tipos compartilhados) ───
function rowToProfile(r: any): Profile {
  return {
    name: r.name, title: r.title, bio: r.bio, about: r.about,
    avatarUrl: r.avatar_url, email: r.email, githubUrl: r.github_url,
    linkedinUrl: r.linkedin_url, location: r.location, availableForHire: r.available_for_hire
  };
}

function rowToProject(r: any): Project {
  return {
    id: r.id, title: r.title, description: r.description, longDescription: r.long_description,
    imageUrl: r.image_url, tags: r.tags, githubUrl: r.github_url, liveUrl: r.live_url,
    featured: r.featured, createdAt: r.created_at.toISOString()
  };
}

function rowToSkill(r: any): Skill {
  return { id: r.id, name: r.name, category: r.category, level: r.level };
}

function rowToExperience(r: any): Experience {
  return { id: r.id, role: r.role, company: r.company, period: r.period, description: r.description, technologies: r.technologies };
}

function rowToMessage(r: any): ContactMessage {
  return { id: r.id, name: r.name, email: r.email, subject: r.subject, message: r.message, createdAt: r.created_at.toISOString(), read: r.read };
}

// ─── Profile ────────────────────────────────────────────────────────────────
export async function getProfile(): Promise<Profile> {
  const { rows } = await pool.query('SELECT * FROM profile WHERE id = 1');
  return rowToProfile(rows[0]);
}

export async function updateProfile(fields: Partial<Profile>): Promise<Profile> {
  const current = await getProfile();
  const merged = { ...current, ...fields };
  const { rows } = await pool.query(
    `UPDATE profile SET name=$1, title=$2, bio=$3, about=$4, avatar_url=$5, email=$6,
       github_url=$7, linkedin_url=$8, location=$9, available_for_hire=$10
     WHERE id = 1 RETURNING *`,
    [merged.name, merged.title, merged.bio, merged.about, merged.avatarUrl, merged.email,
     merged.githubUrl, merged.linkedinUrl, merged.location, merged.availableForHire]
  );
  return rowToProfile(rows[0]);
}

// ─── Projects ───────────────────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const { rows } = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
  return rows.map(rowToProject);
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const { rows } = await pool.query(
    `INSERT INTO projects (title, description, long_description, image_url, tags, github_url, live_url, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      data.title || 'Novo Projeto', data.description || '', data.longDescription || '',
      data.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      data.tags || [], data.githubUrl || '', data.liveUrl || '', data.featured || false
    ]
  );
  return rowToProject(rows[0]);
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  const { rows: existingRows } = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
  if (existingRows.length === 0) return null;
  const current = rowToProject(existingRows[0]);
  const merged = { ...current, ...data };
  const { rows } = await pool.query(
    `UPDATE projects SET title=$1, description=$2, long_description=$3, image_url=$4, tags=$5, github_url=$6, live_url=$7, featured=$8
     WHERE id = $9 RETURNING *`,
    [merged.title, merged.description, merged.longDescription, merged.imageUrl, merged.tags, merged.githubUrl, merged.liveUrl, merged.featured, id]
  );
  return rowToProject(rows[0]);
}

export async function deleteProject(id: string): Promise<void> {
  await pool.query('DELETE FROM projects WHERE id = $1', [id]);
}

// ─── Skills ─────────────────────────────────────────────────────────────────
export async function getSkills(): Promise<Skill[]> {
  const { rows } = await pool.query('SELECT * FROM skills ORDER BY name');
  return rows.map(rowToSkill);
}

export async function createSkill(data: Partial<Skill>): Promise<Skill> {
  const { rows } = await pool.query(
    'INSERT INTO skills (name, category, level) VALUES ($1, $2, $3) RETURNING *',
    [data.name || 'Nova Habilidade', data.category || 'frontend', data.level ?? 80]
  );
  return rowToSkill(rows[0]);
}

export async function deleteSkill(id: string): Promise<void> {
  await pool.query('DELETE FROM skills WHERE id = $1', [id]);
}

// ─── Experiences ────────────────────────────────────────────────────────────
export async function getExperiences(): Promise<Experience[]> {
  const { rows } = await pool.query('SELECT * FROM experiences ORDER BY created_at DESC');
  return rows.map(rowToExperience);
}

export async function createExperience(data: Partial<Experience>): Promise<Experience> {
  const { rows } = await pool.query(
    'INSERT INTO experiences (role, company, period, description, technologies) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [data.role || '', data.company || '', data.period || '', data.description || '', data.technologies || []]
  );
  return rowToExperience(rows[0]);
}

export async function deleteExperience(id: string): Promise<void> {
  await pool.query('DELETE FROM experiences WHERE id = $1', [id]);
}

// ─── Contact messages ───────────────────────────────────────────────────────
export async function getMessages(): Promise<ContactMessage[]> {
  const { rows } = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  return rows.map(rowToMessage);
}

export async function createMessage(data: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> {
  const { rows } = await pool.query(
    `INSERT INTO contact_messages (name, email, subject, message)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.name.slice(0, 100), data.email.slice(0, 200), (data.subject || 'Mensagem do Portfólio').slice(0, 200), data.message.slice(0, 2000)]
  );
  return rowToMessage(rows[0]);
}

export async function updateMessageRead(id: string, read: boolean): Promise<ContactMessage | null> {
  const { rows } = await pool.query('UPDATE contact_messages SET read = $1 WHERE id = $2 RETURNING *', [read, id]);
  return rows.length ? rowToMessage(rows[0]) : null;
}

export async function deleteMessage(id: string): Promise<void> {
  await pool.query('DELETE FROM contact_messages WHERE id = $1', [id]);
}

// ─── Legacy ─────────────────────────────────────────────────────────────────
export async function getLegacyUser(): Promise<LegacyUser> {
  const { rows } = await pool.query('SELECT * FROM legacy_user WHERE user_id = 1');
  return rows[0];
}

export async function getLegacyWorks(): Promise<LegacyWork[]> {
  const { rows } = await pool.query('SELECT * FROM legacy_works ORDER BY id');
  return rows;
}

export async function getLegacyWorkTypes(): Promise<LegacyWorkType[]> {
  const { rows } = await pool.query('SELECT * FROM legacy_work_types ORDER BY service_id');
  return rows;
}
