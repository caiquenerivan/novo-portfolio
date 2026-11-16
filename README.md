# nerivan.site

Portfolio e blog de Caique Nerivan. Site estático em [Astro](https://astro.build), sem backend nem banco de dados, publicado na Vercel em [www.nerivan.site](https://www.nerivan.site).

## Rodar localmente

```bash
npm install --prefix site
npm run dev --prefix site
```

O site abre em `http://localhost:4321`. Para gerar a versão de produção: `npm run build --prefix site` (saída em `site/dist`).

## Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Textos da home, traduções e links de contato | `site/src/i18n.ts` |
| Skills | `site/src/data/skills.json` |
| Projetos (um `.md` por projeto) | `site/src/content/projects/` |
| Posts do blog | `site/src/content/blog/en/` e `site/src/content/blog/pt/` |
| Cores e fontes | variáveis no topo de `site/src/styles/global.css` |
| Imagens dos projetos | `site/public/projects/` |
| Currículos (fonte em HTML) | `site/cv-src/` |

Inglês é o idioma padrão (`/`); português fica em `/pt/`.

## Publicar um post

1. Crie um arquivo Markdown em `site/src/content/blog/en/` (ou `pt/`). O nome do arquivo vira o endereço: `meu-post.md` sai em `/blog/meu-post` (ou `/pt/blog/meu-post`).
2. Comece o arquivo com o cabeçalho:

   ```md
   ---
   title: "Título do post"
   description: "Resumo de uma ou duas frases, usado na lista e no Google."
   date: 2026-11-20
   tags: [node, arquitetura]
   draft: true
   ---
   ```

3. Escreva o texto em Markdown abaixo do cabeçalho. Com `draft: true` o post só aparece no `npm run dev`.
4. Troque para `draft: false` e faça `git push` na `main`. A Vercel publica em cerca de um minuto.

Para ter o mesmo post nos dois idiomas, use o mesmo nome de arquivo nas duas pastas.

## Atualizar os currículos

Edite `site/cv-src/cv-pt.html` e `site/cv-src/cv-en.html` e rode:

```bash
./site/cv-src/build.sh
```

O script gera os PDFs com o Brave (ou outro navegador Chromium, via `BROWSER=...`) e copia para `site/public/cv/`.
