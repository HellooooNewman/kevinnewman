import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAvailablePosts } from '@/data/posts';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

const postsWithSlides = () => getAvailablePosts().filter((post) => post.loadSlides);

export function generateStaticParams() {
  return postsWithSlides().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsWithSlides().find((p) => p.slug === slug);
  if (!post) return {};
  // The article is the canonical, indexable version of this talk.
  return { ...pageMetadata({ title: `${post.title} (slides)`, description: post.description, path: `/blog/${slug}/slides/` }), robots: { index: false, follow: true } };
}

export default async function BlogSlidesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsWithSlides().find((p) => p.slug === slug);
  if (!post?.loadSlides) notFound();
  const { default: Deck } = await post.loadSlides();
  return <Deck />;
}
