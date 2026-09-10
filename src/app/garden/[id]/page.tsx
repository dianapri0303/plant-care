import type { Metadata } from 'next';
import PlantCardView from '@/components/PlantCardView/PlantCardView';

export const metadata: Metadata = {
  title: 'My plant | Keep your plants alive',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GardenPlantPage({ params }: PageProps) {
  const { id } = await params;
  return <PlantCardView id={id} />;
}
