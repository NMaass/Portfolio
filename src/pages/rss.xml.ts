import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const postModules = import.meta.glob('/src/pages/writing/*.md', { eager: true }) as Record<
    string,
    { frontmatter: { title: string; description?: string; date: string } }
  >;

  const items = Object.entries(postModules)
    .map(([path, mod]) => {
      const slug = path.replace('/src/pages/writing/', '').replace(/\.md$/, '');
      return {
        title: mod.frontmatter.title,
        description: mod.frontmatter.description ?? '',
        pubDate: new Date(mod.frontmatter.date),
        link: `/writing/${slug}`,
      };
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Nicholas Maassen — Writing',
    description:
      'Engineering judgment, integration work, shipping under constraints, and the occasional side obsession.',
    site: context.site ?? 'https://nmaass.dev',
    items,
    customData: '<language>en-us</language>',
  });
}
