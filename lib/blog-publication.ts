import type { BlogPost } from '@/data/posts';

/** Listings and search indexing use the same publication rules. */
export function isPostPublished(
  post: Pick<BlogPost, 'published' | 'draft' | 'date'>,
  now = new Date(),
): boolean {
  return !post.draft && post.published !== false && new Date(`${post.date}T00:00:00Z`) <= now;
}
