import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PlantDetails from '@/components/PlantDetails/PlantDetails';
import { getPlantById } from '@/lib/api/catalog';

export const revalidate = 604800;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const plant = await getPlantById(id);
    return {
      title: `${plant.commonName} | Keep your plants alive`,
      description: plant.description,
    };
  } catch {
    return { title: 'Plant not found | Keep your plants alive' };
  }
}

export default async function PlantDetailsPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const plant = await getPlantById(id);
    return <PlantDetails plant={plant} />;
  } catch {
    notFound();
  }
}
