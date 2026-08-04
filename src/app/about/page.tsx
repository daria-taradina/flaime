import { AboutHero } from '@/sections/about/AboutHero';
import { AboutHeroInverse } from '@/sections/about/AboutHeroInverse';
import Intro from '@/sections/home/Intro';

export default function Home() {
  return (
    <main>      
      <AboutHeroInverse />
      {/*<AboutHero />*/}
      <Intro />
    </main>
  );
}