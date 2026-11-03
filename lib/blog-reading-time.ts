import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import type { BlogPost } from '@/data/posts';

const WORDS_PER_MINUTE = 200;
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMdx);

export function estimateReadingMinutes(source: string): number {
  const tree = parser.parse(source);
  let words = 0;
  // Count readable prose and code, including headings and table cells.
  // Imports, JSX attributes/expressions, Markdown syntax, and URLs aren't prose.
  visit(tree, (node) => {
    if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') {
      words += node.value.match(/[\p{L}\p{N}]+(?:['’_-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
    }
  });
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export async function getPostReadMinutes(post: Pick<BlogPost, 'slug' | 'readMinutes'>): Promise<number> {
  if (post.readMinutes !== undefined) {
    if (!Number.isInteger(post.readMinutes) || post.readMinutes < 1) {
      throw new Error(`Reading-time override for ${post.slug} must be a positive whole number.`);
    }
    return post.readMinutes;
  }
  const source = await readFile(path.join(process.cwd(), 'content/blog', post.slug, 'post.mdx'), 'utf8');
  return estimateReadingMinutes(source);
}
