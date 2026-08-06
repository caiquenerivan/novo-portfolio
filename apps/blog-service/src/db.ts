import { Pool } from 'pg';
import { BlogPost } from '@portfolio/shared-types';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[FATAL] DATABASE_URL não definido. Configure a connection string do Neon no .env');
  process.exit(1);
}

// A connection string do Neon já traz "?sslmode=require" — o driver `pg`
// respeita esse parâmetro sozinho, não precisa de config de ssl extra aqui.
export const pool = new Pool({ connectionString: DATABASE_URL });

const SCHEMA_SQL = `
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    cover_image TEXT NOT NULL DEFAULT '',
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    published BOOLEAN NOT NULL DEFAULT true,
    tags TEXT[] NOT NULL DEFAULT '{}',
    read_time_minutes INT NOT NULL DEFAULT 1
  );
`;

async function seedIfEmpty(): Promise<void> {
  const { rows } = await pool.query('SELECT 1 FROM posts LIMIT 1');
  if (rows.length > 0) return;

  await pool.query(
    `INSERT INTO posts (slug, title, summary, content, cover_image, published, tags, read_time_minutes) VALUES
     ($1, $2, $3, $4, $5, true, $6, 5),
     ($7, $8, $9, $10, $11, true, $12, 4)`,
    [
      'construindo-microsservicos-com-node-e-react',
      'Construindo Microsserviços com Node.js e React em um Monorepo',
      'Descubra como estruturar uma arquitetura escalável utilizando npm workspaces, Express e React de maneira simples e desacoplada.',
      `
# Arquitetura de Microsserviços com Node.js e React

A arquitetura de microsserviços oferece extrema flexibilidade para escalar aplicações web modernas. Neste artigo, exploramos como separar as responsabilidades do backend em serviços independentes.

## Por que usar Microsserviços no Portfólio?

1. **Desacoplamento de Responsabilidades**: O serviço de informações pessoais não interfere com a gestão de posts do blog.
2. **Independência de Deploy**: Cada microsserviço pode rodar e ser escalado de forma independente.
3. **Organização em Monorepo**: Com utilitários de workspaces, compartilhamos tipos TypeScript facilmente entre o frontend e backend.

\`\`\`typescript
export interface BlogPost {
  id: string;
  title: string;
  content: string;
}
\`\`\`

## Conclusão

Trabalhar com microsserviços nos permite evoluir a aplicação com segurança e manutencibilidade a longo prazo.
      `,
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      ['Node.js', 'Microservices', 'React', 'TypeScript'],
      'guia-de-boas-praticas-de-design-ui-ux',
      'Guia de Boas Práticas de UI/UX em Aplicações Web Modernas',
      'Aprenda como aplicar conceitos avançados de tipografia, contraste e micro-animações para criar experiências memoráveis aos usuários.',
      `
# Dicas Essenciais de UI/UX para Desenvolvedores

A primeira impressão de um usuário ao acessar seu site ou aplicativo define a taxa de retenção.

## 1. Tipografia e Legibilidade
Use fontes modernas como Inter ou Outfit e mantenha uma hierarquia visual clara.

## 2. Cores e Contraste
Evite cores padrão do navegador. Utilize paletas HSL personalizadas e suporte nativo a Dark Mode.

## 3. Micro-animações
Animações sutis ao passar o mouse ou clicar em botões tornam a interface viva e engajante.
      `,
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
      ['UI/UX', 'CSS', 'Frontend', 'Design']
    ]
  );
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
      console.warn('[blog-service/db] Corrida benigna na criação do schema, ignorando:', err.detail || err.message);
      return;
    }
    throw err;
  }
}

export async function initDb(): Promise<void> {
  await runSchemaIdempotent(SCHEMA_SQL);
  await seedIfEmpty();
}

function rowToPost(r: any): BlogPost {
  return {
    id: r.id, slug: r.slug, title: r.title, summary: r.summary, content: r.content,
    coverImage: r.cover_image, publishedAt: r.published_at.toISOString(), published: r.published,
    tags: r.tags, readTimeMinutes: r.read_time_minutes
  };
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function readTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(' ').length / 200));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { rows } = await pool.query('SELECT * FROM posts ORDER BY published_at DESC');
  return rows.map(rowToPost);
}

export async function getPublishedPosts(filters: { tag?: string; search?: string }): Promise<BlogPost[]> {
  const conditions: string[] = ['published = true'];
  const params: any[] = [];

  if (filters.tag) {
    params.push(filters.tag.toLowerCase());
    conditions.push(`EXISTS (SELECT 1 FROM unnest(tags) t WHERE lower(t) = $${params.length})`);
  }
  if (filters.search) {
    params.push(`%${filters.search.toLowerCase()}%`);
    conditions.push(`(lower(title) LIKE $${params.length} OR lower(summary) LIKE $${params.length})`);
  }

  const { rows } = await pool.query(
    `SELECT * FROM posts WHERE ${conditions.join(' AND ')} ORDER BY published_at DESC`,
    params
  );
  return rows.map(rowToPost);
}

export async function getPublishedPostBySlugOrId(slugOrId: string): Promise<BlogPost | null> {
  const { rows } = await pool.query(
    'SELECT * FROM posts WHERE (slug = $1 OR id = $1) AND published = true',
    [slugOrId]
  );
  return rows.length ? rowToPost(rows[0]) : null;
}

export async function createPost(data: Partial<BlogPost>): Promise<BlogPost> {
  const title = data.title || 'Novo Artigo';
  const slug = data.slug || slugify(title);
  const content = data.content || '';
  const { rows } = await pool.query(
    `INSERT INTO posts (slug, title, summary, content, cover_image, published, tags, read_time_minutes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      slug, title, data.summary || '', content,
      data.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
      data.published ?? true, data.tags || [], readTime(content)
    ]
  );
  return rowToPost(rows[0]);
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const { rows: existingRows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  if (existingRows.length === 0) return null;
  const current = rowToPost(existingRows[0]);
  const merged = { ...current, ...data };
  const readTimeMinutes = data.content ? readTime(data.content) : current.readTimeMinutes;

  const { rows } = await pool.query(
    `UPDATE posts SET slug=$1, title=$2, summary=$3, content=$4, cover_image=$5, published=$6, tags=$7, read_time_minutes=$8
     WHERE id = $9 RETURNING *`,
    [merged.slug, merged.title, merged.summary, merged.content, merged.coverImage, merged.published, merged.tags, readTimeMinutes, id]
  );
  return rowToPost(rows[0]);
}

export async function deletePost(id: string): Promise<void> {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
}
