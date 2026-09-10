import type { Metadata } from 'next';
import { Literata, Plus_Jakarta_Sans } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import '@/styles/variables.css';
import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Providers from '@/components/Providers/Providers';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const literata = Literata({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-heading',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Keep your plants alive',
  description:
    'Find houseplants, schedule watering and track the care of your home garden.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${literata.variable}`}>
      <body>
        <Providers>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
