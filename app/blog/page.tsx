import Link from 'next/link';
import { formatPostDate, getPublishedPosts } from '@/data/posts';
import { pageMetadata } from '@/lib/seo';
import { getPostReadMinutes } from '@/lib/blog-reading-time';
import RssLink from '@/components/RssLink';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Blog',
  description: 'Notes from making things: interactive experiments, development stories, and the details behind my projects.',
  path: '/blog/',
});

export default async function BlogPage() {
  const posts = await Promise.all(getPublishedPosts().map(async (post) => ({
    ...post,
    readMinutes: await getPostReadMinutes(post),
  })));
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Notes from the workshop</p>
        <h1>Making things.<br /><span>Sharing the interesting bits.</span></h1>
        <p className={styles.intro}>Experiments, small discoveries, and the stories behind my projects. Sometimes with something you can play with.</p>
        <div className={styles.subscribe}><RssLink /></div>
      </header>
      <div className={styles.list}>
        {posts.map((post) => (
          <article className={styles.post} key={post.slug}>
            <div className={styles.meta}><time dateTime={post.date}>{formatPostDate(post.date)}</time><span>{post.readMinutes} min read</span></div>
            <div>
              <div className={styles.tags}>{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <h2><Link href={`/blog/${post.slug}/`}>{post.title}<span aria-hidden="true"> ↗</span></Link></h2>
              <p>{post.description}</p>
              <Link className={styles.read} href={`/blog/${post.slug}/`}>Read & explore <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && <p>The first post is on its way.</p>}
      </div>
    </div>
  );
}
