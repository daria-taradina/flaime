import Hero3D from '@/sections/home/Hero3D';
import Intro from '@/sections/home/Intro';
import Services from '@/sections/home/Services';
import SelectedWorks from '@/sections/home/SelectedWorks';
import Process from '@/sections/home/Process';
import Cta from '@/sections/home/Cta';

export default function Home() {
  return (
    <main>
      <Hero3D />
      <Intro />
      <Services />
      <SelectedWorks />
      <Process />
      <Cta />
    </main>
  );
}