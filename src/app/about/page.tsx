import { AboutHero } from '@/sections/about/AboutHero';
import { AboutHeroInverse } from '@/sections/about/AboutHeroInverse';
import Intro from '@/sections/home/Intro';
import  Featured from '@/sections/about/Featured';

export default function About() {
  return (
    <main>      
      <AboutHeroInverse />
      {/*<AboutHero />*/}
      <Intro />
      <Featured />
    </main>
  );
}