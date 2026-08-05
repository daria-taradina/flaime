import Hero from '@/sections/home/Hero';
import Intro from '@/sections/home/Intro';
import ServicesAlt from '@/sections/home/ServicesAlt';
import Services from '@/sections/home/Services';
import SelectedWorks from '@/sections/home/SelectedWorks';
import Process from '@/sections/home/Process';
import Cta from '@/sections/home/Cta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <ServicesAlt />
      {/*<Services />*/}
      <SelectedWorks />
      <Process />
      <Cta />
    </main>
  );
}