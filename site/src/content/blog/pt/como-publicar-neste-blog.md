---
title: "Como publicar neste blog (post de exemplo)"
description: "Um guia rápido de como criar, revisar e publicar um post. Apague este arquivo quando escrever o primeiro de verdade."
date: 2026-11-15
tags: [meta, astro]
draft: false
---

Este post existe para mostrar como o blog funciona. Quando você publicar o primeiro texto de verdade, apague este arquivo.

## 1. Crie o arquivo

Cada post é um arquivo Markdown em `src/content/blog/pt/`. O nome do arquivo vira o endereço: `meu-post.md` aparece em `/pt/blog/meu-post`.

## 2. Preencha o cabeçalho

```md
---
title: "Título do post"
description: "Resumo de uma ou duas frases, usado na lista e no Google."
date: 2026-11-20
tags: [node, arquitetura]
draft: true
---
```

Com `draft: true` o post não vai para o ar. Troque para `false` quando estiver pronto.

## 3. Escreva

Abaixo do cabeçalho vale Markdown comum: **negrito**, _itálico_, [links](https://astro.build), listas, imagens e blocos de código.

> Citações também funcionam.

## 4. Publique

Rode `npm run dev` para revisar e depois faça `git push`. O deploy sai sozinho.

O inglês é o idioma padrão do site. Para a versão em inglês, crie um arquivo com o mesmo nome em `src/content/blog/en/`; ela aparece em `/blog/meu-post`.
