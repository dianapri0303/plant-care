import type { Metadata } from 'next';
import GardenView from '@/components/GardenView/GardenView';

export const metadata: Metadata = {
  title: 'My garden | Keep your plants alive',
};

export default function GardenPage() {
  return <GardenView />;
}
