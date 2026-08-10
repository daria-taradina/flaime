// data/projects/index.ts
import { loamBlends } from './loam-blends';
import { milaveHaircare } from './milave-haircare'
import type { CaseStudyData } from '@/components/case-study/types';

const projects: Record<string, CaseStudyData> = {
  'loam-blends': loamBlends,
  'milave-haircare': milaveHaircare,
};

export function getProject(slug: string): CaseStudyData | undefined {
  return projects[slug];
}