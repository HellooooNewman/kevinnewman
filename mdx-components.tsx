import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

function Table(props: ComponentPropsWithoutRef<'table'>) {
  return <div role="region" aria-label="Article table" tabIndex={0} className="article-table"><table {...props} /></div>;
}

const components: MDXComponents = { table: Table };

export function useMDXComponents(): MDXComponents {
  return components;
}
