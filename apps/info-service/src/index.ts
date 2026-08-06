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
const PORT = process.env.PORT || 4001;

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
  res.json({ status: 'ok', service: 'info-service', timestamp: new Date().toISOString() });
});

app.use(requireInternalSecret);

// ─── Profile endpoints ─────────────────────────────────────────────────────
app.get('/profile', async (_req, res) => {
  res.json(await db.getProfile());
});

app.put('/profile', async (req, res) => {
  res.json(await db.updateProfile(req.body));
});

// ─── Projects endpoints ────────────────────────────────────────────────────
app.get('/projects', async (_req, res) => {
  res.json(await db.getProjects());
});

app.post('/projects', async (req, res) => {
  res.status(201).json(await db.createProject(req.body));
});

app.put('/projects/:id', async (req, res) => {
  const updated = await db.updateProject(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Projeto não encontrado' });
  res.json(updated);
});

app.delete('/projects/:id', async (req, res) => {
  await db.deleteProject(req.params.id);
  res.json({ success: true, message: 'Projeto removido com sucesso' });
});

// ─── Skills endpoints ──────────────────────────────────────────────────────
app.get('/skills', async (_req, res) => {
  res.json(await db.getSkills());
});

app.post('/skills', async (req, res) => {
  res.status(201).json(await db.createSkill(req.body));
});

app.delete('/skills/:id', async (req, res) => {
  await db.deleteSkill(req.params.id);
  res.json({ success: true });
});

// ─── Experiences endpoints ─────────────────────────────────────────────────
app.get('/experiences', async (_req, res) => {
  res.json(await db.getExperiences());
});

app.post('/experiences', async (req, res) => {
  res.status(201).json(await db.createExperience(req.body));
});

app.delete('/experiences/:id', async (req, res) => {
  await db.deleteExperience(req.params.id);
  res.json({ success: true });
});

// ─── Contact endpoint ──────────────────────────────────────────────────────
app.get('/contact', async (_req, res) => {
  res.json(await db.getMessages());
});

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos name, email e message são obrigatórios.' });
  }
  await db.createMessage({ name: String(name), email: String(email), subject: String(subject || ''), message: String(message) });
  res.status(201).json({ success: true, message: 'Mensagem enviada com sucesso!' });
});

app.put('/contact/:id', async (req, res) => {
  if (typeof req.body.read !== 'boolean') {
    return res.status(400).json({ error: 'Campo "read" (boolean) é obrigatório.' });
  }
  const updated = await db.updateMessageRead(req.params.id, req.body.read);
  if (!updated) return res.status(404).json({ error: 'Mensagem não encontrada' });
  res.json(updated);
});

app.delete('/contact/:id', async (req, res) => {
  await db.deleteMessage(req.params.id);
  res.json({ success: true });
});

// ─── Legacy endpoints ──────────────────────────────────────────────────────
app.get('/users/username/:username', async (_req, res) => {
  res.json(await db.getLegacyUser());
});

app.get('/works', async (_req, res) => {
  res.json(await db.getLegacyWorks());
});

app.get('/work-types', async (_req, res) => {
  res.json(await db.getLegacyWorkTypes());
});

// ─── Start ─────────────────────────────────────────────────────────────────
db.initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Info Service] Rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[FATAL] Falha ao inicializar o banco de dados:', err);
    process.exit(1);
  });
