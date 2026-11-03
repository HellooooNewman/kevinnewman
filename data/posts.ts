import type { ComponentType } from 'react';
import { articleFigures } from '@/content/blog/n64-texture-formats/figures';
import { isPostPublished } from '@/lib/blog-publication';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  /** Optional manual override; otherwise estimated from the MDX word count. */
  readMinutes?: number;
  tags: string[];
  projectSlug?: string;
  /** False keeps an exact-URL preview but hides it from public listings. */
  published?: boolean;
  /** Drafts are excluded from the static export entirely. */
  draft?: boolean;
  load: () => Promise<{ default: ComponentType }>;
  feedFigures: Record<string, { src: string; alt: string; caption: string }>;
}

// One entry per manually authored article. Demos and styles stay with the post.
const posts: BlogPost[] = [{
  slug: 'n64-texture-formats',
  title: 'Making N64 textures go further',
  description: 'How Pandemonium combines compact N64 texture formats, vertex colors, and layered detail. Explore the room before and after, then try the formats yourself.',
  date: '2026-11-03',
  published: false,
  tags: ['N64', 'Graphics', 'Interactive'],
  projectSlug: 'pandemonium',
  load: () => import('@/content/blog/n64-texture-formats/post.mdx'),
  feedFigures: articleFigures,
}];

export function getAvailablePosts(): BlogPost[] {
  return posts.filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedPosts(now = new Date()): BlogPost[] {
  return getAvailablePosts().filter((post) => isPostPublished(post, now));
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
