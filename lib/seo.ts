import type { Metadata } from "next";

/** The one address the site lives at. Canonical tags, the sitemap and
 * robots.txt all point here; the bare domain should redirect to it. */
export const SITE_URL = "https://www.kevinnewman.ca";

const SITE_NAME = "Kevin Newman";
const DEFAULT_IMAGE = {
  url: "/assets/social/kevin-newman-og.jpg",
  alt: "A starry mountain landscape with a glowing campsite and geometric constellations",
};

/**
 * Per-page metadata: a canonical URL plus Open Graph and X cards that
 * describe this page. Next.js replaces a parent's `openGraph` and
 * `twitter` objects instead of merging them, so each page sets the whole
 * set here rather than inheriting the home page's.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  /** Site-relative path with a trailing slash, e.g. "/projects/". */
  path: string;
  image?: { url: string; alt: string };
}): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Helloooo_Newman",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
