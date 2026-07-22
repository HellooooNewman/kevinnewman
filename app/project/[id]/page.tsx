// Legacy v1 URLs: /project/:id → /projects/:slug/
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Redirect from "@/components/Redirect";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    robots: { index: false, follow: true },
    alternates: { canonical: `/projects/${project.slug}/` },
  };
}

export default async function LegacyProjectRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  return <Redirect to={`/projects/${project.slug}/`} />;
}
