import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Post = CollectionEntry<'blog'> & { slug: string };

/** Posts de um idioma, do mais novo para o mais antigo. Rascunhos só aparecem no `npm run dev`. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const entries = await getCollection(
    'blog',
    ({ id, data }) => id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft),
  );
  return entries
    .map((entry) => ({ ...entry, slug: entry.id.slice(lang.length + 1) }))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
