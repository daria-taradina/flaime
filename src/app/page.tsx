import Hero from '@/sections/home/Hero';
import Intro from '@/sections/home/Intro';
import Services from '@/sections/home/Services';
import SelectedWorks from '@/sections/home/SelectedWorks';
import Process from '@/sections/home/Process';

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <SelectedWorks />
      <Process />
      {/* <Cta /> */}
    </main>
  );
}