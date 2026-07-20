// app/work/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getProject } from '@/data/projects';
import CaseStudyRenderer from '@/components/case-study/CaseStudyRenderer';

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyRenderer data={project} />;
}