import fs from 'fs';
import path from 'path';
import { BlogPost } from '@portfolio/shared-types';

const DB_PATH = path.join(__dirname, '../data/blog_db.json');

interface BlogDatabase {
  posts: BlogPost[];
}

const initialPosts: BlogPost[] = [
  {
    id: "1",
    slug: "construindo-microsservicos-com-node-e-react",
    title: "Construindo Microsserviços com Node.js e React em um Monorepo",
    summary: "Descubra como estruturar uma arquitetura escalável utilizando npm workspaces, Express e React de maneira simples e desacoplada.",
    content: `
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
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
    published: true,
    tags: ["Node.js", "Microservices", "React", "TypeScript"],
    readTimeMinutes: 5
  },
  {
    id: "2",
    slug: "guia-de-boas-praticas-de-design-ui-ux",
    title: "Guia de Boas Práticas de UI/UX em Aplicações Web Modernas",
    summary: "Aprenda como aplicar conceitos avançados de tipografia, contraste e micro-animações para criar experiências memoráveis aos usuários.",
    content: `
# Dicas Essenciais de UI/UX para Desenvolvedores

A primeira impressão de um usuário ao acessar seu site ou aplicativo define a taxa de retenção.

## 1. Tipografia e Legibilidade
Use fontes modernas como Inter ou Outfit e mantenha uma hierarquia visual clara.

## 2. Cores e Contraste
Evite cores padrão do navegador. Utilize paletas HSL personalizadas e suporte nativo a Dark Mode.

## 3. Micro-animações
Animações sutis ao passar o mouse ou clicar em botões tornam a interface viva e engajante.
    `,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    published: true,
    tags: ["UI/UX", "CSS", "Frontend", "Design"],
    readTimeMinutes: 4
  }
];

function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readDb(): BlogDatabase {
  ensureDirExists(DB_PATH);
  if (!fs.existsSync(DB_PATH)) {
    const data = { posts: initialPosts };
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { posts: initialPosts };
  }
}

export function writeDb(data: BlogDatabase): void {
  ensureDirExists(DB_PATH);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
