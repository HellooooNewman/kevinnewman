import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPostDate, getAvailablePosts } from '@/data/posts';
import { projects } from '@/data/projects';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { getPostReadMinutes } from '@/lib/blog-reading-time';
import { isPostPublished } from '@/lib/blog-publication';
import JsonLd from '@/components/JsonLd';
import RssLink from '@/components/RssLink';
import styles from './page.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAvailablePosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getAvailablePosts().find((p) => p.slug === slug);
  if (!post) return {};
  const metadata = pageMetadata({ title: post.title, description: post.description, path: `/blog/${slug}/` });
  return { ...metadata, robots: isPostPublished(post) ? undefined : { index: false, follow: true }, openGraph: { ...metadata.openGraph, type: 'article', publishedTime: post.date, modifiedTime: post.updated ?? post.date, authors: ['Kevin Newman'], tags: post.tags } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAvailablePosts().find((p) => p.slug === slug);
  if (!post) notFound();
  const [{ default: Content }, readMinutes] = await Promise.all([
    post.load(),
    getPostReadMinutes(post),
  ]);
  const project = projects.find((p) => p.slug === post.projectSlug);
  return (
    <article className={styles.article}>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.date, dateModified: post.updated ?? post.date, url: `${SITE_URL}/blog/${slug}/`, mainEntityOfPage: `${SITE_URL}/blog/${slug}/`, author: { '@type': 'Person', name: 'Kevin Newman', url: SITE_URL } }} />
      <div className={styles.topline}><Link href="/blog/">← All posts</Link><RssLink /></div>
      <header className={styles.header}>
        <div className={styles.tags}>{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h1>{post.title}</h1>
        <p className={styles.dek}>{post.description}</p>
        <div className={styles.byline}><span>Kevin Newman</span><span aria-hidden="true">/</span><time dateTime={post.date}>{formatPostDate(post.date)}</time><span aria-hidden="true">/</span><span>{readMinutes} min read</span></div>
      </header>
      <div className={styles.prose}><Content /></div>
      <footer className={styles.footer}>
        {project && <p>Behind the project <Link href={`/projects/${project.slug}/`}>{project.title} →</Link></p>}
        <p>More experiments as they happen. <RssLink /></p>
      </footer>
    </article>
  );
}
