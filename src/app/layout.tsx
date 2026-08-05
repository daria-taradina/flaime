import type { Metadata } from 'next';
import '@/app/globals.scss';
import '@/styles/section-theme.css';
import Navbar from '@/components/layout/Navbar';
import NavbarGlass from '@/components/layout/NavbarGlass';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'Flaime Studio',
  description: 'Flaime Studio — transforming brands into visual experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SmoothScrollProvider>
          <NavbarGlass />
          {/*<Navbar />*/}
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}