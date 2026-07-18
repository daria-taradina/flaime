import type { Metadata } from 'next';
import '@/app/globals.scss';
import '@/styles/section-theme.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}