import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// ─── Validação de variáveis de ambiente obrigatórias ───────────────────────
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;
const INTERNAL_SECRET = process.env.INTERNAL_SECRET;

if (!JWT_SECRET || !ADMIN_USER || !ADMIN_PASS_HASH || !INTERNAL_SECRET) {
  console.error('[FATAL] Variáveis de ambiente obrigatórias ausentes: JWT_SECRET, ADMIN_USER, ADMIN_PASS_HASH, INTERNAL_SECRET');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 4000;

// Serviços internos (Render "Private Service" expõe só "host:porta", sem
// esquema — normaliza pra sempre ter um http:// na frente).
function normalizeServiceUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `http://${url}`;
}
const INFO_SERVICE_URL = normalizeServiceUrl(process.env.INFO_SERVICE_URL || 'http://localhost:4001');
const BLOG_SERVICE_URL = normalizeServiceUrl(process.env.BLOG_SERVICE_URL || 'http://localhost:4002');

// ─── CORS — origens explícitas apenas ──────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
  },
  credentials: true
}));

// ─── Helmet — headers de segurança HTTP ────────────────────────────────────
app.use(helmet({
  crossOriginEmbedderPolicy: false
}));

// ─── Body limit — protege contra JSON bombs ────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());

// ─── Domínio do cookie ──────────────────────────────────────────────────────
// Em produção, front (nerivan.site) e back (api.nerivan.site) são subdomínios
// do mesmo domínio raiz — setando o cookie em ".nerivan.site" ele fica visível
// para os dois, e continua "same-site" (SameSite=Lax funciona de verdade).
// Em dev NÃO seta domain: com domain ausente, o cookie fica preso ao host que
// respondeu (localhost) — se setássemos ".nerivan.site" aqui, o cookie do
// login simplesmente não seria gravado no localhost.
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN; // ex: ".nerivan.site" — só em produção
const baseCookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias — mesmo prazo do JWT
  path: '/',
  ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {})
};

// ─── Cookie do token — httpOnly (inacessível a JS, protege contra roubo via XSS) ──
const AUTH_COOKIE = 'admin_token';
const authCookieOptions = {
  ...baseCookieOptions,
  httpOnly: true
};

// ─── CSRF — double-submit cookie ───────────────────────────────────────────
// SameSite=Lax no cookie de sessão já bloqueia a maioria dos ataques CSRF,
// mas isso é uma segunda camada: o cookie csrf_token NÃO é httpOnly (o
// frontend precisa lê-lo) e o cliente deve ecoá-lo de volta no header
// x-csrf-token. Um site atacante não tem como ler o cookie da vítima
// (Same-Origin Policy), então não consegue montar esse header.
const CSRF_COOKIE = 'csrf_token';
function issueCsrfCookie(res: Response): string {
  const csrfToken = crypto.randomBytes(32).toString('hex');
  res.cookie(CSRF_COOKIE, csrfToken, { ...baseCookieOptions, httpOnly: false });
  return csrfToken;
}

function verifyCsrf(req: Request, res: Response, next: NextFunction) {
  const cookieToken = req.cookies?.[CSRF_COOKIE];
  const headerToken = req.headers['x-csrf-token'];
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'Token CSRF ausente ou inválido.' });
  }
  next();
}

// ─── Rate Limiting — brute force no login ──────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,                   // máximo 10 tentativas
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' }
});

// ─── Rate Limiting — evita spam no formulário de contato ───────────────────
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5,                    // máximo 5 mensagens por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas mensagens enviadas. Tente novamente mais tarde.' }
});

// ─── Helper: injetar segredo interno nas requisições aos microsserviços ────
const internalHeaders = {
  'Content-Type': 'application/json',
  'x-internal-secret': INTERNAL_SECRET
};

// ─── Rotas GET que NUNCA são públicas, mesmo a regra geral sendo "GET é público" ──
const PROTECTED_GET_PREFIXES = [
  '/api/auth',           // sessão do admin
  '/api/info/contact',   // mensagens de contato (dados pessoais)
  '/api/blog/admin'      // lista de posts incluindo rascunhos
];

