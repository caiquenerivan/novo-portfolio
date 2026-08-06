import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readDb, writeDb } from './db';
import { BlogPost } from '@portfolio/shared-types';

// ─── Whitelist de campos editáveis — evita mass assignment via req.body ────
function pick<T extends object>(source: any, keys: readonly (keyof T)[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    if (source[key] !== undefined) result[key] = source[key];
  }
  return result;
}

const POST_FIELDS = ['slug', 'title', 'summary', 'content', 'coverImage', 'published', 'tags'] as const;

// ─── Validação de variáveis de ambiente obrigatórias ───────────────────────
const INTERNAL_SECRET = process.env.INTERNAL_SECRET;
if (!INTERNAL_SECRET) {
  console.error('[FATAL] INTERNAL_SECRET não definido. Configure o arquivo .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors({ origin: false })); // Microsserviço interno — não aceita requisições de browsers
app.use(express.json({ limit: '50kb' }));

// ─── Middleware: aceita apenas requisições do API Gateway ──────────────────
function requireInternalSecret(req: express.Request, res: express.Response, next: express.NextFunction) {
  const secret = req.headers['x-internal-secret'];
  if (secret !== INTERNAL_SECRET) {
    return res.status(403).json({ error: 'Acesso negado. Apenas o API Gateway pode acessar este serviço.' });
  }
  next();
}

app.use(requireInternalSecret);

// ─── Health check ──────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'blog-service', timestamp: new Date().toISOString() });
});

// ─── Admin — lista todos os posts, incluindo rascunhos ─────────────────────
// Protegido pelo x-internal-secret (como todo o resto deste serviço) + pelo
// gateway, que exige JWT de admin antes de encaminhar pra cá.
app.get('/admin/posts', (_req, res) => {
  const db = readDb();
  res.json(db.posts);
});

// ─── Blog endpoints ────────────────────────────────────────────────────────
app.get('/posts', (req, res) => {
  const db = readDb();
  let posts = db.posts.filter(p => p.published);

  if (req.query.tag) {
    const tag = String(req.query.tag).toLowerCase();
    posts = posts.filter(p => p.tags.some(t => t.toLowerCase() === tag));
  }

  if (req.query.search) {
    const q = String(req.query.search).toLowerCase();
    posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q));
  }

  res.json(posts);
});

app.get('/posts/:slugOrId', (req, res) => {
  const db = readDb();
  const { slugOrId } = req.params;
  const post = db.posts.find(p => (p.slug === slugOrId || p.id === slugOrId) && p.published);
  if (!post) return res.status(404).json({ error: 'Artigo não encontrado' });
  res.json(post);
});

app.post('/posts', (req, res) => {
  const db = readDb();
  const title = req.body.title || 'Novo Artigo';
  const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const newPost: BlogPost = {
    id: Date.now().toString(),
    slug,
    title,
    summary: req.body.summary || '',
    content: req.body.content || '',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    publishedAt: new Date().toISOString(),
    published: req.body.published ?? true,
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    readTimeMinutes: Math.max(1, Math.ceil((req.body.content || '').split(' ').length / 200))
  };

  db.posts.unshift(newPost);
  writeDb(db);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
  const db = readDb();
  const idx = db.posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Artigo não encontrado' });

  const updates = pick<BlogPost>(req.body, POST_FIELDS);
  if (updates.content) {
    updates.readTimeMinutes = Math.max(1, Math.ceil(updates.content.split(' ').length / 200));
  }

  db.posts[idx] = { ...db.posts[idx], ...updates };
  writeDb(db);
  res.json(db.posts[idx]);
});

app.delete('/posts/:id', (req, res) => {
  const db = readDb();
  db.posts = db.posts.filter(p => p.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: 'Artigo removido com sucesso' });
});

// ─── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Blog Service] Rodando na porta ${PORT}`);
});
