import { useEffect, useState, useCallback } from "react";
import { blogService } from "../services/api";
import { BlogPost } from "@portfolio/shared-types";

// Fallback posts em caso de falha de conexão inicial com o servidor
const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "construindo-microsservicos-com-node-e-react",
    title: "Construindo Microsserviços com Node.js e React em um Monorepo",
    summary:
      "Descubra como estruturar uma arquitetura escalável utilizando npm workspaces, Express e React de maneira simples e desacoplada.",
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
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
    published: true,
    tags: ["Node.js", "Microservices", "React", "TypeScript"],
    readTimeMinutes: 5,
  },
  {
    id: "2",
    slug: "guia-de-boas-praticas-de-design-ui-ux",
    title: "Guia de Boas Práticas de UI/UX em Aplicações Web Modernas",
    summary:
      "Aprenda como aplicar conceitos avançados de tipografia, contraste e micro-animações para criar experiências memoráveis aos usuários.",
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
    coverImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    published: true,
    tags: ["UI/UX", "CSS", "Frontend", "Design"],
    readTimeMinutes: 4,
  },
];

export const useBlogPosts = (initialTag?: string, initialSearch?: string) => {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (tag?: string, search?: string) => {
    try {
      const data = await blogService.getPosts({ tag, search });
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
      } else {
        setPosts(MOCK_POSTS);
      }
      setError(null);
    } catch {
      setPosts(MOCK_POSTS);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(initialTag, initialSearch);
  }, [fetchPosts, initialTag, initialSearch]);

  return { posts, loading, error, refetch: fetchPosts };
};

export const useBlogPost = (slugOrId: string) => {
  const [post, setPost] = useState<BlogPost | null>(() => {
    return (
      MOCK_POSTS.find((p) => p.slug === slugOrId || p.id === slugOrId) || null
    );
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugOrId) return;

    const fetchPost = async () => {
      try {
        const data = await blogService.getPostBySlugOrId(slugOrId);
        if (data && data.title) {
          setPost(data);
          setError(null);
        }
      } catch {
        const fallback = MOCK_POSTS.find(
          (p) => p.slug === slugOrId || p.id === slugOrId
        );
        if (fallback) {
          setPost(fallback);
          setError(null);
        } else {
          setError("Artigo não encontrado.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slugOrId]);

  return { post, loading, error };
};