// ─── Middleware de autenticação JWT ────────────────────────────────────────
function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  // Envio público do formulário de contato — não requer login
  if (req.method === 'POST' && req.path === '/api/info/contact') {
    return next();
  }

  // Leitura pública dos demais dados do portfólio
  const isProtectedGet = PROTECTED_GET_PREFIXES.some(prefix => req.path.startsWith(prefix));
  if (req.method === 'GET' && !isProtectedGet) {
    return next();
  }

  const token = req.cookies?.[AUTH_COOKIE];
  if (!token) {
    return res.status(401).json({ error: 'Acesso não autorizado. Faça login para continuar.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    (req as any).user = decoded;
  } catch {
    return res.status(401).json({ error: 'Sessão expirada ou inválida.' });
  }

  // GET autenticado (ex: /api/auth/me) não muda estado — não precisa de CSRF.
  if (req.method === 'GET') {
    return next();
  }

  // A partir daqui a requisição está autenticada e vai alterar estado
  // (POST/PUT/DELETE) — exige o token CSRF de double-submit.
  return verifyCsrf(req, res, next);
}

// ─── Health check ──────────────────────────────────────────────────────────
app.get('/health', async (_req, res) => {
  let infoStatus = 'down';
  let blogStatus = 'down';

  try {
    await axios.get(`${INFO_SERVICE_URL}/health`, { headers: { 'x-internal-secret': INTERNAL_SECRET } });
    infoStatus = 'up';
  } catch {}

  try {
    await axios.get(`${BLOG_SERVICE_URL}/health`, { headers: { 'x-internal-secret': INTERNAL_SECRET } });
    blogStatus = 'up';
  } catch {}

  res.json({ status: 'ok', gateway: 'up', services: { infoService: infoStatus, blogService: blogStatus } });
});

// ─── Auth Routes ───────────────────────────────────────────────────────────
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  const validPassword = await bcrypt.compare(password, ADMIN_PASS_HASH!);
  if (username === ADMIN_USER && validPassword) {
    const token = jwt.sign({ username: ADMIN_USER, role: 'admin' }, JWT_SECRET!, { expiresIn: '7d' });
    res.cookie(AUTH_COOKIE, token, authCookieOptions);
    issueCsrfCookie(res);
    return res.json({ user: { username: ADMIN_USER, role: 'admin' } });
  }

  return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie(AUTH_COOKIE, { ...authCookieOptions, maxAge: undefined });
  res.json({ success: true });
});

app.get('/api/auth/me', authenticateAdmin, (req, res) => {
  res.json({ user: (req as any).user });
});

// ─── Proxy genérico ────────────────────────────────────────────────────────
async function proxyRequest(req: Request, res: Response, targetUrl: string) {
  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      params: req.query,
      headers: internalHeaders
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(502).json({ error: 'Erro de comunicação com o microsserviço.' });
    }
  }
}

// ─── Contato — rota pública dedicada, com rate limit ───────────────────────
app.post('/api/info/contact', contactLimiter, authenticateAdmin, async (req: Request, res: Response) => {
  await proxyRequest(req, res, `${INFO_SERVICE_URL}/contact`);
});

// ─── Proxy → Info Service (/api/info/*) ────────────────────────────────────
app.all('/api/info*', authenticateAdmin, async (req: Request, res: Response) => {
  const targetPath = req.path.replace('/api/info', '') || '/';
  await proxyRequest(req, res, `${INFO_SERVICE_URL}${targetPath}`);
});

// ─── Proxy → Info Service (rotas legadas do frontend) ─────────────────────
app.all(
  ['/api/users*', '/api/works*', '/api/skills*', '/api/work-types*', '/api/profile*', '/api/projects*'],
  authenticateAdmin,
  async (req: Request, res: Response) => {
    const targetPath = req.path.replace('/api', '') || '/';
    await proxyRequest(req, res, `${INFO_SERVICE_URL}${targetPath}`);
  }
);

// ─── Proxy → Blog Service (/api/blog/*) ────────────────────────────────────
app.all('/api/blog*', authenticateAdmin, async (req: Request, res: Response) => {
  const targetPath = req.path.replace('/api/blog', '') || '/';
  await proxyRequest(req, res, `${BLOG_SERVICE_URL}${targetPath}`);
});

// ─── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[API Gateway] Rodando na porta ${PORT}`);
});
