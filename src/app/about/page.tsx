// about/page.tsx

import Intro from '@/sections/about/Intro';
import AboutFounder from '@/sections/about/AboutFounder';
import { ABOUT_MARGO } from '@/data/about';

export default function About() {
  return (
    <main>      
      <Intro />
      <AboutFounder />
    </main>
  );
}