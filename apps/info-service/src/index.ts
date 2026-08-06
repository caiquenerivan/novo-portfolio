import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readDb, writeDb } from './db';
import { Profile, Project, Skill, Experience, ContactMessage } from '@portfolio/shared-types';

// ─── Whitelist de campos editáveis — evita mass assignment via req.body ────
function pick<T extends object>(source: any, keys: readonly (keyof T)[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    if (source[key] !== undefined) result[key] = source[key];
  }
  return result;
}

const PROFILE_FIELDS = ['name', 'title', 'bio', 'about', 'avatarUrl', 'email', 'githubUrl', 'linkedinUrl', 'location', 'availableForHire'] as const;
const PROJECT_FIELDS = ['title', 'description', 'longDescription', 'imageUrl', 'tags', 'githubUrl', 'liveUrl', 'featured'] as const;

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

app.use(requireInternalSecret);

// ─── Health check ──────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'info-service', timestamp: new Date().toISOString() });
});

// ─── Profile endpoints ─────────────────────────────────────────────────────
app.get('/profile', (_req, res) => {
  const db = readDb();
  res.json(db.profile);
});

app.put('/profile', (req, res) => {
  const db = readDb();
  db.profile = { ...db.profile, ...pick<Profile>(req.body, PROFILE_FIELDS) };
  writeDb(db);
  res.json(db.profile);
});

// ─── Projects endpoints ────────────────────────────────────────────────────
app.get('/projects', (_req, res) => {
  const db = readDb();
  res.json(db.projects);
});

app.post('/projects', (req, res) => {
  const db = readDb();
  const newProject: Project = {
    id: Date.now().toString(),
    title: req.body.title || 'Novo Projeto',
    description: req.body.description || '',
    longDescription: req.body.longDescription || '',
    imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    githubUrl: req.body.githubUrl || '',
    liveUrl: req.body.liveUrl || '',
    featured: req.body.featured || false,
    createdAt: new Date().toISOString()
  };
  db.projects.unshift(newProject);
  writeDb(db);
  res.status(201).json(newProject);
});

app.put('/projects/:id', (req, res) => {
  const db = readDb();
  const idx = db.projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Projeto não encontrado' });
  db.projects[idx] = { ...db.projects[idx], ...pick<Project>(req.body, PROJECT_FIELDS) };
  writeDb(db);
  res.json(db.projects[idx]);
});

app.delete('/projects/:id', (req, res) => {
  const db = readDb();
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: 'Projeto removido com sucesso' });
});

// ─── Skills endpoints ──────────────────────────────────────────────────────
app.get('/skills', (_req, res) => {
  const db = readDb();
  res.json(db.skills);
});

app.post('/skills', (req, res) => {
  const db = readDb();
  const newSkill: Skill = {
    id: Date.now().toString(),
    name: req.body.name || 'Nova Habilidade',
    category: req.body.category || 'frontend',
    level: req.body.level || 80
  };
  db.skills.push(newSkill);
  writeDb(db);
  res.status(201).json(newSkill);
});

app.delete('/skills/:id', (req, res) => {
  const db = readDb();
  db.skills = db.skills.filter(s => s.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// ─── Experiences endpoints ─────────────────────────────────────────────────
app.get('/experiences', (_req, res) => {
  const db = readDb();
  res.json(db.experiences);
});

app.post('/experiences', (req, res) => {
  const db = readDb();
  const newExp: Experience = {
    id: Date.now().toString(),
    role: req.body.role || '',
    company: req.body.company || '',
    period: req.body.period || '',
    description: req.body.description || '',
    technologies: Array.isArray(req.body.technologies) ? req.body.technologies : []
  };
  db.experiences.unshift(newExp);
  writeDb(db);
  res.status(201).json(newExp);
});

app.delete('/experiences/:id', (req, res) => {
  const db = readDb();
  db.experiences = db.experiences.filter(e => e.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// ─── Contact endpoint ──────────────────────────────────────────────────────
app.get('/contact', (_req, res) => {
  const db = readDb();
  res.json(db.messages);
});

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos name, email e message são obrigatórios.' });
  }
  const db = readDb();
  const newMessage: ContactMessage = {
    id: Date.now().toString(),
    name: String(name).slice(0, 100),
    email: String(email).slice(0, 200),
    subject: String(subject || 'Mensagem do Portfólio').slice(0, 200),
    message: String(message).slice(0, 2000),
    createdAt: new Date().toISOString(),
    read: false
  };
  db.messages.unshift(newMessage);
  writeDb(db);
  res.status(201).json({ success: true, message: 'Mensagem enviada com sucesso!' });
});

app.put('/contact/:id', (req, res) => {
  const db = readDb();
  const idx = db.messages.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Mensagem não encontrada' });
  if (typeof req.body.read === 'boolean') {
    db.messages[idx].read = req.body.read;
  }
  writeDb(db);
  res.json(db.messages[idx]);
});

app.delete('/contact/:id', (req, res) => {
  const db = readDb();
  db.messages = db.messages.filter(m => m.id !== req.params.id);
  writeDb(db);
  res.json({ success: true });
});

// ─── Legacy endpoints ──────────────────────────────────────────────────────
app.get('/users/username/:username', (_req, res) => {
  const db = readDb();
  res.json(db.legacyUser);
});

app.get('/works', (_req, res) => {
  const db = readDb();
  res.json(db.legacyWorks);
});

app.get('/work-types', (_req, res) => {
  const db = readDb();
  res.json(db.legacyWorkTypes);
});

// ─── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Info Service] Rodando na porta ${PORT}`);
});
