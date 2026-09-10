import type { Metadata } from 'next';
import { Suspense } from 'react';
import CatalogView from '@/components/CatalogView/CatalogView';

export const metadata: Metadata = {
  title: 'Plant catalog | Keep your plants alive',
  description: 'Browse houseplants and find species that fit your space.',
};

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogView />
    </Suspense>
  );
}
