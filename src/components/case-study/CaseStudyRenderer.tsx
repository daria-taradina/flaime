// components/case-study/CaseStudyRenderer.tsx
import { blockRegistry } from './blocks';
import type { CaseStudyData } from './types';

export default function CaseStudyRenderer({ data }: { data: CaseStudyData }) {
  return (
    <main>
      {data.blocks.map((block, i) => {
        const Component = blockRegistry[block.type];
        if (!Component) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`Unknown block type: "${block.type}" — check the registry.`);
          }
          return null;
        }
        return <Component key={i} {...block.props} />;
      })}
    </main>
  );
}