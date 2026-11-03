import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit, SKIP } from 'unist-util-visit';
import type { Root as MarkdownRoot } from 'mdast';
import type { Root as HtmlRoot } from 'hast';
import { getPublishedPosts, type BlogPost } from '@/data/posts';
import { SITE_URL } from '@/lib/seo';

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
}

// Render prose from the same MDX source as the website. Interactive components
// have an explicit image/caption fallback; they are never executed for RSS.
export async function renderFeedArticle(post: BlogPost): Promise<string> {
  const source = await readFile(path.join(process.cwd(), 'content/blog', post.slug, 'post.mdx'), 'utf8');
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMdx)
    .use(() => (tree: MarkdownRoot) => {
      visit(tree, (node, index, parent) => {
        if (node.type === 'mdxjsEsm' && parent && index !== undefined) {
          parent.children.splice(index, 1);
          return index;
        }
        if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && parent && index !== undefined) {
          const name = (node as typeof node & { name?: string }).name ?? '';
          // RSS readers get expanded notes with the same prose and figure fallbacks.
          if (name === 'details' || name === 'summary') {
            parent.children.splice(index, 1, ...node.children);
            return index;
          }
          const fallback = post.feedFigures[name];
          if (!fallback) throw new Error(`Add an RSS fallback for <${name}> in ${post.slug}.`);
          parent.children[index] = { type: 'html', value: `<figure><img src="${escapeXml(new URL(fallback.src, SITE_URL).href)}" alt="${escapeXml(fallback.alt)}" /><figcaption>${escapeXml(fallback.caption)}</figcaption></figure>` };
          return SKIP;
        }
        if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') {
          throw new Error(`Use plain prose or a component with an RSS fallback instead of an MDX expression in ${post.slug}.`);
        }
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(() => (tree: HtmlRoot) => {
      visit(tree, 'element', (node) => {
        for (const key of ['href', 'src']) {
          const value = node.properties[key];
          if (typeof value === 'string') node.properties[key] = new URL(value, `${SITE_URL}/blog/${post.slug}/`).href;
        }
      });
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(source);
  return String(result);
}

export async function buildRssFeed(): Promise<string> {
  const posts = getPublishedPosts();
  const items = await Promise.all(posts.map(async (post) => {
    const url = `${SITE_URL}/blog/${post.slug}/`;
    const content = (await renderFeedArticle(post)).replaceAll(']]>', ']]]]><![CDATA[>');
    return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n')}
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`;
  }));
  const latest = posts.map((post) => post.updated ?? post.date).sort().at(-1);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Kevin Newman — Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Experiments, small discoveries, and the stories behind my projects.</description>
    <language>en-ca</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${latest ? `<lastBuildDate>${new Date(`${latest}T00:00:00Z`).toUTCString()}</lastBuildDate>` : ''}
    ${items.join('\n')}
  </channel>
</rss>`;
}
