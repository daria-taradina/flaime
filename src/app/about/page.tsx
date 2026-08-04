import { AboutHero } from '@/sections/about/AboutHero';
import { AboutHeroInverse } from '@/sections/about/AboutHeroInverse';
import Intro from '@/sections/about/Intro';
import  Featured from '@/sections/about/Featured';

export default function About() {
  return (
    <main>      
      <Intro />
      {/*<AboutHeroInverse />*/}
      {/*<AboutHero />*/}
      
      <Featured />
    </main>
  );
}