import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as db from './db';

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

// ─── Health check — antes do middleware de secret, de propósito ────────────
// Não expõe nada sensível (só "estou de pé"), e precisa ser público pro
// health check do Docker/Render (que não manda o x-internal-secret) conseguir bater aqui.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'blog-service', timestamp: new Date().toISOString() });
});

app.use(requireInternalSecret);

// ─── Admin — lista todos os posts, incluindo rascunhos ─────────────────────
app.get('/admin/posts', async (_req, res) => {
  res.json(await db.getAllPosts());
});

// ─── Blog endpoints ────────────────────────────────────────────────────────
app.get('/posts', async (req, res) => {
  const tag = req.query.tag ? String(req.query.tag) : undefined;
  const search = req.query.search ? String(req.query.search) : undefined;
  res.json(await db.getPublishedPosts({ tag, search }));
});

app.get('/posts/:slugOrId', async (req, res) => {
  const post = await db.getPublishedPostBySlugOrId(req.params.slugOrId);
  if (!post) return res.status(404).json({ error: 'Artigo não encontrado' });
  res.json(post);
});

app.post('/posts', async (req, res) => {
  res.status(201).json(await db.createPost(req.body));
});

app.put('/posts/:id', async (req, res) => {
  const updated = await db.updatePost(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Artigo não encontrado' });
  res.json(updated);
});

app.delete('/posts/:id', async (req, res) => {
  await db.deletePost(req.params.id);
  res.json({ success: true, message: 'Artigo removido com sucesso' });
});

// ─── Start ─────────────────────────────────────────────────────────────────
db.initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Blog Service] Rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[FATAL] Falha ao inicializar o banco de dados:', err);
    process.exit(1);
  });
