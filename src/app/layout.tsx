import type { Metadata } from 'next';
import 'modern-normalize/modern-normalize.css';
import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
