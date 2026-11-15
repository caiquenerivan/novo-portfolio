import rss from '@astrojs/rss';
import { SITE, prefix, ui } from '../i18n';
import { getPosts } from '../posts';

// Um feed só, com os posts dos dois idiomas, do mais novo para o mais antigo.
export async function GET(context) {
  const items = [];
  for (const lang of ['en', 'pt']) {
    for (const post of await getPosts(lang)) {
      items.push({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `${prefix(lang)}/blog/${post.slug}/`,
      });
    }
  }
  items.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return rss({
    title: `${SITE.name} · Blog`,
    description: ui.en.blogDescription,
    site: context.site,
    items,
  });
}
