export type Lang = 'pt' | 'en';

export const SITE = {
  name: 'Caique Nerivan',
  email: 'caiquenerivansantos@gmail.com',
  github: 'https://github.com/caiquenerivan',
  linkedin: 'https://www.linkedin.com/in/caiquenerivan/',
  instagram: 'https://www.instagram.com/devnerivan/',
};

/** Prefixo de rota de cada idioma: EN (padrão) fica na raiz, PT em /pt. */
export const prefix = (lang: Lang) => (lang === 'pt' ? '/pt' : '');

export const formatDate = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

export const readingTime = (body: string | undefined) =>
  Math.max(1, Math.round((body ?? '').split(/\s+/).length / 200));

export const ui = {
  pt: {
    htmlLang: 'pt-BR',
    siteDescription:
      'Caique Nerivan, desenvolvedor full stack em São Paulo. Node.js, React e TypeScript, projetos e textos sobre desenvolvimento web.',
    nav: { home: 'Início', projects: 'Projetos', skills: 'Skills', blog: 'Blog', contact: 'Contato' },
    navLabel: 'Seções',
    kicker: 'Desenvolvedor Full Stack · São Paulo, Brasil',
    heroTitle: [
      { text: 'Oi, eu sou' },
      { text: 'Caique Nerivan', accent: true },
      { text: 'e construo sistemas web de ponta a ponta', block: true },
    ],
    heroLead:
      'Node.js, React e TypeScript. Gosto de arquitetura bem resolvida e de interfaces que parecem simples de usar.',
    ctaProjects: 'ver projetos',
    ctaBlog: 'ler o blog',
    ctaContact: 'falar comigo',
    projects: 'Projetos',
    skills: 'Skills',
    blog: 'Blog',
    allPosts: 'todos os posts',
    noPosts: 'Os primeiros posts estão a caminho.',
    minutes: 'min',
    contactTitle: ['Vamos construir', 'algo', 'juntos?'],
    downloadCv: 'baixar CV',
    copyEmail: 'Copiar e-mail',
    copied: 'e-mail copiado!',
    cvFile: '/cv/caique-nerivan-cv-pt.pdf',
    code: 'código',
    live: 'ver projeto',
    blogTitle: 'Blog',
    blogDescription: 'Textos sobre desenvolvimento web, arquitetura e o que aprendo construindo.',
    backToBlog: 'voltar para o blog',
    notFound: 'Página não encontrada',
    backHome: 'voltar para o início',
  },
  en: {
    htmlLang: 'en',
    siteDescription:
      'Caique Nerivan, full stack developer based in São Paulo. Node.js, React and TypeScript, projects and writing about web development.',
    nav: { home: 'Home', projects: 'Projects', skills: 'Skills', blog: 'Blog', contact: 'Contact' },
    navLabel: 'Sections',
    kicker: 'Full Stack Developer · São Paulo, Brazil',
    heroTitle: [
      { text: "Hi, I'm" },
      { text: 'Caique Nerivan', accent: true },
      { text: 'and I build web systems end to end', block: true },
    ],
    heroLead:
      'Node.js, React and TypeScript. I care about well-thought-out architecture and interfaces that feel simple to use.',
    ctaProjects: 'see projects',
    ctaBlog: 'read the blog',
    ctaContact: 'get in touch',
    projects: 'Projects',
    skills: 'Skills',
    blog: 'Blog',
    allPosts: 'all posts',
    noPosts: 'The first posts are on their way.',
    minutes: 'min',
    contactTitle: ["Let's build", 'something', 'together?'],
    downloadCv: 'download CV',
    copyEmail: 'Copy email address',
    copied: 'email copied!',
    cvFile: '/cv/caique-nerivan-cv-en.pdf',
    code: 'code',
    live: 'view project',
    blogTitle: 'Blog',
    blogDescription: 'Writing about web development, architecture and what I learn while building.',
    backToBlog: 'back to the blog',
    notFound: 'Page not found',
    backHome: 'back to home',
  },
} as const;
