import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import NowPreviewLink from '@/components/NowPreviewLink';
import { projects } from '@/data/projects';

function ArticleLink({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const project = projects.find((project) => href === `/projects/${project.slug}/`);
  if (project && href) return <NowPreviewLink href={href} preview={{
    title: project.title,
    description: project.shortBody,
    image: project.thumbnail,
    label: 'Project',
  }}>{children}</NowPreviewLink>;
  return <a href={href} {...props}>{children}</a>;
}

function Table(props: ComponentPropsWithoutRef<'table'>) {
  return <div role="region" aria-label="Article table" tabIndex={0} className="article-table"><table {...props} /></div>;
}

const components: MDXComponents = { table: Table, a: ArticleLink };

export function useMDXComponents(): MDXComponents {
  return components;
}
