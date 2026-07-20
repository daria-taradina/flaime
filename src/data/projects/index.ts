// data/projects/index.ts
import { loamBlends } from './loam-blends';
import type { CaseStudyData } from '@/components/case-study/types';

const projects: Record<string, CaseStudyData> = {
  'loam-blends': loamBlends,
};

export function getProject(slug: string): CaseStudyData | undefined {
  return projects[slug];
}